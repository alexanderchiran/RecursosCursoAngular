import { Component, OnInit, OnDestroy } from '@angular/core';

import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSuscription: Subscription;

  constructor() { }

  ngOnInit() {
    //primera forma 
    //https://rxjs-dev.firebaseapp.com/api/index/function/interval
    //
    // this.firstObsSuscription =  interval(1000).subscribe(
    //     contar => {
    //       console.log(contar);
    //     }
    //   );

    //segunda forma 
    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => 
      {
          observer.next(count);
          if (count === 2) {
            observer.complete();
          }
          if (count > 3) {
            observer.error(new Error('Count is greater 3!'));
          }
          count++;
      }, 1000);
    });

    this.firstObsSuscription = customIntervalObservable.pipe(filter(data => {
      return data > 0;
    }), map((data: number) => {
      return 'Round: ' + (data + 1);
    })).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message);
    }, () => {
      console.log('Completed!');
    });
  
    /*
    this.firstObsSuscription = customIntervalObservable.subscribe(
      data => {
        console.log(data);
      }, 
        error => {
              console.log(error);
              alert(error.message);
      }, 
      () => {
        console.log('Completed!');
      }
    );*/
  }

  ngOnDestroy(): void {
    this.firstObsSuscription.unsubscribe();
  }

  /**
   * import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
 
const numbers = interval(1000);
 
const takeFourNumbers = numbers.pipe(take(4));
 
takeFourNumbers.subscribe(x => console.log('Next: ', x));
 
// Logs:
// Next: 0
// Next: 1
// Next: 2
// Next: 3
   * 
   */
}
