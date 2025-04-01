import { fromEvent, interval } from 'rxjs';
import { mergeMap, takeUntil, map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

const interval$ = interval(100);
const click$ = fromEvent(document, 'click');

// const obs$ = click$.pipe(mergeMap(() => interval$));
// obs$.subscribe(console.log);

// const mousedown$ = fromEvent(document, 'mousedown');
// const mouseup$ = fromEvent(document, 'mouseup');
// const mergeMapFn = () => interval$.pipe(takeUntil(mouseup$));
// const mergeMapped = mergeMap(mergeMapFn);
// const obs$ = mousedown$.pipe(mergeMapped);
// obs$.subscribe(console.log);

const url = 'https://67ec078caa794fb3222c957b.mockapi.io/test/coords';
const mapped = map((event) => ({ x: event.clientX, y: event.clientY}));
const mergeMapped = mergeMap(coords => ajax.post(url, coords));
const coordinates$ = click$.pipe(mapped);
const coordinatesWithSave$ = coordinates$.pipe(mergeMapped);
coordinatesWithSave$.subscribe(console.log);
