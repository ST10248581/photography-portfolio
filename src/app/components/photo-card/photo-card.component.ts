import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Photo } from '../../models/photo.model';

@Component({
  selector: 'app-photo-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photo-card.component.html',
  styleUrl: './photo-card.component.scss',
})
export class PhotoCardComponent {
  @Input({ required: true }) photo!: Photo;
  @Input() showMeta = true;
  @Output() photoClick = new EventEmitter<Photo>();

  onClick() {
    this.photoClick.emit(this.photo);
  }
}
