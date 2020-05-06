import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Postentity } from './postentity.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts : Postentity[] = [];
  isFetching = false;
  error = null;

  constructor(private http: HttpClient,
              private postService: PostsService) {}

  ngOnInit() {
    this.onFetchPosts();
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
          this.error = 'Ocurrió un error interno';
          console.log(error);
          console.log(error.message);
      }  
    );
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
