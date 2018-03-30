"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
require("rxjs/add/observable/from");
require("rxjs/add/observable/empty");
require("rxjs/add/observable/concat");
require("rxjs/add/operator/map");
require("rxjs/add/operators/filter");
require("rxjs/add/operators/map");
require("rxjs/add/operators/every");
var es2015_promise_1 = require("es2015.promise");
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
var numberPromise = new es2015_promise_1.Promise(function (resolve) {
    resolve(5);
});
numberPromise.then(function (value) { return console.log(value); }); // will simply print 5
numberPromise = new es2015_promise_1.Promise(function (resolve) {
    resolve(5);
    resolve(10);
});
numberPromise.then(function (value) { return console.log(value); }); // still prints only 5
var numberObservable = new Observable_1.Observable(function (observer) {
    observer.next(5);
    observer.next(10);
});
numberObservable.subscribe(function (value) { return console.log(value); }); // prints 5 and 10
//# sourceMappingURL=Index.js.map