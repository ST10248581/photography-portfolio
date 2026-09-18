import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Photo } from '../../models/photo.model';
import { PhotoCardComponent } from '../photo-card/photo-card.component';

@Component({
  selector: 'app-photo-grid',
  standalone: true,
  imports: [CommonModule, PhotoCardComponent],
  templateUrl: './photo-grid.component.html',
  styleUrl: './photo-grid.component.scss',
})
export class PhotoGridComponent {
  @Input({ required: true }) photos: Photo[] = [];
  @Input() variant: 'masonry' | 'uniform' = 'uniform';
  @Output() photoClick = new EventEmitter<Photo>();

  onPhotoClick(photo: Photo) {
    this.photoClick.emit(photo);
  }
}
