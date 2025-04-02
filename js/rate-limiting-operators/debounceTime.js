import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

// Elements
const inputBox = document.getElementById('text-input');

// Streams
const click$ = fromEvent(document, 'click');
const input$ = fromEvent(inputBox, 'keyup');

/*
 * debounceTime emits the last emitted value from the source 
 * after a pause, based on a duration you specify.
 * For instance, in this case when the user starts typing all values
 * will be ignored until they paused for at least 200ms,
 * at which point the last value will be emitted.
 */

/* 
 * If the user types, then backspaces quickly, the same value could
 * be emitted twice in a row. Using distinctUntilChanged will prevent
 * this from happening.
 */

const mapped = map(event => {
    const term = event.target.value;
    const url = `https://api.github.com/users/${term}`;
    return ajax.getJSON(url);
});
const obs$ = input$.pipe(
    debounceTime(1000),
    mapped,
    distinctUntilChanged(),
);

// Do not do this. Avoid nested subscriptions. Use mergeAll instead.
obs$.subscribe(o$ => {
    o$.subscribe(console.log);
});
