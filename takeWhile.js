import { fromEvent, interval } from 'rxjs';
import { scan, map, mapTo, takeWhile, tap } from 'rxjs/operators';

/*
 * takeWhile emits values as long as they pass
 * the provided condition. As soon as the predicate
 * returns false, takeWhile completes the observable.
 * You can also pass an optional second parameter of true
 * if you want takeWhile to emit the value that caused
 * your condition to return false, before completing.
 */

// const click$ = fromEvent(document, 'click');
// const mapped = map((event) => ({ x: event.clientX, y: event.clientY }));
// const taken = takeWhile(({ y }) => y <= 200, true);
// const obs$ = click$.pipe(mapped, taken);
// const observer = {
//     next: console.log,
//     complete: () => console.log('Complete!'),
// }
// obs$.subscribe(observer);

// Elements
const countdown = document.getElementById('countdown');
const message = document.getElementById('message');

// Streams
const counter$ = interval(300);
const piped$ = counter$.pipe(
    mapTo(-1),
    scan((acc, cur) => acc + cur, 10),
    tap(console.log),
    takeWhile(value => value >= 0),
);

piped$.subscribe((value) => countdown.innerHTML = value === 0 ? 'Liftoff' : value);
