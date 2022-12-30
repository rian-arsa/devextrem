import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Post[] = []

  url = 'http://localhost:3000/posts'

  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url)
  }


  getDelete(id: number): Observable<Post> {
    return this.http.delete<Post>(`${this.url}/${id}`)
  }

  getCreate(post: Post): Observable<Post> {
    return this.http.post<Post>(this.url, post)
  }

  getUpdate(post: Post, id: number): Observable<Post> {
    return this.http.patch<Post>(`${this.url}/${id}`, post)
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.url}/${id}`)
  }
}
