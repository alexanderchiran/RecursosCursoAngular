import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEventType } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { Postentity } from './postentity.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  error = new Subject<string>();
  apiUrlPost = 'https://angularprojectch.firebaseio.com/clientes.json';
  apiUrlExternalPost='https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  createAndStorePost(title1: string, content1: string) {
    const postData: Postentity = { title: title1, content: content1 };
    this.http
      .post<{ name: string }>(
        this.apiUrlPost,
        postData,
        {
          //retorna todo el cuerpo del llamado con headers http code
          observe: 'response'
        }
      )
      .subscribe(
        responseData => {
          console.log(responseData);
        },
        error => {
          this.error.next(error.message);
          console.log("Entra a createAndStorePost" + error.message);

        }
      );
  }


  // createAndStorePost(title1: string, content1: string) {
  //   const postData: Postentity = { title: title1, content: content1 };
  //   this.http
  //     .post<{ name: string }>(
  //       this.apiUrlPost,
  //       postData
  //     )
  //     .subscribe(
  //       responseData => {
  //         console.log(responseData);
  //       },
  //       error => {
  //         this.error.next(error.message);
  //         console.log("Entra a createAndStorePost"+error.message);
  //       }
  //     );
  // }

  fetchPosts2() { 
    return this.http
      .get<{ [key: string]: Postentity }>(
        this.apiUrlExternalPost,
        {
          headers: new HttpHeaders(),
          responseType:'json'
        }
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

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'valor1');
    searchParams = searchParams.append('param2', 'valor2');

    return this.http
      .get<{ [key: string]: Postentity }>(
        this.apiUrlPost,
        {
          headers: new HttpHeaders({ 'Header-a-la-medida': 'hello world', 'hedaer-1-2': 'otro header' }),
          //params : new HttpParams().set('parametro-1','valor-parametro1')
          params: searchParams,
          responseType:'json'
        }
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
      this.apiUrlPost,
      {
        //retorna todo el cuerpo del llamado con headers http code
        observe: 'events',
        responseType:'json' //text, blob
      }
    ).pipe(tap(event => {
      console.log("imprime tap del deletePosts");
      console.log(event);
      if (event.type === HttpEventType.Sent) {
        console.log("imprime event Sent");
        //... coming soon 
      }
      if (event.type === HttpEventType.Response) {
        console.log("imprime event Response");
        console.log(event.body);
      }
    }));
  }
}
