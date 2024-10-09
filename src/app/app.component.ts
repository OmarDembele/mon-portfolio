import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'portfolio-omar';

  isMenuActive: boolean = false;

  onMenuToggle(isActive: boolean) {
    this.isMenuActive = isActive; // Met à jour l'état du menu
    console.log(isActive)
  }

}
