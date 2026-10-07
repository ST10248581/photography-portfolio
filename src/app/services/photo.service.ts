import { Injectable } from '@angular/core';
import { Photo, Collection, HeroConfig, GridItem, PhotoGroup } from '../models/photo.model';
import { PHOTOS, PHOTO_GROUPS, SELECTED_WORK_IDS } from '../data/photos.data';
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

  getGroup(id: string): PhotoGroup | undefined {
    return PHOTO_GROUPS.find((g) => g.id === id);
  }

  /**
   * Lays photos out as grid cells. Photos sharing a groupId collapse into one
   * collage cell, placed where the first of them would have appeared.
   */
  toGridItems(photos: Photo[]): GridItem[] {
    const items: GridItem[] = [];
    const groupItems = new Map<string, { kind: 'group'; group: PhotoGroup; photos: Photo[] }>();

    for (const photo of photos) {
      const group = photo.groupId ? this.getGroup(photo.groupId) : undefined;
      if (!group) {
        items.push({ kind: 'photo', photo });
        continue;
      }
      const existing = groupItems.get(group.id);
      if (existing) {
        existing.photos.push(photo);
      } else {
        const item = { kind: 'group' as const, group, photos: [photo] };
        groupItems.set(group.id, item);
        items.push(item);
      }
    }

    // A group filtered down to one photo is just a photo.
    return items.map((item) =>
      item.kind === 'group' && item.photos.length === 1 ? { kind: 'photo', photo: item.photos[0] } : item
    );
  }

  getHeroConfig(): HeroConfig {
    return HERO;
  }
}
