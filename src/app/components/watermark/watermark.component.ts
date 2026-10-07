import { Component, Input } from '@angular/core';
import { WATERMARK } from '../../data/watermark.data';

/**
 * Watermark laid over a photo: a faint diagonal tiling of the text (hard to
 * crop out) plus a clearer mark in the bottom-right corner. Drop it inside any
 * `position: relative` box that is exactly the size of the image.
 */
@Component({
  selector: 'app-watermark',
  standalone: true,
  templateUrl: './watermark.component.html',
  styleUrl: './watermark.component.scss',
  host: { 'aria-hidden': 'true', '[class.large]': "size === 'large'" },
})
export class WatermarkComponent {
  /** 'large' for the lightbox — bigger tiles and corner text. */
  @Input() size: 'small' | 'large' = 'small';

  readonly config = WATERMARK;
  readonly tile = WatermarkComponent.buildTile(WATERMARK.text);

  /** A single rotated line of text as an SVG, repeated as a background. */
  private static buildTile(text: string): string {
    const safe = text.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="260" height="160">` +
      `<text x="130" y="86" text-anchor="middle" transform="rotate(-24 130 80)" ` +
      `font-family="Inter, Segoe UI, sans-serif" font-size="15" font-weight="500" letter-spacing="2" ` +
      `fill="#fff" stroke="#000" stroke-opacity="0.35" stroke-width="0.6">${safe}</text></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }
}
