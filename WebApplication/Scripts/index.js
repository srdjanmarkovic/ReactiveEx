
var numberPromise = new Promise((resolve) => {
    resolve(5);
});
numberPromise.then(value => console.log(value));    // will simply print 5

numberPromise = new Promise((resolve) => {
    resolve(5);
    resolve(10);
});
numberPromise.then(value => console.log(value));    // still prints only 5