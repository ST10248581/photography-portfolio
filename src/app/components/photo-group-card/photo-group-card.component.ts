import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Photo, PhotoGroup } from '../../models/photo.model';
import { WatermarkComponent } from '../watermark/watermark.component';

/** Collage tile for a sub-collection — up to three frames, with a count badge. */
@Component({
  selector: 'app-photo-group-card',
  standalone: true,
  imports: [CommonModule, WatermarkComponent],
  templateUrl: './photo-group-card.component.html',
  styleUrl: './photo-group-card.component.scss',
})
export class PhotoGroupCardComponent {
  @Input({ required: true }) group!: PhotoGroup;
  @Input({ required: true }) photos: Photo[] = [];
  @Output() groupClick = new EventEmitter<void>();

  get tiles(): Photo[] {
    return this.photos.slice(0, 3);
  }

  /** Photos beyond the three shown in the collage. */
  get extra(): number {
    return Math.max(0, this.photos.length - 3);
  }
}
