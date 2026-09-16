import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  mobileMenuOpen = false;
  scrolled = false;
  workDropdownOpen = false;

  collections = [
    { title: 'Wildlife & Animals', slug: 'wildlife' },
    { title: 'Wild Durban', slug: 'wild-durban' },
    { title: 'Moody Landscapes', slug: 'landscapes' },
    { title: 'Macro / Tiny Worlds', slug: 'macro' },
    { title: 'Coastal / Fishing', slug: 'coastal' },
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 20;
  }

  toggleMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    if (this.mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMenu() {
    this.mobileMenuOpen = false;
    this.workDropdownOpen = false;
    document.body.style.overflow = '';
  }
}
