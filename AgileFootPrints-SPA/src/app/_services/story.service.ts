import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { AlertifyService } from './alertify.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { EpicService } from './epic.service';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  projectId: string;
  baseUrl = environment.apiUrl + 'story/';
  constructor(
    private http: HttpClient,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  deleteStory(id: string) {
    console.log('Story to delete : ', id);
    return this.http.delete(this.baseUrl + 'deleteStory/' + id);
  }
}