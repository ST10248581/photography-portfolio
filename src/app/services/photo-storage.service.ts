import { Injectable } from '@angular/core';
import { Photo, Collection } from '../models/photo.model';
import { PHOTOS, SELECTED_WORK_IDS } from '../data/photos.data';
import { COLLECTIONS } from '../data/collections.data';

const DB_NAME = 'troy-photography';
const DB_VERSION = 1;

@Injectable({ providedIn: 'root' })
export class PhotoStorageService {
  private db!: IDBDatabase;

  init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('photos')) {
          db.createObjectStore('photos', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('collections')) {
          db.createObjectStore('collections', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('images')) {
          db.createObjectStore('images');
        }
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings');
        }
      };

      request.onsuccess = async (event) => {
        this.db = (event.target as IDBOpenDBRequest).result;
        try {
          await this.seedIfNeeded();
          resolve();
        } catch (e) {
          reject(e);
        }
      };

      request.onerror = () => reject(request.error);
    });
  }

  private async seedIfNeeded(): Promise<void> {
    const seeded = await this.get<boolean>('settings', 'seeded');
    if (seeded) return;

    const photoTx = this.db.transaction('photos', 'readwrite');
    const photoStore = photoTx.objectStore('photos');
    for (const photo of PHOTOS) {
      photoStore.put(JSON.parse(JSON.stringify(photo)));
    }
    await this.txComplete(photoTx);

    const collTx = this.db.transaction('collections', 'readwrite');
    const collStore = collTx.objectStore('collections');
    for (const coll of COLLECTIONS) {
      collStore.put(JSON.parse(JSON.stringify(coll)));
    }
    await this.txComplete(collTx);

    await this.putKV('settings', 'selectedWorkIds', [...SELECTED_WORK_IDS]);
    await this.putKV('settings', 'heroConfig', {
      imagePath: 'assets/photos/krantzkloof-river.jpg',
      kicker: 'Wildlife \u00b7 Nature \u00b7 Exploration',
      title: 'TROY',
      subtitle: 'Photography from KwaZulu-Natal',
    });
    await this.putKV('settings', 'seeded', true);
  }

  private txComplete(tx: IDBTransaction): Promise<void> {
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  // Photos
  getAllPhotos(): Promise<Photo[]> {
    return this.getAll<Photo>('photos');
  }

  savePhoto(photo: Photo): Promise<void> {
    return this.put('photos', photo);
  }

  deletePhoto(id: string): Promise<void> {
    return this.del('photos', id);
  }

  // Collections
  getAllCollections(): Promise<Collection[]> {
    return this.getAll<Collection>('collections');
  }

  saveCollection(collection: Collection): Promise<void> {
    return this.put('collections', collection);
  }

  deleteCollection(id: string): Promise<void> {
    return this.del('collections', id);
  }

  // Images (blob storage)
  saveImage(id: string, blob: Blob): Promise<void> {
    return this.putKV('images', id, blob);
  }

  getImage(id: string): Promise<Blob | null> {
    return this.get<Blob>('images', id);
  }

  deleteImage(id: string): Promise<void> {
    return this.del('images', id);
  }

  // Settings
  getSetting<T = any>(key: string): Promise<T | null> {
    return this.get<T>('settings', key);
  }

  saveSetting(key: string, value: any): Promise<void> {
    return this.putKV('settings', key, value);
  }

  // Generic helpers
  private getAll<T>(storeName: string): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readonly');
      const request = tx.objectStore(storeName).getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  private get<T>(storeName: string, key: string): Promise<T | null> {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readonly');
      const request = tx.objectStore(storeName).get(key);
      request.onsuccess = () => resolve(request.result ?? null);
      request.onerror = () => reject(request.error);
    });
  }

  private put(storeName: string, value: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      const request = tx.objectStore(storeName).put(value);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  private putKV(storeName: string, key: string, value: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      const request = tx.objectStore(storeName).put(value, key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  private del(storeName: string, key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(storeName, 'readwrite');
      const request = tx.objectStore(storeName).delete(key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
}
