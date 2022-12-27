import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

import { PostService } from './post.service';
import { Post } from './post.model';
import { genres } from '../shared/genres';



@Component({
  selector: 'app-tab-one',
  templateUrl: './tab-one.component.html',
  styleUrls: ['./tab-one.component.css']
})
export class TabOneComponent {
  posts: Post[] = []
  isPopupVisible = false
  isLoading = false

  isSuccess = false

  genres = genres

  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.isLoading = true
    this.postService.getPosts().subscribe(
      dataPost => {
        this.posts = dataPost
        this.isLoading = false
      }
    )
  }

  onDetailButton(e: any) {
    const id = e.data.id
    this.router.navigate([id], { relativeTo: this.route })
  }

  onInitNewRow(e: any) {
    e.data.id = Object.values(this.posts[this.posts.length - 1])[0] + 1
  }

  onSaving(e: any) {
    this.isLoading = true
    this.isSuccess = false

    const change = e.changes[0]

    if (change) {
      if (change.type === 'insert') {
        this.insertData(change.data)
      } else if (change.type === 'update') {
        this.updateData(change.data, change.key)
      } else if (change.type === 'remove') {
        this.deleteData(change.key)
      }
    }
  }

  insertData(data: Post) {
    this.postService.getCreate(data).subscribe(() => {
      this.isSuccess = true
    })
  }

  updateData(data: Post, id: number) {
    this.postService.getUpdate(data, id).subscribe(() => {
      this.isSuccess = true
    })
  }

  deleteData(id: number) {
    this.postService.getDelete(id).subscribe(() => {
      this.isSuccess = true
    })
  }

  onSaved() {
    this.isLoading = false

    if (this.isSuccess) {
      this.isPopupVisible = true
      setTimeout(() => {
        this.isPopupVisible = false
      }, 1000);
    }
  }


}

