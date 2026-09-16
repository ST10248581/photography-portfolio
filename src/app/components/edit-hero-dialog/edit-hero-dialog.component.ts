import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroConfig } from '../../models/photo.model';

@Component({
  selector: 'app-edit-hero-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="edit-overlay" (click)="onOverlayClick($event)">
      <div class="edit-dialog">
        <div class="edit-header">
          <h3>Edit Hero</h3>
          <button class="close-btn" (click)="cancel.emit()" aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="edit-body">
          <div class="image-section">
            <div class="image-preview">
              @if (imagePreview || form.imagePath) {
                <img [src]="imagePreview || form.imagePath" alt="Hero preview">
              } @else {
                <span class="no-image">No Background Image</span>
              }
            </div>
            <button class="upload-btn" (click)="fileInput.click()">Upload Background</button>
            <input #fileInput type="file" accept="image/*" (change)="onFileSelected($event)" hidden>
          </div>

          <div class="fields">
            <div class="field">
              <label>Kicker</label>
              <input [(ngModel)]="form.kicker" placeholder="e.g. Wildlife · Nature · Exploration">
            </div>
            <div class="field">
              <label>Title</label>
              <input [(ngModel)]="form.title" placeholder="Main title">
            </div>
            <div class="field">
              <label>Subtitle</label>
              <input [(ngModel)]="form.subtitle" placeholder="Subtitle text">
            </div>
          </div>
        </div>

        <div class="edit-footer">
          <div class="footer-right">
            <button class="cancel-btn" (click)="cancel.emit()">Cancel</button>
            <button class="save-btn" (click)="onSave()">Save</button>
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
      background: var(--bg-primary);
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
    .field input {
      padding: 8px 10px;
      background: var(--bg-primary);
      border: 1px solid var(--border);
      color: var(--text-primary);
      font-family: var(--font-family);
      font-size: 0.875rem;
      outline: none;
      transition: border-color 0.2s ease;
    }
    .field input:focus {
      border-color: var(--accent);
    }
    .edit-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 16px 24px;
      border-top: 1px solid var(--border);
    }
    .footer-right {
      display: flex;
      gap: 8px;
    }
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
    .save-btn:hover {
      background: var(--accent-hover);
      border-color: var(--accent-hover);
    }
    @keyframes dlgFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `],
})
export class EditHeroDialogComponent implements OnInit {
  @Input() config!: HeroConfig;
  @Output() save = new EventEmitter<{ config: HeroConfig; imageBlob?: Blob }>();
  @Output() cancel = new EventEmitter<void>();

  imagePreview: string | null = null;
  private imageBlob: Blob | null = null;

  form = {
    imagePath: undefined as string | undefined,
    kicker: '',
    title: '',
    subtitle: '',
  };

  ngOnInit() {
    this.form.imagePath = this.config.imagePath;
    this.form.kicker = this.config.kicker;
    this.form.title = this.config.title;
    this.form.subtitle = this.config.subtitle;
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
    const config: HeroConfig = {
      imagePath: this.imagePreview ? undefined : this.form.imagePath,
      kicker: this.form.kicker,
      title: this.form.title,
      subtitle: this.form.subtitle,
    };

    this.save.emit({
      config,
      imageBlob: this.imageBlob || undefined,
    });
  }

  onOverlayClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('edit-overlay')) {
      this.cancel.emit();
    }
  }
}
