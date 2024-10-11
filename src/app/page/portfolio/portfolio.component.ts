import { Component } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {

  downloadCV() {
    const link = document.createElement('a');
    link.href = 'assets/pdf/cv.pdf';
    link.download = 'mon_cv.pdf'; // Vous pouvez spécifier un nom de fichier ici
    link.click();
  }
}
