import { interval, fromEvent } from 'rxjs';
import { scan, mapTo, takeWhile, takeUntil, tap } from 'rxjs/operators';

// Elements
const countdown = document.getElementById('countdown');
const abortButton = document.getElementById('abort');

// Streams
const counter$ = interval(300);
const abort$ = fromEvent(abortButton, 'click');
const piped$ = counter$.pipe(
    mapTo(-1),
    scan((acc, cur) => acc + cur, 10),
    tap(console.log),
    takeWhile(value => value >= 0),
    takeUntil(abort$),
);

piped$.subscribe((value) => countdown.innerHTML = value === 0 ? 'Liftoff' : value);
