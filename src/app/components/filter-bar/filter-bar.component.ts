import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss',
})
export class FilterBarComponent {
  @Input() tags: string[] = [];
  @Input() activeTag = 'all';
  @Output() tagChange = new EventEmitter<string>();

  onTagClick(tag: string) {
    this.tagChange.emit(tag);
  }
}
