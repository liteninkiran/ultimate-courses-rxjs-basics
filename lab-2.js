import { interval } from 'rxjs';
import { scan, mapTo, filter, tap } from 'rxjs/operators';

// Elements
const countdown = document.getElementById('countdown');

// Streams
const counter$ = interval(300);

// Helper functions
const setCountdown = value => countdown.innerHTML = value === 0 ? 'Liftoff' : value;
const reducer = (acc, cur) => acc + cur;
const filterer = value => value >= 0;

/*
 * Starting countdown example. In future lessons we will learn
 * about how to seed our countdown, complete when the timer hits zero, 
 * pause the countdown, and resume. More to come!
 */
const obs$ = counter$.pipe(
        mapTo(-1),
        scan(reducer, 10),
        tap(console.log),
        filter(filterer), // Still emitting values from counter$
    );

const sub = obs$.subscribe(setCountdown);
