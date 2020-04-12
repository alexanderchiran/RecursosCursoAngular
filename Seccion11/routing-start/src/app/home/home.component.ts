import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onLoadServer(id : number){
    // complex calculation
    //this.router.navigate(['/servers']);
    //la siguiente línea carga http://localhost:4200/servers/1/edit?allowedit=1&otroparam=2#loading
    this.router.navigate(['/servers', id, 'edit'], {queryParams: {allowedit:'1', otroparam: '2'}, 
    fragment:'loading'});

    //this.router.navigate(['/servers', id, 'edit'], {queryParams: {allowedit:'1', otroparam: '2'},  fragment:'loading'});
  }

}
