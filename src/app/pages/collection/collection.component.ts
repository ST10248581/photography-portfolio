import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PhotoGridComponent } from '../../components/photo-grid/photo-grid.component';
import { FilterBarComponent } from '../../components/filter-bar/filter-bar.component';
import { LightboxComponent } from '../../components/lightbox/lightbox.component';
import { PhotoService } from '../../services/photo.service';
import { Photo, Collection } from '../../models/photo.model';

@Component({
  selector: 'app-collection',
  standalone: true,
  imports: [
    CommonModule, RouterModule, PhotoGridComponent, FilterBarComponent,
    LightboxComponent,
  ],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss',
})
export class CollectionComponent implements OnInit {
  collection: Collection | undefined;
  allPhotos: Photo[] = [];
  filteredPhotos: Photo[] = [];
  tags: string[] = [];
  activeTag = 'all';
  lightboxPhoto: Photo | null = null;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug') || '';
      this.loadCollection(slug);
    });
  }

  private loadCollection(slug: string) {
    this.collection = this.photoService.getCollection(slug);
    if (this.collection) {
      this.allPhotos = this.photoService.getPhotosByCollection(this.collection.id);
      this.filteredPhotos = [...this.allPhotos];
      this.tags = this.photoService.getTagsForCollection(this.collection.id);
      this.activeTag = 'all';
    }
  }

  onTagChange(tag: string) {
    this.activeTag = tag;
    this.filteredPhotos = this.photoService.filterByTag(this.allPhotos, tag);
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
