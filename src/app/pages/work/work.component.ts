import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionCardComponent } from '../../components/collection-card/collection-card.component';
import { PhotoService } from '../../services/photo.service';
import { Collection } from '../../models/photo.model';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule, CollectionCardComponent],
  templateUrl: './work.component.html',
  styleUrl: './work.component.scss',
})
export class WorkComponent implements OnInit {
  collections: Collection[] = [];

  constructor(private photoService: PhotoService) {}

  ngOnInit() {
    this.collections = this.photoService.getCollections();
  }
}
