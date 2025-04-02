import { interval, fromEvent, merge, EMPTY } from 'rxjs';
import { scan, mapTo, takeWhile, startWith, switchMap } from 'rxjs/operators';

/*
 * merge subscribes to all provided streams on subscription,
 * emitting any values emitted by these streams.
 */

/*
 * With merge, we can combine the start and pause
 * streams, taking relevant action below depending
 * on which stream emits a value.
 */

/*
 * Depending on whether start or pause was clicked,
 * we'll either switch to the interval observable,
 * or to an empty observable which will act as a pause.
 */

// const keyup$ = fromEvent(document, 'keyup');
// const click$ = fromEvent(document, 'click');
// // keyup$.subscribe(console.log);
// // click$.subscribe(console.log);
// merge(keyup$, click$).subscribe(console.log);

// Elements
const countdown = document.getElementById('countdown');
const pauseButton = document.getElementById('pause');
const startButton = document.getElementById('start');

// Streams
const counter$ = interval(1);
const pauseClick$ = fromEvent(pauseButton, 'click');
const startClick$ = fromEvent(startButton, 'click');

const COUNTDOWN_FROM = 1000;

const merged$ = merge(
    startClick$.pipe(mapTo(true)),
    pauseClick$.pipe(mapTo(false)),
);

const obs$ = merged$.pipe(
    switchMap(shouldStart => shouldStart ? counter$ : EMPTY),
    mapTo(-1),
    scan((acc, cur) => acc + cur, COUNTDOWN_FROM),
    takeWhile(value => value >= 0),
    startWith(COUNTDOWN_FROM),
);

obs$.subscribe(value => countdown.innerHTML = value ? value : 'Liftoff!');
