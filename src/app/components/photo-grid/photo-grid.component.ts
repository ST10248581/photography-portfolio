import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridItem, Photo } from '../../models/photo.model';
import { PhotoCardComponent } from '../photo-card/photo-card.component';
import { PhotoGroupCardComponent } from '../photo-group-card/photo-group-card.component';

@Component({
  selector: 'app-photo-grid',
  standalone: true,
  imports: [CommonModule, PhotoCardComponent, PhotoGroupCardComponent],
  templateUrl: './photo-grid.component.html',
  styleUrl: './photo-grid.component.scss',
})
export class PhotoGridComponent {
  @Input({ required: true }) items: GridItem[] = [];
  @Input() variant: 'masonry' | 'uniform' = 'uniform';
  @Output() photoClick = new EventEmitter<Photo>();
  /** Emits the group's photos, in order. */
  @Output() groupClick = new EventEmitter<Photo[]>();

  onPhotoClick(photo: Photo) {
    this.photoClick.emit(photo);
  }

  trackItem(item: GridItem): string {
    return item.kind === 'photo' ? item.photo.id : item.group.id;
  }
}
