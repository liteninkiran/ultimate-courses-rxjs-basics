import { of, fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';

// const source$ = of(1, 2, 3, 4, 5);
// const filterFn = x => x > 2;
// const filterSource = filter(filterFn);
// const sourcePiped$ = source$.pipe(filterSource);
// sourcePiped$.subscribe(console.log);

const keyup$ = fromEvent(document, 'keyup');
const mapFn = event => event.code;
const keyupMap = map(mapFn);
const keycode$ = keyup$.pipe(keyupMap);

// keycode$.subscribe(console.log);

const filterFn = code => code === 'Enter' || x === 'NumpadEnter';
const keycodeFilter = filter(filterFn);
const enter$ = keycode$.pipe(keycodeFilter);

enter$.subscribe(console.log);

