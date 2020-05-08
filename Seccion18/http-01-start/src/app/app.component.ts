import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Postentity } from './postentity.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts : Postentity[] = [];
  externalPost: Postentity[]= [];
  isFetching = false;
  error = null;
  private errorSubscription : Subscription;

  constructor(private http: HttpClient,
              private postService: PostsService) {}

  ngOnInit() {
     this.errorSubscription= this.postService.error.subscribe(errorMessage =>{
      this.error = errorMessage;      
    });
    this.onFetchPosts();
    this.onFetchPosts2();
  }

  ngOnDestroy(){
    this.errorSubscription.unsubscribe();
  }

  onCreatePost(postDatos: Postentity) {
    // Send Http request
    console.log("Entra: "+postDatos);   
    this.postService.createAndStorePost(postDatos.title, postDatos.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching= true;
    this.postService.fetchPosts().subscribe(
      posts =>{
        this.isFetching=false;
        this.loadedPosts = posts;
      }, error => {
          this.isFetching= false;
          this.error = error.message;
          console.log(error);
          console.log(error.message);
      }  
    );
  }

  onFetchPosts2() {
    // Send Http request
    this.isFetching= true;
    this.postService.fetchPosts2().subscribe(
      posts =>{
        this.isFetching=false;
        this.externalPost = posts;
      }, error => {
          this.isFetching= false;
          this.error = error.message;
          console.log(error);
          console.log(error.message);
      }  
    );

    console.log("lista de post externos");
    console.log(this.externalPost);
  }

  onClearPosts() {
    console.log("Entra: onClearPosts");   
    // Send Http request
    this.isFetching= true;
    this.postService.deletePosts().subscribe(
      () =>{
        this.isFetching=false;
        this.loadedPosts = [];
      }      
    );
  }

  onHandleError(){
        this.error= null    
  }

  //   private fetchPosts(){
  //     this.http.get('https://angularprojectch.firebaseio.com/clientes.json')
  //     .subscribe(
  //       clientes => {
  //         console.log(clientes);
  //       }
  //     );
  // }

  // private fetchPosts(){
  //     this.http.get('https://angularprojectch.firebaseio.com/clientes.json')
  //     .pipe(
  //       map((responseData : {[key: string]: Postentity}) => {
  //       const postArray: Postentity[] =[];
  //       for(const key in responseData){
  //         if(responseData.hasOwnProperty(key)){}
  //           postArray.push({...responseData[key], id: key });
  //         }
  //         return postArray;
  //       }            
  //     ))
  //     .subscribe(
  //       clientes => {
  //         console.log(clientes);
  //       }
  //     );
  // }

}
