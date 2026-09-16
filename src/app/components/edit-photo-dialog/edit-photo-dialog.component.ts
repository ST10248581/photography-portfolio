import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Photo, Collection } from '../../models/photo.model';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-edit-photo-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="edit-overlay" (click)="onOverlayClick($event)">
      <div class="edit-dialog">
        <div class="edit-header">
          <h3>{{ isNew ? 'Add Photo' : 'Edit Photo' }}</h3>
          <button class="close-btn" (click)="cancel.emit()" aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="edit-body">
          <div class="image-section">
            <div class="image-preview" [style.background-color]="form.placeholderColor">
              @if (imagePreview || form.imagePath) {
                <img [src]="imagePreview || form.imagePath" alt="Preview">
              } @else {
                <span class="no-image">No Image</span>
              }
            </div>
            <button class="upload-btn" (click)="fileInput.click()">Upload Image</button>
            <input #fileInput type="file" accept="image/*" (change)="onFileSelected($event)" hidden>
          </div>

          <div class="fields">
            <div class="field">
              <label>Title</label>
              <input [(ngModel)]="form.title" placeholder="Photo title">
            </div>

            <div class="field-row">
              <div class="field">
                <label>Location</label>
                <input [(ngModel)]="form.location" placeholder="Location">
              </div>
              <div class="field">
                <label>Date</label>
                <input [(ngModel)]="form.date" placeholder="e.g. 2024">
              </div>
            </div>

            <div class="field-row">
              <div class="field">
                <label>Aspect Ratio</label>
                <select [(ngModel)]="form.aspectRatio">
                  <option value="landscape">Landscape (3:2)</option>
                  <option value="portrait">Portrait (2:3)</option>
                  <option value="square">Square (1:1)</option>
                </select>
              </div>
              <div class="field">
                <label>Collection</label>
                <select [(ngModel)]="form.collectionId">
                  @for (c of collections; track c.id) {
                    <option [value]="c.id">{{ c.title }}</option>
                  }
                </select>
              </div>
            </div>

            <div class="field">
              <label>Tags (comma-separated)</label>
              <input [(ngModel)]="form.tagsString" placeholder="birds, mammals, etc.">
            </div>

            <div class="field">
              <label>Description</label>
              <textarea [(ngModel)]="form.description" placeholder="Optional description" rows="2"></textarea>
            </div>

            <div class="field-row">
              <div class="field">
                <label>Species</label>
                <input [(ngModel)]="form.species" placeholder="Scientific name">
              </div>
              <div class="field">
                <label>Observation</label>
                <input [(ngModel)]="form.observation" placeholder="Field notes">
              </div>
            </div>

            <div class="exif-section">
              <label class="section-label">Camera Info</label>
              <div class="field-row">
                <div class="field"><input [(ngModel)]="form.exifCamera" placeholder="Camera body"></div>
                <div class="field"><input [(ngModel)]="form.exifLens" placeholder="Lens"></div>
              </div>
              <div class="field-row">
                <div class="field"><input [(ngModel)]="form.exifShutter" placeholder="Shutter speed"></div>
                <div class="field"><input [(ngModel)]="form.exifAperture" placeholder="Aperture"></div>
                <div class="field"><input [(ngModel)]="form.exifIso" placeholder="ISO"></div>
              </div>
            </div>

            <div class="field check-field">
              <label>
                <input type="checkbox" [(ngModel)]="form.isSelectedWork">
                Include in Selected Work on homepage
              </label>
            </div>
          </div>
        </div>

        <div class="edit-footer">
          @if (!isNew) {
            <button class="delete-btn" (click)="onDelete()">Delete</button>
          }
          <div class="footer-right">
            <button class="cancel-btn" (click)="cancel.emit()">Cancel</button>
            <button class="save-btn" (click)="onSave()" [disabled]="!form.title">Save</button>
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
      width: 600px;
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
      flex: 1;
    }
    .field label {
      font-size: 0.6875rem;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--text-muted);
    }
    .field input, .field select, .field textarea {
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
    .field input:focus, .field select:focus, .field textarea:focus {
      border-color: var(--accent);
    }
    .field select { cursor: pointer; }
    .field-row {
      display: flex;
      gap: 12px;
    }
    .exif-section {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-top: 8px;
      border-top: 1px solid var(--border);
    }
    .section-label {
      font-size: 0.6875rem;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--text-muted);
    }
    .check-field label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.8125rem;
      color: var(--text-secondary);
      cursor: pointer;
      text-transform: none;
      letter-spacing: normal;
    }
    .check-field input[type="checkbox"] {
      width: 16px;
      height: 16px;
      accent-color: var(--accent);
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
    @media (max-width: 600px) {
      .field-row { flex-direction: column; }
      .edit-dialog { margin: 0; }
    }
  `],
})
export class EditPhotoDialogComponent implements OnInit {
  @Input() photo: Photo | null = null;
  @Input() collectionId = '';
  @Output() save = new EventEmitter<{ photo: Photo; imageBlob?: Blob; isSelectedWork: boolean }>();
  @Output() cancel = new EventEmitter<void>();
  @Output() delete = new EventEmitter<string>();

  collections: Collection[] = [];
  isNew = false;
  imagePreview: string | null = null;
  private imageBlob: Blob | null = null;

  form = {
    title: '',
    location: 'KwaZulu-Natal',
    date: new Date().getFullYear().toString(),
    aspectRatio: 'landscape' as 'landscape' | 'portrait' | 'square',
    collectionId: '',
    tagsString: '',
    description: '',
    species: '',
    observation: '',
    exifCamera: '',
    exifLens: '',
    exifShutter: '',
    exifAperture: '',
    exifIso: '',
    placeholderColor: '#2a2522',
    isSelectedWork: false,
    imagePath: undefined as string | undefined,
  };

  constructor(private photoService: PhotoService) {}

  ngOnInit() {
    this.collections = this.photoService.getCollections();
    this.isNew = !this.photo;

    if (this.photo) {
      this.form.title = this.photo.title;
      this.form.location = this.photo.location;
      this.form.date = this.photo.date;
      this.form.aspectRatio = this.photo.aspectRatio;
      this.form.collectionId = this.photo.collectionId;
      this.form.tagsString = this.photo.tags.join(', ');
      this.form.description = this.photo.description || '';
      this.form.species = this.photo.species || '';
      this.form.observation = this.photo.observation || '';
      this.form.exifCamera = this.photo.exif?.camera || '';
      this.form.exifLens = this.photo.exif?.lens || '';
      this.form.exifShutter = this.photo.exif?.shutterSpeed || '';
      this.form.exifAperture = this.photo.exif?.aperture || '';
      this.form.exifIso = this.photo.exif?.iso || '';
      this.form.placeholderColor = this.photo.placeholder.bgColor;
      this.form.isSelectedWork = this.photoService.isSelectedWork(this.photo.id);
      this.form.imagePath = this.photo.imagePath;
    } else {
      this.form.collectionId = this.collectionId;
      const coll = this.collections.find((c) => c.id === this.collectionId);
      if (coll) {
        this.form.placeholderColor = coll.coverPlaceholder.bgColor;
      }
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
    if (!this.form.title) return;

    const tags = this.form.tagsString
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const photo: Photo = {
      id: this.photo?.id || this.photoService.generateId('p'),
      title: this.form.title,
      location: this.form.location,
      date: this.form.date,
      category: this.form.collectionId,
      collectionId: this.form.collectionId,
      tags,
      aspectRatio: this.form.aspectRatio,
      description: this.form.description || undefined,
      species: this.form.species || undefined,
      observation: this.form.observation || undefined,
      exif: {
        camera: this.form.exifCamera || undefined,
        lens: this.form.exifLens || undefined,
        shutterSpeed: this.form.exifShutter || undefined,
        aperture: this.form.exifAperture || undefined,
        iso: this.form.exifIso || undefined,
      },
      imagePath: this.imagePreview ? undefined : this.form.imagePath,
      placeholder: {
        bgColor: this.form.placeholderColor,
        label: this.form.title,
      },
    };

    this.save.emit({
      photo,
      imageBlob: this.imageBlob || undefined,
      isSelectedWork: this.form.isSelectedWork,
    });
  }

  onDelete() {
    if (this.photo && confirm('Delete this photo?')) {
      this.delete.emit(this.photo.id);
    }
  }

  onOverlayClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('edit-overlay')) {
      this.cancel.emit();
    }
  }
}
