import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Post } from './post.model';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import applyChanges from 'devextreme/data/apply_changes';

export class Change<T> {
  type!: 'insert' | 'update' | 'remove';
  key!: any;
  data!: Partial<T>;
}

class Response<T> {
  data!: T[];
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts$ = new BehaviorSubject<Post[]>([])
  private url = 'http://localhost:3000/posts'

  constructor(private http: HttpClient) { }

  updatePosts(change: Change<Post>, data: Post) {
    change.data = data
    const posts = applyChanges(this.posts$.getValue(), [change], { keyExpr: 'id' })
    this.posts$.next(posts)
  }

  getPosts(): Observable<Post[]> {
    lastValueFrom(this.http.get<Post[]>(`${this.url}`, { withCredentials: true }))
      .then((data) => {
        this.posts$.next(data)
      })

    return this.posts$.asObservable()
  }

  async insert(change: Change<Post>): Promise<Post> {

    console.log(change);


    const httpParams = new HttpParams({ fromObject: change.data })
    const httpOptions = { withCredentials: true, body: httpParams };
    const data = await lastValueFrom(this.http.post<Post>(`${this.url}`, httpParams, httpOptions))

    this.updatePosts(change, data)

    return data
  }

  async update(change: Change<Post>): Promise<Post> {
    const httpParams = new HttpParams({ fromObject: change.data })
    const httpOptions = { withCredentials: true, body: httpParams };
    const data = await lastValueFrom(this.http.patch<Post>(`${this.url}/${change.key}`, httpParams, httpOptions))

    this.updatePosts(change, data)

    return data
  }

  async remove(change: Change<Post>): Promise<Post> {
    const httpParams = new HttpParams({ fromObject: { key: change.key } })
    const httpOptions = { withCredentials: true, body: httpParams };
    const data = await lastValueFrom(this.http.delete<Post>(`${this.url}/${change.key}`, httpOptions))

    this.updatePosts(change, data)

    return data
  }

  async saveChange(change: Change<Post>): Promise<Post> {
    switch (change.type) {
      case 'insert':
        return this.insert(change);
      case 'update':
        return this.update(change);
      case 'remove':
        return this.remove(change);
    }
  }
}
