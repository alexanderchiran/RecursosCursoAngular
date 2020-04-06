import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estructura',
  templateUrl: './estructura.component.html',
  styleUrls: ['./estructura.component.css']
})
export class EstructuraComponent implements OnInit {
  // numbers = [1, 2, 3, 4, 5];
  oddNumbers = [1, 3, 5, 7,9,11,13];
  evenNumbers = [2, 4,6,8,10,12];
  onlyOdd = false;
  value = 5;
  constructor() { }

  ngOnInit(): void {
  }

}
