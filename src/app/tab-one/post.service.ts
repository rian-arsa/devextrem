import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Post[] = []

  url = 'http://localhost:3000/posts'

  constructor(private http: HttpClient) {
  }

  getPosts() {
    return this.http.get<Post[]>(this.url)
  }

  getDelete(id: number) {
    return this.http.delete<Post>(`${this.url}/${id}`)
  }

  getCreate(post: Post) {
    return this.http.post<Post>(this.url, post)
  }

  getUpdate(post: Post, id: number) {
    return this.http.patch<Post>(`${this.url}/${id}`, post)
  }

  getPost(id: number) {
    return this.http.get<Post>(`${this.url}/${id}`)
  }
}
