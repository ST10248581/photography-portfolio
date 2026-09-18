import { Injectable } from '@angular/core';
import { Photo, Collection, HeroConfig } from '../models/photo.model';
import { PHOTOS, SELECTED_WORK_IDS } from '../data/photos.data';
import { COLLECTIONS, HERO } from '../data/collections.data';

/**
 * Read-only view over the hardcoded photo data. Everything lives in
 * src/app/data — edit those files to change the site.
 */
@Injectable({ providedIn: 'root' })
export class PhotoService {
  getCollections(): Collection[] {
    return COLLECTIONS;
  }

  getCollection(slug: string): Collection | undefined {
    return COLLECTIONS.find((c) => c.slug === slug);
  }

  getPhotosByCollection(collectionId: string): Photo[] {
    return PHOTOS.filter((p) => p.collectionId === collectionId);
  }

  getPhoto(id: string): Photo | undefined {
    return PHOTOS.find((p) => p.id === id);
  }

  getSelectedWork(): Photo[] {
    return SELECTED_WORK_IDS
      .map((id) => PHOTOS.find((p) => p.id === id))
      .filter((p): p is Photo => !!p);
  }

  getAllPhotos(): Photo[] {
    return PHOTOS;
  }

  getTagsForCollection(collectionId: string): string[] {
    const tags = new Set<string>();
    this.getPhotosByCollection(collectionId).forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }

  filterByTag(photos: Photo[], tag: string): Photo[] {
    if (!tag || tag === 'all') return photos;
    return photos.filter((p) => p.tags.includes(tag));
  }

  getHeroConfig(): HeroConfig {
    return HERO;
  }
}
