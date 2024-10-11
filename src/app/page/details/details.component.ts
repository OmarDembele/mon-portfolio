import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  pageId: string | null = null;
  pageData: any;
  project: any;
  previousProject: any;
  nextProject: any;
  projects: any[] = []; // Assurez-vous que cette liste est remplie

  constructor(private route: ActivatedRoute, private projectService: ProjectService, private router: Router, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // Récupérer tous les projets
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
      // Récupérer l'ID à partir de l'URL
      this.pageId = this.route.snapshot.paramMap.get('id');
      // Charger les données associées à cet ID
      this.loadPageDetails(this.pageId);
      // Définir les projets précédent et suivant
      this.setNavigationLinks(Number(this.pageId));
    });

    // Écouter les changements d'URL pour charger le bon projet
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadPageDetails(id);
        this.setNavigationLinks(Number(id));
      }
    });
  }

  // Charger les données en fonction de l'ID
  loadPageDetails(id: string | null): void {
    this.projectService.getProjects().subscribe(data => {
      this.pageData = data.find((proj: any) => proj.id === Number(id));
    });
  }

  // Définir les projets précédent et suivant
  setNavigationLinks(currentProjectId: number): void {
    const currentIndex = this.projects.findIndex(proj => proj.id === currentProjectId);
    this.previousProject = this.projects[currentIndex - 1] || null;
    this.nextProject = this.projects[currentIndex + 1] || null;
  }

  // Navigation vers un projet donné par son ID
  navigateToProject(projectId: number): void {
    this.router.navigate(['/details', projectId]);
  }

  // Méthode pour formater la description
  formatDescription(description: string): any {
    return this.sanitizer.bypassSecurityTrustHtml(description.replace(/\n/g, '<br>'));
  }
}
