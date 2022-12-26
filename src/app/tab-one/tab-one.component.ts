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

  //! get Genres from shared folder
  genres = genres

  //! Create Custom Observable
  post = new Subject<Post[]>()
  postSub!: Subscription
  changes = []

  //! Constructor
  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router) {
  }

  //! Ng OnInit
  ngOnInit(): void {
    this.postSub = this.post.subscribe(
      res => {
        this.posts = res;
        this.isLoading = true
      }
    )
    this.postService.getPosts().subscribe(
      dataPost => {
        this.posts = dataPost
        // this.isLoading = false
      }
    )
  }

  //! Function for Save & Update
  // Menggunakan function datagrid onSaving()
  saveData(e: any) {

    this.isPopupVisible = false
    this.isLoading = true

    const data = e.changes[0]
    console.log(e);

    if (data) {
      e.cancel = true
      if (data.type === "insert") { // Insert Data
        const lastData = Object.values(this.posts[this.posts.length - 1])

        const tempPost = { ...data.data, id: lastData[0] + 1 }

        this.postService.getCreate(tempPost).subscribe(
          res => {
            this.posts.push(tempPost)
            console.log("[BERHASIL]");
          }
        )
      } else if (data.type === "update") { // Update Data
        const id = this.posts.findIndex((x) => x === data.key)
        console.log(data);

        const postData: Post = {
          id: data.key.id,
          title: data.data.title ? data.data.title : data.key.title,
          author: data.data.author ? data.data.author : data.key.author,
          publish: data.data.publish ? data.data.publish : data.key.publish,
          genre: data.data.genre ? data.data.genre : data.key.genre
        }
        this.postService.getUpdate(postData, data.key.id).subscribe(
          res => {
            this.posts[id] = postData
            console.log("[BERHASIL]");
          }
        )
      }

      this.changes = []
      this.post.next(this.posts)
      this.isLoading = false

    }
    this.changes = []
  }

  // ! Function Detail Button
  onDetailButton(e: any) {

    const id = e.data.id
    this.router.navigate([id], { relativeTo: this.route })
  }

  // ! Function Delete Button
  onDeleteButton(e: any) {
    let result = confirm(`Are you sure delete <strong>${e.data.title}</strong> ?`, `Delete Item`);
    result.then((dialogResult) => {
      if (dialogResult) {
        this.isLoading = true
        const tempPosts = this.posts.filter(x => x != e.data)

        this.postService.getDelete(e.data.id).subscribe(
          res => {
            this.post.next(tempPosts)
            console.log("[BERHASIL]");
            this.isLoading = false
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

