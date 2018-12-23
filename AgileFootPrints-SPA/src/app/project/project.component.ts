import {
  Component,
  OnInit,
  TemplateRef,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ProjectService } from '../_services/project.service';
import { AlertifyService } from '../_services/alertify.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { EpicService } from '../_services/epic.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  userId = this.authService.decodedToken.nameid;
  userProjects = [];
  modalRef: BsModalRef;
  isCollapsed = true;
  projectModel: any = {};
  projectId: string;
  projectEpics = [];

  constructor(
    private authService: AuthService,
    private projectService: ProjectService,
    private alertify: AlertifyService,
    private modalService: BsModalService,
    private epicService: EpicService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUserProjects();
  }

  getUserProjects() {
    this.projectService.getAllUserProjects(this.userId).subscribe(
      data => {
        this.userProjects = data;
        console.log(this.userProjects);
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  closeModal() {
    this.modalRef.hide();
  }

  newProject() {
    this.projectModel.userId = this.authService.decodedToken.nameid;
    this.projectModel.statusId = 2;
    console.log('New project', this.projectModel);
    this.projectService.newProject(this.projectModel).subscribe(
      success => {
        this.closeModal();
        this.userProjects.push(success); // pushing newly created project into array
        this.alertify.success('Project Created Successfully');
        // this.router.navigate(['/project']);
      },
      error => {
        this.alertify.error(error.message);
      }
    );
  }

  sendProjectId(id: number) {
    this.projectId = id.toString();
    this.epicService.changeId(this.projectId);
    this.router.navigate(['/epic']);
  }
}
