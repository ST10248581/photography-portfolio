import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Photo } from '../../models/photo.model';

@Component({
  selector: 'app-lightbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lightbox.component.html',
  styleUrl: './lightbox.component.scss',
})
export class LightboxComponent {
  @Input() photo: Photo | null = null;
  @Input() photos: Photo[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() navigate = new EventEmitter<Photo>();
  @Output() editClick = new EventEmitter<void>();

  showExif = false;

  @HostListener('document:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    if (!this.photo) return;
    if (e.key === 'Escape') this.close.emit();
    if (e.key === 'ArrowRight') this.next();
    if (e.key === 'ArrowLeft') this.prev();
  }

  onOverlayClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('lightbox-overlay')) {
      this.close.emit();
    }
  }

  toggleExif() {
    this.showExif = !this.showExif;
  }

  get currentIndex(): number {
    if (!this.photo) return -1;
    return this.photos.findIndex((p) => p.id === this.photo!.id);
  }

  next() {
    const idx = this.currentIndex;
    if (idx < this.photos.length - 1) {
      this.navigate.emit(this.photos[idx + 1]);
    }
  }

  prev() {
    const idx = this.currentIndex;
    if (idx > 0) {
      this.navigate.emit(this.photos[idx - 1]);
    }
  }

  get hasNext(): boolean {
    return this.currentIndex < this.photos.length - 1;
  }

  get hasPrev(): boolean {
    return this.currentIndex > 0;
  }
}
