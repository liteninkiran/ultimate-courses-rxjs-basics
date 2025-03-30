import { of, fromEvent } from 'rxjs';
import { map, mapTo, pluck } from 'rxjs/operators';

const source$ = of(1, 2, 3, 4, 5);

const sourcePiped$ = source$.pipe(
    map(x => x * 10)
);

// sourcePiped$.subscribe(console.log);

const keyup$ = fromEvent(document, 'keyup');
const keycode$ = keyup$.pipe(map(event => event.code));
const keycodePlucked$ = keyup$.pipe(pluck('code'));
const keycodePressed$ = keyup$.pipe(mapTo('Key Pressed'));

// keyup$.subscribe(console.log);
// keycode$.subscribe(console.log);
// keycodePlucked$.subscribe(console.log);
// keycodePressed$.subscribe(console.log);


