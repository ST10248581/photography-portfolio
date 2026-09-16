import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PhotoGridComponent } from '../../components/photo-grid/photo-grid.component';
import { FilterBarComponent } from '../../components/filter-bar/filter-bar.component';
import { LightboxComponent } from '../../components/lightbox/lightbox.component';
import { PinDialogComponent } from '../../components/pin-dialog/pin-dialog.component';
import { EditPhotoDialogComponent } from '../../components/edit-photo-dialog/edit-photo-dialog.component';
import { EditCollectionDialogComponent } from '../../components/edit-collection-dialog/edit-collection-dialog.component';
import { PhotoService } from '../../services/photo.service';
import { AdminService } from '../../services/admin.service';
import { Photo, Collection } from '../../models/photo.model';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [
    CommonModule, RouterModule, PhotoGridComponent, FilterBarComponent,
    LightboxComponent, PinDialogComponent, EditPhotoDialogComponent,
    EditCollectionDialogComponent,
  ],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss',
})
export class CollectionComponent implements OnInit {
  collection: Collection | undefined;
  allPhotos: Photo[] = [];
  filteredPhotos: Photo[] = [];
  tags: string[] = [];
  activeTag = 'all';
  lightboxPhoto: Photo | null = null;

  showPinDialog = false;
  showEditPhotoDialog = false;
  showEditCollectionDialog = false;
  editingPhoto: Photo | null = null;
  private pendingAction: (() => void) | null = null;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
    private admin: AdminService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug') || '';
      this.loadCollection(slug);
    });
  }

  private loadCollection(slug: string) {
    this.collection = this.photoService.getCollection(slug);
    if (this.collection) {
      this.allPhotos = this.photoService.getPhotosByCollection(this.collection.id);
      this.filteredPhotos = [...this.allPhotos];
      this.tags = this.photoService.getTagsForCollection(this.collection.id);
      this.activeTag = 'all';
    }
  }

  onTagChange(tag: string) {
    this.activeTag = tag;
    this.filteredPhotos = this.photoService.filterByTag(this.allPhotos, tag);
  }

  openLightbox(photo: Photo) {
    this.lightboxPhoto = photo;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.lightboxPhoto = null;
    document.body.style.overflow = '';
  }

  navigateLightbox(photo: Photo) {
    this.lightboxPhoto = photo;
  }

  // Admin flow
  private requireAuth(action: () => void) {
    if (this.admin.isAuthenticated()) {
      action();
    } else {
      this.pendingAction = action;
      this.showPinDialog = true;
    }
  }

  onAuthenticated() {
    this.showPinDialog = false;
    if (this.pendingAction) {
      this.pendingAction();
      this.pendingAction = null;
    }
  }

  onPinCancel() {
    this.showPinDialog = false;
    this.pendingAction = null;
  }

  onEditPhoto(photo: Photo) {
    this.requireAuth(() => {
      this.editingPhoto = photo;
      this.showEditPhotoDialog = true;
    });
  }

  onAddPhoto() {
    this.requireAuth(() => {
      this.editingPhoto = null;
      this.showEditPhotoDialog = true;
    });
  }

  async onSavePhoto(event: { photo: Photo; imageBlob?: Blob; isSelectedWork: boolean }) {
    await this.photoService.savePhoto(event.photo, event.imageBlob);
    const currentlySelected = this.photoService.isSelectedWork(event.photo.id);
    if (event.isSelectedWork !== currentlySelected) {
      await this.photoService.toggleSelectedWork(event.photo.id);
    }
    this.showEditPhotoDialog = false;
    this.editingPhoto = null;
    this.refreshData();
  }

  async onDeletePhoto(id: string) {
    await this.photoService.deletePhoto(id);
    this.showEditPhotoDialog = false;
    this.editingPhoto = null;
    this.closeLightbox();
    this.refreshData();
  }

  onEditCollection() {
    this.requireAuth(() => {
      this.showEditCollectionDialog = true;
    });
  }

  async onSaveCollection(event: { collection: Collection; imageBlob?: Blob }) {
    event.collection.photoCount = this.allPhotos.length;
    await this.photoService.saveCollection(event.collection, event.imageBlob);
    this.showEditCollectionDialog = false;
    if (this.collection) {
      this.collection = this.photoService.getCollection(this.collection.slug);
    }
  }

  onLightboxEdit() {
    if (this.lightboxPhoto) {
      this.onEditPhoto(this.lightboxPhoto);
    }
  }

  private refreshData() {
    if (this.collection) {
      this.allPhotos = this.photoService.getPhotosByCollection(this.collection.id);
      this.filteredPhotos = this.photoService.filterByTag(this.allPhotos, this.activeTag);
      this.tags = this.photoService.getTagsForCollection(this.collection.id);
    }
  }
}
