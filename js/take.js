import { of, fromEvent } from 'rxjs';
import { take, map, first } from 'rxjs/operators';

const numbers$ = of(1, 2, 3, 4, 5);

/*
 * take emits the first x values from the source,
 * then completes. In this case, 1,2,3 will be emitted.
 */
const observer = {
    next: console.log,
    complete: () => console.log('Complete!')
}
const obs$ = numbers$.pipe(take(3));
// obs$.subscribe(observer);

const click$ = fromEvent(document, 'click');

/*
 * In this example, we will take the first value that matches
 * the provided criteria before completing. While we could use
 * a combination of filter(condition) and take(1), we can also 
 * use the first operator to fulfill the same use case. 
 * If you supply no values to first, it is equivalent to take(1).
 */
const mapped = map((event) => ({
    x: event.clientX,
    y: event.clientY,
}));
// Equivalent to: filter(condition), take(1)
const taken = first(({ y }) => y > 200);
const obs2$ = click$.pipe(mapped, taken);
const observer2 = {
    next: console.log,
    complete: () => console.log('Complete!'),
}
obs2$.subscribe(observer2);
