import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionCardComponent } from '../../components/collection-card/collection-card.component';
import { PinDialogComponent } from '../../components/pin-dialog/pin-dialog.component';
import { EditCollectionDialogComponent } from '../../components/edit-collection-dialog/edit-collection-dialog.component';
import { PhotoService } from '../../services/photo.service';
import { AdminService } from '../../services/admin.service';
import { Collection } from '../../models/photo.model';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule, CollectionCardComponent, PinDialogComponent, EditCollectionDialogComponent],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss',
})
export class WorkComponent implements OnInit {
  collections: Collection[] = [];

  showPinDialog = false;
  showEditCollectionDialog = false;
  editingCollection: Collection | null = null;
  private pendingAction: (() => void) | null = null;

  constructor(
    private photoService: PhotoService,
    private admin: AdminService,
  ) {}

  ngOnInit() {
    this.collections = this.photoService.getCollections();
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

  onEditCollection(collection: Collection) {
    this.requireAuth(() => {
      this.editingCollection = collection;
      this.showEditCollectionDialog = true;
    });
  }

  onAddCollection() {
    this.requireAuth(() => {
      this.editingCollection = null;
      this.showEditCollectionDialog = true;
    });
  }

  async onSaveCollection(event: { collection: Collection; imageBlob?: Blob }) {
    event.collection.photoCount = this.photoService.getPhotosByCollection(event.collection.id).length;
    await this.photoService.saveCollection(event.collection, event.imageBlob);
    this.showEditCollectionDialog = false;
    this.editingCollection = null;
    this.collections = this.photoService.getCollections();
  }

  async onDeleteCollection(id: string) {
    await this.photoService.deleteCollection(id);
    this.showEditCollectionDialog = false;
    this.editingCollection = null;
    this.collections = this.photoService.getCollections();
  }
}
