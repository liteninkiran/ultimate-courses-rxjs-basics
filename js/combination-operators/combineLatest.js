import { fromEvent, combineLatest, interval } from 'rxjs';
import { map, filter, withLatestFrom } from 'rxjs/operators';

/*
 * Each time any stream provided to combineLatest
 * emits a value, the latest value from all provided
 * streams will be emitted as an array. Note that all
 * provided streams must emit at least one value before
 * combineLatest will emit any values.
 */

/*
 * When you want to augment one stream with 
 * information from a second stream on emitted values,
 * withLatestFrom is a perfect choice.
 */

/*
 * combineLatest is great when an element depends
 * on the combination of multiple streams to make
 * some calculation or determination. We will explore
 * this concept further in the next lab.
 */

// Elements
const first = document.getElementById('first');
const second = document.getElementById('second');

// Streams
const keyup$ = fromEvent(document, 'keyup');
const click$ = fromEvent(document, 'click');

// Helpers
const keyupAsValue = elem => fromEvent(elem, 'keyup').pipe(map((event) => event.target.valueAsNumber));
const filterFn = ([a, b]) => !isNaN(a) && !isNaN(b);
const mapFn = ([a, b]) => a + b;

// // Click on 2 different parts of the screen and then press
// // a key. Notice the "latest" click event is returned.
// const combined = [keyup$, click$];
// const obs$ = combineLatest(combined);
// obs$.subscribe(console.log);

// // Click anywhere. The click event is returned along with
// // the time on the counter from interval().
// const obs$ = click$.pipe(withLatestFrom(interval(1000)));
// obs$.subscribe(console.log);

// Manually type a number into each text box. When both have 
// a value, the total is logged to the console.
const combined = [
    keyupAsValue(first),
    keyupAsValue(second),
];

const obs$ = combineLatest(combined).pipe(
    filter(filterFn),
    map(mapFn),
);

obs$.subscribe(console.log);
