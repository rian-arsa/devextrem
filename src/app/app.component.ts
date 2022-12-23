import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { Post } from './tab-one/post.model';
import { PostService } from './tab-one/post.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'exercise-week2';

}

