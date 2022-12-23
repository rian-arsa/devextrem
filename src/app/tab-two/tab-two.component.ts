import { Component } from '@angular/core';
import { Post } from '../tab-one/post.model';
import { PostService } from '../tab-one/post.service';

@Component({
  selector: 'app-tab-two',
  templateUrl: './tab-two.component.html',
  styleUrls: ['./tab-two.component.css']
})
export class TabTwoComponent {
  posts: Post[] = []

  constructor(private postService: PostService) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.postService.getPosts().subscribe(res => {
      this.posts = res
    })
  }
}
