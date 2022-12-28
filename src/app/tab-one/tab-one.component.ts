import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

import { PostService } from './post.service';
import { Post } from './post.model';
import { genres } from '../shared/genres';
import { Subject, Subscription } from 'rxjs';

import { confirm } from 'devextreme/ui/dialog';


@Component({
  selector: 'app-tab-one',
  templateUrl: './tab-one.component.html',
  styleUrls: ['./tab-one.component.css']
})
export class TabOneComponent {
  posts: Post[] = []
  isPopupVisible = false
  isLoading = false
  isUpdate = false

  genres = genres

  post = new Subject<Post[]>()
  postSub!: Subscription
  changes: any = []
  editRowKey: number | any = null

  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.isLoading = true
    this.postSub = this.post.subscribe(
      res => {
        this.posts = res;
        this.isLoading = false
      }
    )
    this.postService.getPosts().subscribe(
      dataPost => {
        this.posts = dataPost
        this.isLoading = false
      }
    )
  }

  onInitNewRow(e: any) {
    e.data.id = this.posts ? Object.values(this.posts[this.posts.length - 1])[0] + 1 : 1
  }

  // Menggunakan function datagrid onSaving()
  saveData(e: any) {
    const change = e.changes[0]

    if (change) {
      this.isLoading = true
      e.cancel = true

      if (change.type === "insert") { // Insert Data

        this.postService.getCreate(change.data).subscribe(
          (res) => {
            const tempPosts = [...this.posts, change.data]

            this.post.next(tempPosts)
            this.changes = []
            this.editRowKey = null
            this.isLoading = false
            this.popupAlert()
          }
        )
      } else if (change.type === "update") { // Update Data

        this.postService.getUpdate(change.data, change.key).subscribe(
          (res) => {
            const tempPosts = this.posts.map(x => x.id === change.key ? res : x)

            this.post.next(tempPosts)
            this.changes = []
            this.editRowKey = null
            this.isLoading = false
            this.popupAlert()
          }
        )
      }
    }
  }

  popupAlert() {
    this.isPopupVisible = true
    setTimeout(() => {
      this.isPopupVisible = false
    }, 1000);
  }

  onDetailButton(e: any) {
    const id = e.data.id
    this.router.navigate([id], { relativeTo: this.route })
  }

  onDeleteButton(e: any) {
    let result = confirm(`Are you sure delete <strong>${e.data.title}</strong> ?`, `Delete Item`);
    result.then((dialogResult) => {
      if (dialogResult) {
        this.isLoading = true
        const tempPosts = this.posts.filter(x => x != e.data)

        this.postService.getDelete(e.data.id).subscribe(
          res => {
            this.post.next(tempPosts)
            this.isLoading = false
            this.popupAlert()
          }
        )
      }
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.postSub.unsubscribe()
  }

}

