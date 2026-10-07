import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Full-bleed photo banner used at the top of the Work, Pricing and About pages. */
@Component({
  selector: 'app-page-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-hero.component.html',
  styleUrl: './page-hero.component.scss',
})
export class PageHeroComponent {
  @Input({ required: true }) imagePath!: string;
  @Input({ required: true }) title!: string;
  @Input() kicker = '';
  /** Short facts shown in a dotted line under the title. */
  @Input() facts: string[] = [];
  /** CSS object-position for the background, to keep the subject in frame. */
  @Input() imagePosition = 'center 45%';
}
