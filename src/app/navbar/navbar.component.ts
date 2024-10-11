import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Output() menuToggle = new EventEmitter<boolean>();
  isMenuActive: boolean = false;

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive; // Inverse l'état du menu
    this.menuToggle.emit(this.isMenuActive); // Émet l'état vers le composant parent
  }

  closeMenu() {
    this.isMenuActive = false; // Ferme le menu
    this.menuToggle.emit(this.isMenuActive); // Émet l'état mis à jour vers le composant parent
  }

  openCV() {
    window.open('assets/pdf/cv.pdf', '_blank');
  }
  
}
