import { fromEvent, timer } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
    takeUntil,
    pluck,
    exhaustMap,
    tap,
    finalize,
    switchMapTo,
} from 'rxjs/operators';

/*
 * Every start click we will map to an interval which
 * emits every 5 seconds to request a new image.
 * Since we do not want multiple polls active at once,
 * we'll use exhaustMap to ignore any emissions
 * while the inner interval is running.
 */

// Elements
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const pollingStatus = document.getElementById('polling-status');
const dogImage = document.getElementById('dog');

const url = 'https://random.dog/woof.json';
const finaliseFn = () => (pollingStatus.innerHTML = 'Stopped');
const tapFn = () => (pollingStatus.innerHTML = 'Active');
const exhaustMapFn = () => timer(0, 3000).pipe(
    tap(tapFn),
    switchMapTo(request$),
    takeUntil(stopClick$),
    finalize(finaliseFn),
);

// Streams
const request$ = ajax.getJSON(url).pipe(pluck('url'));
const startClick$ = fromEvent(startButton, 'click');
const stopClick$ = fromEvent(stopButton, 'click');
const obs$ = startClick$.pipe(exhaustMap(exhaustMapFn));
obs$.subscribe(url => (dogImage.src = url));
