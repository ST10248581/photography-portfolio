import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Collection } from '../../models/photo.model';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-edit-collection-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="edit-overlay" (click)="onOverlayClick($event)">
      <div class="edit-dialog">
        <div class="edit-header">
          <h3>{{ isNew ? 'Add Collection' : 'Edit Collection' }}</h3>
          <button class="close-btn" (click)="cancel.emit()" aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="edit-body">
          <div class="image-section">
            <div class="image-preview" [style.background-color]="form.placeholderColor">
              @if (imagePreview || form.coverImage) {
                <img [src]="imagePreview || form.coverImage" alt="Cover preview">
              } @else {
                <span class="no-image">No Cover Image</span>
              }
            </div>
            <button class="upload-btn" (click)="fileInput.click()">Upload Cover</button>
            <input #fileInput type="file" accept="image/*" (change)="onFileSelected($event)" hidden>
          </div>

          <div class="fields">
            <div class="field">
              <label>Title</label>
              <input [(ngModel)]="form.title" (ngModelChange)="onTitleChange()" placeholder="Collection title">
            </div>
            <div class="field">
              <label>Slug (URL path)</label>
              <input [(ngModel)]="form.slug" placeholder="url-friendly-name">
            </div>
            <div class="field">
              <label>Description</label>
              <textarea [(ngModel)]="form.description" placeholder="Collection description" rows="3"></textarea>
            </div>
            <div class="field">
              <label>Placeholder Color</label>
              <div class="color-row">
                <input type="color" [(ngModel)]="form.placeholderColor" class="color-input">
                <span class="color-value">{{ form.placeholderColor }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="edit-footer">
          @if (!isNew) {
            <button class="delete-btn" (click)="onDelete()">Delete Collection</button>
          }
          <div class="footer-right">
            <button class="cancel-btn" (click)="cancel.emit()">Cancel</button>
            <button class="save-btn" (click)="onSave()" [disabled]="!form.title || !form.slug">Save</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .edit-overlay {
      position: fixed;
      inset: 0;
      z-index: 300;
      background: var(--overlay);
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding: 24px;
      overflow-y: auto;
      animation: dlgFadeIn 0.2s ease both;
    }
    .edit-dialog {
      background: var(--bg-elevated);
      border: 1px solid var(--border);
      width: 500px;
      max-width: 100%;
      margin: 40px 0;
    }
    .edit-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 24px;
      border-bottom: 1px solid var(--border);
    }
    .edit-header h3 {
      font-size: 1rem;
      font-weight: 500;
      color: var(--text-primary);
    }
    .close-btn {
      color: var(--text-muted);
      padding: 4px;
      background: none;
      border: none;
      cursor: pointer;
    }
    .close-btn:hover { color: var(--text-primary); }
    .edit-body {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .image-section {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .image-preview {
      width: 100%;
      aspect-ratio: 16/9;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .image-preview img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .no-image {
      font-size: 0.75rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    .upload-btn {
      align-self: flex-start;
      padding: 8px 16px;
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      background: transparent;
      border: 1px solid var(--border);
      color: var(--text-secondary);
      cursor: pointer;
      font-family: var(--font-family);
    }
    .upload-btn:hover {
      border-color: var(--accent);
      color: var(--accent);
    }
    .fields {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .field label {
      font-size: 0.6875rem;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--text-muted);
    }
    .field input, .field textarea {
      padding: 8px 10px;
      background: var(--bg-primary);
      border: 1px solid var(--border);
      color: var(--text-primary);
      font-family: var(--font-family);
      font-size: 0.875rem;
      outline: none;
      transition: border-color 0.2s ease;
      resize: vertical;
    }
    .field input:focus, .field textarea:focus {
      border-color: var(--accent);
    }
    .color-row {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .color-input {
      width: 40px;
      height: 32px;
      padding: 2px;
      border: 1px solid var(--border);
      background: var(--bg-primary);
      cursor: pointer;
    }
    .color-value {
      font-size: 0.8125rem;
      color: var(--text-secondary);
      font-family: monospace;
    }
    .edit-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 24px;
      border-top: 1px solid var(--border);
    }
    .footer-right {
      display: flex;
      gap: 8px;
      margin-left: auto;
    }
    .delete-btn {
      padding: 8px 16px;
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      background: transparent;
      border: 1px solid #c45;
      color: #c45;
      cursor: pointer;
      font-family: var(--font-family);
    }
    .delete-btn:hover { background: rgba(204, 68, 85, 0.1); }
    .cancel-btn {
      padding: 8px 16px;
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      background: transparent;
      border: 1px solid var(--border);
      color: var(--text-secondary);
      cursor: pointer;
      font-family: var(--font-family);
    }
    .cancel-btn:hover {
      border-color: var(--text-muted);
      color: var(--text-primary);
    }
    .save-btn {
      padding: 8px 20px;
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      background: var(--accent);
      border: 1px solid var(--accent);
      color: #fff;
      cursor: pointer;
      font-family: var(--font-family);
    }
    .save-btn:hover:not(:disabled) {
      background: var(--accent-hover);
      border-color: var(--accent-hover);
    }
    .save-btn:disabled {
      opacity: 0.5;
      cursor: default;
    }
    @keyframes dlgFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `],
})
export class EditCollectionDialogComponent implements OnInit {
  @Input() collection: Collection | null = null;
  @Output() save = new EventEmitter<{ collection: Collection; imageBlob?: Blob }>();
  @Output() cancel = new EventEmitter<void>();
  @Output() delete = new EventEmitter<string>();

  isNew = false;
  imagePreview: string | null = null;
  private imageBlob: Blob | null = null;

  form = {
    title: '',
    slug: '',
    description: '',
    coverImage: undefined as string | undefined,
    placeholderColor: '#2a2522',
  };

  constructor(private photoService: PhotoService) {}

  ngOnInit() {
    this.isNew = !this.collection;

    if (this.collection) {
      this.form.title = this.collection.title;
      this.form.slug = this.collection.slug;
      this.form.description = this.collection.description;
      this.form.coverImage = this.collection.coverImage;
      this.form.placeholderColor = this.collection.coverPlaceholder.bgColor;
    }
  }

  onTitleChange() {
    if (this.isNew) {
      this.form.slug = this.form.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.imageBlob = input.files[0];
      if (this.imagePreview) URL.revokeObjectURL(this.imagePreview);
      this.imagePreview = URL.createObjectURL(input.files[0]);
    }
  }

  onSave() {
    if (!this.form.title || !this.form.slug) return;

    const collection: Collection = {
      id: this.collection?.id || this.photoService.generateId('c'),
      title: this.form.title,
      slug: this.form.slug,
      description: this.form.description,
      coverImage: this.imagePreview ? undefined : this.form.coverImage,
      coverPlaceholder: {
        bgColor: this.form.placeholderColor,
        label: this.form.title,
      },
      photoCount: this.collection?.photoCount || 0,
    };

    this.save.emit({
      collection,
      imageBlob: this.imageBlob || undefined,
    });
  }

  onDelete() {
    if (this.collection && confirm('Delete this collection and all its photos?')) {
      this.delete.emit(this.collection.id);
    }
  }

  onOverlayClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('edit-overlay')) {
      this.cancel.emit();
    }
  }
}
