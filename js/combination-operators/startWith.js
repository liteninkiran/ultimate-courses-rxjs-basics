import { interval, fromEvent, of } from 'rxjs';
import { scan, mapTo, takeWhile, takeUntil, tap, startWith, endWith } from 'rxjs/operators';

/*
 * startWith lets you seed a stream with 1:M values.
 * On subscription, these values will be emitted
 * immediately, followed by any future values from
 * the source.
 *
 * You can also end a stream with any number of values,
 * emitted on completion.
 */

// const numbers$ = of(1, 2, 3);
// const startWithed = startWith('a', 'b', 'c');
// const endWithed = endWith('d', 'e', 'f');
// const obs1$ = numbers$.pipe(startWithed, endWithed);
// obs1$.subscribe(console.log);

const countdown = document.getElementById('countdown');
const abortButton = document.getElementById('abort');

const counter$ = interval(200);
const abort$ = fromEvent(abortButton, 'click');

const COUNTDOWN_FROM = 10;
const obs$ = counter$
    .pipe(
        mapTo(-1),
        scan((acc, cur) => acc + cur, COUNTDOWN_FROM),
        takeWhile(value => value >= 0),
        takeUntil(abort$),
        startWith(COUNTDOWN_FROM),
    );

obs$.subscribe(value => countdown.innerHTML = value ? value : 'Liftoff!');
