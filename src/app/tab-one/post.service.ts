import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postData = new Subject<Post>()
  posts: Post[] = []

  constructor(private http: HttpClient) {
  }

  getPosts() {
    return this.http.get<Post[]>('http://localhost:3000/posts')
  }

  getDelete(id: number) {
    return this.http.delete<Post>('http://localhost:3000/posts/' + id)
  }

  getCreate(post: Post) {
    return this.http.post<Post>('http://localhost:3000/posts', post)
  }

  getUpdate(post: Post, id: number) {
    return this.http.patch<Post>('http://localhost:3000/posts/' + id, post)
  }

  getPost(id: number) {
    return this.http.get<Post>('http://localhost:3000/posts/' + id)
  }
}
