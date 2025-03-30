import { fromEvent } from 'rxjs';
import { map, throttleTime, tap } from 'rxjs/operators';

// const click$ = fromEvent(document, 'click');
// const obs$ = click$.pipe(throttleTime(3000))
// obs$.subscribe(console.log);

// Helper functions
const calculateScrollPercent = el => (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;

// Elements
const progressBar = document.querySelector('.progress-bar');

// Streams
const scroll$ = fromEvent(document, 'scroll');
const progress$ = scroll$.pipe(
    /*
     * For extremely active streams like scroll events,
     * throttleTime can be used to limit the number of emitted
     * values. In this case, we'll just update our scroll bar every
     * 30ms of scrolling.
     */
    throttleTime(30),
    /*
     * For every scroll event, we use our helper function to 
     * map to a current scroll progress value.
     */
    map(el => calculateScrollPercent(el.target.scrollingElement)),
    tap(console.log),
);

/*
 * We can then take the emitted percent and set the width
 * on our progress bar.
 */
progress$.subscribe(percent => progressBar.style.width = `${percent}%`);
