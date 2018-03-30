"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
require("rxjs/add/observable/from");
require("rxjs/add/observable/empty");
require("rxjs/add/observable/concat");
require("rxjs/add/observable/fromPromise");
require("rxjs/add/observable/range");
require("rxjs/add/observable/interval");
require("rxjs/add/operator/map");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/concat");
require("rxjs/add/operator/every");
require("rxjs/add/operator/take");
require("rxjs/add/operator/toArray");
var array = [10, 20, 30];
var result = Observable_1.Observable.from(array);
result.subscribe(function (x) { return console.log(x); });
var observable = Observable_1.Observable.of(1, 2, 3);
observable
    .map(function (x) { return x + '!!!'; })
    .subscribe(function (x) { return console.log(x); }); // etc
observable = Observable_1.Observable.create(function subscribe(observer) {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
});
var numberObservable = new Observable_1.Observable(function (observer) {
    observer.next(5);
    observer.next(10);
});
numberObservable.subscribe(function (value) { return console.log(value); }); // prints 5 and 10
//  Converts an array to an Observable 
var observableArray = Observable_1.Observable.from(array);
// Convert the Promise returned by Fetch to an Observable 
var observableResponse = Observable_1.Observable.fromPromise(fetch('http://myserver.com/sampleData.json'));
// Observable of letters 'a', 'b', 'c'
var observableLetters = Observable_1.Observable.of('a', 'b', 'c');
// Observable from range of the numbers 1 to 10
var observableNumbers = Observable_1.Observable.range(1, 10);
var observer = {
    next: function (x) { return console.log('Observer got a next value: ' + x); },
    error: function (err) { return console.error('Observer got an error: ' + err); },
    complete: function () { return console.log('Observer got a complete notification'); }
};
observable = Observable_1.Observable.create(function subscribe(observer) {
    observer.next(5);
});
observable = Observable_1.Observable.create(function subscribe(observer) {
    observer.next(1);
    observer.next(2);
    observer.next(3);
    observer.complete();
});
var subscription = observable.subscribe(observer);
// Later:
subscription.unsubscribe();
// Get stock data from back-end
var getStockData = function () { return Observable_1.Observable.create(function subscribe(observer) {
    observer.next({ price: 10 });
    observer.next({ price: 35 });
    observer.next({ price: 40 });
    observer.complete();
}); };
var source = getStockData();
subscription = source
    .filter(function (quote) { return quote.price > 30; }) // records that price is > 30
    .map(function (quote) { return quote.price; }) // map result to only price property
    .subscribe(function (price) { return console.log("Prices higher than $30: " + price); }, function (err) { return console.log("Something went wrong: " + err.message); }, function () { return console.log('We are done!'); });
// Later:
subscription.unsubscribe();
var input = Observable_1.Observable.interval(100).take(4);
input.toArray()
    .subscribe(function (arr) { return console.log(arr); }); // [0,1,2,3]
//# sourceMappingURL=Index.js.map