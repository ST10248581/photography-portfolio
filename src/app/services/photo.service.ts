import { Injectable } from '@angular/core';
import { Photo, Collection, HeroConfig } from '../models/photo.model';
import { PhotoStorageService } from './photo-storage.service';

@Injectable({ providedIn: 'root' })
export class PhotoService {
  private photos: Photo[] = [];
  private collections: Collection[] = [];
  private selectedWorkIds: string[] = [];
  private heroConfig: HeroConfig = {
    imagePath: 'assets/photos/krantzkloof-river.jpg',
    kicker: 'Wildlife \u00b7 Nature \u00b7 Exploration',
    title: 'TROY',
    subtitle: 'Photography from KwaZulu-Natal',
  };
  private imageUrls = new Map<string, string>();

  constructor(private storage: PhotoStorageService) {}

  async init(): Promise<void> {
    await this.storage.init();

    this.photos = await this.storage.getAllPhotos();
    this.collections = await this.storage.getAllCollections();
    this.selectedWorkIds = (await this.storage.getSetting('selectedWorkIds')) || [];
    const heroConfig = await this.storage.getSetting<HeroConfig>('heroConfig');
    if (heroConfig) this.heroConfig = heroConfig;

    // Restore blob URLs for stored images
    for (const photo of this.photos) {
      if (photo.imagePath === '__stored__') {
        const blob = await this.storage.getImage(`photo_${photo.id}`);
        if (blob) {
          const url = URL.createObjectURL(blob);
          this.imageUrls.set(`photo_${photo.id}`, url);
          photo.imagePath = url;
        } else {
          photo.imagePath = undefined;
        }
      }
    }

    for (const coll of this.collections) {
      if (coll.coverImage === '__stored__') {
        const blob = await this.storage.getImage(`collection_${coll.id}`);
        if (blob) {
          const url = URL.createObjectURL(blob);
          this.imageUrls.set(`collection_${coll.id}`, url);
          coll.coverImage = url;
        } else {
          coll.coverImage = undefined;
        }
      }
    }

    if (this.heroConfig.imagePath === '__stored__') {
      const blob = await this.storage.getImage('hero');
      if (blob) {
        const url = URL.createObjectURL(blob);
        this.imageUrls.set('hero', url);
        this.heroConfig.imagePath = url;
      } else {
        this.heroConfig.imagePath = undefined;
      }
    }
  }

  // Read methods (synchronous, from memory)
  getCollections(): Collection[] {
    return this.collections;
  }

  getCollection(slug: string): Collection | undefined {
    return this.collections.find((c) => c.slug === slug);
  }

  getPhotosByCollection(collectionId: string): Photo[] {
    return this.photos.filter((p) => p.collectionId === collectionId);
  }

  getPhoto(id: string): Photo | undefined {
    return this.photos.find((p) => p.id === id);
  }

  getSelectedWork(): Photo[] {
    return this.selectedWorkIds
      .map((id) => this.photos.find((p) => p.id === id))
      .filter((p): p is Photo => !!p);
  }

  getSelectedWorkIds(): string[] {
    return [...this.selectedWorkIds];
  }

  isSelectedWork(photoId: string): boolean {
    return this.selectedWorkIds.includes(photoId);
  }

  getAllPhotos(): Photo[] {
    return this.photos;
  }

  getTagsForCollection(collectionId: string): string[] {
    const photos = this.getPhotosByCollection(collectionId);
    const tags = new Set<string>();
    photos.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }

  filterByTag(photos: Photo[], tag: string): Photo[] {
    if (!tag || tag === 'all') return photos;
    return photos.filter((p) => p.tags.includes(tag));
  }

  getHeroConfig(): HeroConfig {
    return { ...this.heroConfig };
  }

  generateId(prefix: string): string {
    return prefix + '_' + Date.now().toString(36);
  }

  // Write methods (async, update memory + IndexedDB)
  async savePhoto(photo: Photo, imageBlob?: Blob): Promise<void> {
    const imageKey = `photo_${photo.id}`;

    if (imageBlob) {
      await this.storage.saveImage(imageKey, imageBlob);
      const oldUrl = this.imageUrls.get(imageKey);
      if (oldUrl) URL.revokeObjectURL(oldUrl);
      const newUrl = URL.createObjectURL(imageBlob);
      this.imageUrls.set(imageKey, newUrl);
      photo.imagePath = newUrl;
    }

    const photoToStore = { ...photo };
    if (this.imageUrls.has(imageKey)) {
      photoToStore.imagePath = '__stored__';
    }
    await this.storage.savePhoto(photoToStore);

    const idx = this.photos.findIndex((p) => p.id === photo.id);
    if (idx >= 0) {
      this.photos[idx] = photo;
    } else {
      this.photos.push(photo);
    }
  }

  async deletePhoto(id: string): Promise<void> {
    await this.storage.deletePhoto(id);
    const imageKey = `photo_${id}`;
    await this.storage.deleteImage(imageKey);
    const oldUrl = this.imageUrls.get(imageKey);
    if (oldUrl) URL.revokeObjectURL(oldUrl);
    this.imageUrls.delete(imageKey);
    this.photos = this.photos.filter((p) => p.id !== id);
    this.selectedWorkIds = this.selectedWorkIds.filter((sid) => sid !== id);
    await this.storage.saveSetting('selectedWorkIds', this.selectedWorkIds);
  }

  async saveCollection(collection: Collection, imageBlob?: Blob): Promise<void> {
    const imageKey = `collection_${collection.id}`;

    if (imageBlob) {
      await this.storage.saveImage(imageKey, imageBlob);
      const oldUrl = this.imageUrls.get(imageKey);
      if (oldUrl) URL.revokeObjectURL(oldUrl);
      const newUrl = URL.createObjectURL(imageBlob);
      this.imageUrls.set(imageKey, newUrl);
      collection.coverImage = newUrl;
    }

    const collToStore = { ...collection };
    if (this.imageUrls.has(imageKey)) {
      collToStore.coverImage = '__stored__';
    }
    await this.storage.saveCollection(collToStore);

    const idx = this.collections.findIndex((c) => c.id === collection.id);
    if (idx >= 0) {
      this.collections[idx] = collection;
    } else {
      this.collections.push(collection);
    }
  }

  async deleteCollection(id: string): Promise<void> {
    const photos = this.getPhotosByCollection(id);
    for (const photo of photos) {
      await this.deletePhoto(photo.id);
    }
    await this.storage.deleteCollection(id);
    const imageKey = `collection_${id}`;
    await this.storage.deleteImage(imageKey);
    const oldUrl = this.imageUrls.get(imageKey);
    if (oldUrl) URL.revokeObjectURL(oldUrl);
    this.imageUrls.delete(imageKey);
    this.collections = this.collections.filter((c) => c.id !== id);
  }

  async toggleSelectedWork(photoId: string): Promise<void> {
    if (this.selectedWorkIds.includes(photoId)) {
      this.selectedWorkIds = this.selectedWorkIds.filter((id) => id !== photoId);
    } else {
      this.selectedWorkIds.push(photoId);
    }
    await this.storage.saveSetting('selectedWorkIds', this.selectedWorkIds);
  }

  async saveHeroConfig(config: HeroConfig, imageBlob?: Blob): Promise<void> {
    if (imageBlob) {
      await this.storage.saveImage('hero', imageBlob);
      const oldUrl = this.imageUrls.get('hero');
      if (oldUrl) URL.revokeObjectURL(oldUrl);
      const newUrl = URL.createObjectURL(imageBlob);
      this.imageUrls.set('hero', newUrl);
      config.imagePath = newUrl;
    }

    const configToStore = { ...config };
    if (this.imageUrls.has('hero')) {
      configToStore.imagePath = '__stored__';
    }
    await this.storage.saveSetting('heroConfig', configToStore);
    this.heroConfig = config;
  }
}
