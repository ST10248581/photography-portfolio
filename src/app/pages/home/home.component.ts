import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroComponent } from '../../components/hero/hero.component';
import { PhotoCardComponent } from '../../components/photo-card/photo-card.component';
import { LightboxComponent } from '../../components/lightbox/lightbox.component';
import { PhotoService } from '../../services/photo.service';
import { Photo, HeroConfig } from '../../models/photo.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HeroComponent, PhotoCardComponent, LightboxComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  selectedWork: Photo[] = [];
  lightboxPhoto: Photo | null = null;
  heroConfig: HeroConfig;

  constructor(private photoService: PhotoService) {
    this.heroConfig = this.photoService.getHeroConfig();
  }

  ngOnInit() {
    this.selectedWork = this.photoService.getSelectedWork();
  }

  openLightbox(photo: Photo) {
    this.lightboxPhoto = photo;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.lightboxPhoto = null;
    document.body.style.overflow = '';
  }

  navigateLightbox(photo: Photo) {
    this.lightboxPhoto = photo;
  }
}
