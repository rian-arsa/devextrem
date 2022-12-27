import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

import { Post } from '../tab-one/post.model';
import { PostService } from '../tab-one/post.service'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  title = 'exercise-week2';

  constructor(private router: Router, private postService: PostService) {

  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  onItemClick(e: any) {
    console.log(e);

    if (e.itemIndex === 0) {
      this.router.navigate(['./home/tab-1'])
    } else {
      this.router.navigate(['./home/tab-2'])
    }
  }
}
