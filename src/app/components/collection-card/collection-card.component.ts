import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Collection } from '../../models/photo.model';

@Component({
  selector: 'app-collection-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './collection-card.component.html',
  styleUrl: './collection-card.component.scss',
})
export class CollectionCardComponent {
  @Input({ required: true }) collection!: Collection;
}
