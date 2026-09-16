import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroComponent } from '../../components/hero/hero.component';
import { PhotoCardComponent } from '../../components/photo-card/photo-card.component';
import { LightboxComponent } from '../../components/lightbox/lightbox.component';
import { PinDialogComponent } from '../../components/pin-dialog/pin-dialog.component';
import { EditPhotoDialogComponent } from '../../components/edit-photo-dialog/edit-photo-dialog.component';
import { EditHeroDialogComponent } from '../../components/edit-hero-dialog/edit-hero-dialog.component';
import { PhotoService } from '../../services/photo.service';
import { AdminService } from '../../services/admin.service';
import { Photo, HeroConfig } from '../../models/photo.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, RouterModule, HeroComponent, PhotoCardComponent,
    LightboxComponent, PinDialogComponent, EditPhotoDialogComponent,
    EditHeroDialogComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  selectedWork: Photo[] = [];
  lightboxPhoto: Photo | null = null;
  heroConfig: HeroConfig;

  showPinDialog = false;
  showEditPhotoDialog = false;
  showEditHeroDialog = false;
  editingPhoto: Photo | null = null;
  private pendingAction: (() => void) | null = null;

  constructor(
    private photoService: PhotoService,
    private admin: AdminService,
  ) {
    this.heroConfig = this.photoService.getHeroConfig();
  }

  ngOnInit() {
    this.selectedWork = this.photoService.getSelectedWork();
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

  onEditHero() {
    this.requireAuth(() => {
      this.showEditHeroDialog = true;
    });
  }

  async onSaveHero(event: { config: HeroConfig; imageBlob?: Blob }) {
    await this.photoService.saveHeroConfig(event.config, event.imageBlob);
    this.heroConfig = this.photoService.getHeroConfig();
    this.showEditHeroDialog = false;
  }

  onLightboxEdit() {
    if (this.lightboxPhoto) {
      this.onEditPhoto(this.lightboxPhoto);
    }
  }

  private refreshData() {
    this.selectedWork = this.photoService.getSelectedWork();
    this.heroConfig = this.photoService.getHeroConfig();
  }
}
