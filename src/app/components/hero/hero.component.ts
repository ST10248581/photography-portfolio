import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroConfig } from '../../models/photo.model';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  @Input() config: HeroConfig = {
    imagePath: 'assets/photos/krantzkloof-river.jpg',
    kicker: 'Wildlife \u00b7 Nature \u00b7 Exploration',
    title: 'TROY',
    subtitle: 'Photography from KwaZulu-Natal',
  };
  @Output() editClick = new EventEmitter<void>();

  onEditClick(event: MouseEvent) {
    event.stopPropagation();
    this.editClick.emit();
  }
}
