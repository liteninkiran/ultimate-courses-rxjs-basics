import { of, from } from 'rxjs';
import { distinctUntilChanged, distinctUntilKeyChanged, scan, map } from 'rxjs/operators';

const numbers$ = of(1, '1', 2, 3, 3, 3, 4, 5, 3);

/*
 * distinctUntilChanged emits unique values based
 * on a === comparison to the last emitted value.
 */
const obs$ = numbers$.pipe(distinctUntilChanged());
obs$.subscribe(console.log);

const user = [
    { name: 'Brian', loggedIn: false, token: null },
    { name: 'Brian', loggedIn: true, token: 'abc' },
    { name: 'Brian', loggedIn: true, token: '123' },
];

const scanned = scan((acc, cur) => ({ ...acc, ...cur }), {});
const mapped = map(u => u.name);
const state$ = from(user).pipe(scanned);

/*
 * If comparing based on a property you can use
 * the distinctUntilKeyChanged helper operator instead.
 */

/*
 * If you need to use a custom comparer, you can
 * pass distinctUntilChanged a comparer function:
 * distinctUntilChanged((prev, curr) => prev.name === curr.name)
 */
const name$ = state$.pipe(
  distinctUntilKeyChanged('name'),
  mapped,
);

name$.subscribe(console.log);
