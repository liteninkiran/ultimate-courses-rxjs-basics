import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, mergeAll } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

// Elements
const inputBox = document.getElementById('text-input');

// Streams
const input$ = fromEvent(inputBox, 'keyup');

const mapped = map(event => {
    const term = event.target.value;
    const url = `https://api.github.com/users/${term}`;
    return ajax.getJSON(url);
});
const obs$ = input$.pipe(
    debounceTime(1000),
    mapped,
    distinctUntilChanged(),
    mergeAll(),
);

obs$.subscribe(console.log);
