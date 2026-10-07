import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PageHeroComponent } from '../../components/page-hero/page-hero.component';

interface PhotoBundle {
  count: string;
  label: string;
  price: number;
  note: string;
  /** Number of photos, for the per-photo figure. Omitted for the full collection. */
  photos?: number;
}

interface Shoot {
  name: string;
  price: number;
  duration: string;
  people: string;
  locations: string;
  delivered: string;
}

interface Subject {
  label: string;
  slug?: string;
}

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [CommonModule, RouterModule, PageHeroComponent],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss',
})
export class PricingComponent {
  readonly enquiryHref =
    'mailto:troykrause07@gmail.com?subject=' + encodeURIComponent('Photography enquiry');

  bundles: PhotoBundle[] = [
    { count: '1', label: 'Single', price: 50, photos: 1, note: 'One high-resolution edited photograph from the portfolio.' },
    { count: '5', label: 'Five', price: 200, photos: 5, note: 'Choose any five photographs from the available portfolio.' },
    { count: '10', label: 'Ten', price: 350, photos: 10, note: 'Choose any ten photographs from the available portfolio.' },
    { count: '20', label: 'Twenty', price: 550, photos: 20, note: 'Choose any twenty photographs from the available portfolio.' },
    { count: 'All', label: 'Full Collection', price: 750, note: 'Every photograph currently available in the portfolio.' },
  ];

  subjects: Subject[] = [
    { label: 'Wildlife & Animals', slug: 'wildlife' },
    { label: 'Wild Durban & Nature', slug: 'wild-durban' },
    { label: 'Coastal & Ocean', slug: 'coastal' },
    { label: 'Moody Landscapes', slug: 'landscapes' },
    { label: 'Macro / Tiny Worlds', slug: 'macro' },
    { label: 'Landscapes & Scenery' },
    { label: 'Fishing & Outdoor' },
  ];

  shoots: Shoot[] = [
    { name: 'Mini', price: 350, duration: 'Up to 30 minutes', people: '1 person', locations: '1 Durban location', delivered: '5 edited photographs' },
    { name: 'Standard', price: 600, duration: 'Up to 1 hour', people: '1–2 people', locations: '1 Durban location', delivered: '15 edited photographs' },
    { name: 'Extended', price: 900, duration: 'Up to 1½ hours', people: 'Up to 4 people', locations: '1–2 nearby Durban locations', delivered: '30 edited photographs' },
  ];

  specialities = [
    'Portraits',
    'Couples',
    'Pets',
    'Cars & motorcycles',
    'Outdoor lifestyle',
    'Graduation photos',
    'Nature / environmental portraits',
  ];

  perPhoto(bundle: PhotoBundle): string | null {
    if (!bundle.photos || bundle.photos === 1) return null;
    const each = bundle.price / bundle.photos;
    return 'R' + (Number.isInteger(each) ? each : each.toFixed(2)) + ' each';
  }
}
