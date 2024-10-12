import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ProjectService } from 'src/app/services/project.service';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('projectsSection') projectsSection!: ElementRef;

  projects: any[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
    });
  }

  ngAfterViewInit() {

    const optionsSecondary = {
      strings: ["Blog !", ""],
      loop: true,
      typeSpeed: 100,
      backSpeed: 89,
      backDelay: 2000
    };

    const typedSecondary = new Typed('.typedText2', optionsSecondary);
  }

  aboutMe() {
    this.projectsSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
