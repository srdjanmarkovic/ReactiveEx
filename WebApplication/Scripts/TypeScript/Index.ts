
import { Observable, Subscribable } from "rxjs/Observable";

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/range';
import 'rxjs/add/observable/interval';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/every';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toArray';

var array = [10, 20, 30];
var result = Observable.from(array);
result.subscribe(x => console.log(x));

var observable = Observable.of(1, 2, 3);
observable
    .map(x => x + '!!!')
    .subscribe((x) => console.log(x)); // etc

observable = Observable.create(function subscribe(observer) {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
});

var numberObservable = new Observable((observer) => {
    observer.next(5);
    observer.next(10);
});
numberObservable.subscribe(value => console.log(value));    // prints 5 and 10

//  Converts an array to an Observable 
var observableArray = Observable.from(array);

// Convert the Promise returned by Fetch to an Observable 
var observableResponse = Observable.fromPromise(fetch('http://myserver.com/sampleData.json'));

// Observable of letters 'a', 'b', 'c'
var observableLetters = Observable.of('a', 'b', 'c');

// Observable from range of the numbers 1 to 10
var observableNumbers = Observable.range(1, 10);


var observer = {
    next: x => console.log('Observer got a next value: ' + x),
    error: err => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification')
};

observable = Observable.create(function subscribe(observer) {
    observer.next(5);
});


observable = Observable.create(function subscribe(observer) {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
});



var subscription = observable.subscribe(observer);
// Later:
subscription.unsubscribe();


// Get stock data from back-end
var getStockData = (): Observable<any> => Observable.create(function subscribe(observer) {
    observer.next({ price: 10 });
    observer.next({ price: 35 });
    observer.next({ price: 40 });
    observer.complete();
});
var source = getStockData();

subscription = source
    .filter(quote => quote.price > 30)  // records that price is > 30
    .map(quote => quote.price)          // map result to only price property
    .subscribe(
        (price) => console.log(`Prices higher than $30: ${price}`),
        (err) => console.log(`Something went wrong: ${err.message}`),
        () => console.log('We are done!')
    );

// Later:
subscription.unsubscribe();

const input = Observable.interval(100).take(4);

input.toArray()
    .subscribe(arr => console.log(arr)); // [0,1,2,3]