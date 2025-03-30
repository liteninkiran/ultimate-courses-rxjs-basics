import { of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const numbers$ = of(1, 2, 3, 4, 5);

const subDef = value => console.log('from subscribe', value);
/*
 * tap also accepts an observer object, if you wish to also
 * receieve notifications on complete or error. You will use this
 * far less often, but it's good to know just in case...
 */
const observer = {
    next: value => console.log('after', value),
    complete: () => console.log('done!'),
    error: error => { }, // do something
}
/*
 * tap can be used to spy on your streams, performing side effects
 * such as logging, and is particularly useful for debugging.
 * In the example below, we are spying on the value before and after
 * the map operator.
 */
const tapped1 = tap(value => console.log('before', value));
const tapped2 = tap(observer);
const mapped = map(value => value * 10);

const obs$ = numbers$.pipe(tapped1, mapped, tapped2);

const sub = obs$.subscribe(subDef);
