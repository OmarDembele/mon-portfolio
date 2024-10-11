import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {

  name: string = '';
  email: string = '';
  message: string = '';
  isLoading: boolean = false; // Ajout d'une variable de chargement

  constructor(private toastr: ToastrService) {}

  sendEmail(event: Event) {
    event.preventDefault(); // Empêche le rechargement de la page

    if (this.name === '' || this.email === '' || this.message === '') {
      this.showError();
    } else {
      this.isLoading = true; // Afficher le chargement

      // Ajouter une pause de 3 secondes avant d'envoyer l'email
      setTimeout(() => {
        emailjs.init('l_qpkVeLSf03jh3Rr');
        emailjs.send("service_vzw04nx", "template_mqsxqgj", {
          from_name: this.name,
          to_name: "Omar Dembele",
          from_email: this.email,
          message: this.message,
        }).then((response) => {
          console.log('SUCCESS!', response.status, response.text);
          this.showSuccess();

          // Réinitialiser le formulaire après l'envoi
          this.name = '';
          this.email = '';
          this.message = '';
          this.isLoading = false; // Masquer le chargement
        }, (error) => {
          console.log('FAILED...', error);
          this.showError();
          this.isLoading = false; // Masquer le chargement en cas d'erreur
        });
      }, 3000); // Délai de 3 secondes
    }
  }

  showSuccess() {
    this.toastr.success('Message envoyé avec succès !');
  }

  showError() {
    this.toastr.error('Échec de l\'envoi du message.');
  }

  downloadCV() {
    const link = document.createElement('a');
    link.href = 'assets/pdf/cv.pdf';
    link.download = 'mon_cv.pdf'; // Vous pouvez spécifier un nom de fichier ici
    link.click();
  }
}

