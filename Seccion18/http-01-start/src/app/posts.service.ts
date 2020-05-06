import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { Postentity } from './postentity.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  error = new Subject<string>();
  apiPost = 'https://angularprojectch.firebaseio.com/clientes.json';

  constructor(private http: HttpClient) {}

  createAndStorePost(title1: string, content1: string) {
    const postData: Postentity = { title: title1, content: content1 };
    this.http
      .post<{ name: string }>(
        this.apiPost,
        postData
      )
      .subscribe(
        responseData => {
          console.log(responseData);
        },
        error => {
          this.error.next(error.message);
        }
      );
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Postentity }>(
        this.apiPost
      )
      .pipe(
        map(responseData => {
          const postsArray: Postentity[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError(errorRes => {
          // Send to analytics server
          return throwError(errorRes);
        })
      );
  }

  // this.http.get<{[key: string]: Postentity}>('https://angularprojectch.firebaseio.com/clientes.json')
  // .pipe(
  //   map(responseData  => {
  //   const postArray: Postentity[] =[];
  //   for(const key in responseData){
  //     if(responseData.hasOwnProperty(key)){}
  //       postArray.push({...responseData[key], id: key });
  //     }
  //     return postArray;
  //   }            
  // ))
  // .subscribe(
  //   clientes => {
  //     this.isFetching = false
  //     this.loadedPosts = clientes;
  //     console.log(clientes);
  //   }
  // );

  deletePosts() {
    return this.http.delete(
      this.apiPost
    );
  }
}
