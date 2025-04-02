import { interval, EMPTY, concat } from 'rxjs';
import { take, concat as _concat, startWith, delay } from 'rxjs/operators';

/*
 * concat subscribes to each observable in order,
 * subscribing to the next as the previous completes.
 * Like concatMap, you can think of concat based
 * operators as a single file line.
 */

/*
 * There is also a pipeable operator version that can
 * be used to add observables to a pre-existing stream
 * on completion. This version is used far less than 
 * static version, but is available if needed.
 */

/*
 * On top of ordering requests, like we saw in the
 * concatMap lesson, concat can also be used for some
 * interesting UI scenarios such as ordering
 * messaging or animations.
 */

const interval$ = interval(1000);
const delayed$ = EMPTY.pipe(delay(1000));

const obs1$ = concat(
    interval$.pipe(take(3)),
    interval$.pipe(take(2)),
);
// obs1$.subscribe(console.log);

const obs$ = delayed$.pipe(
    _concat(
        delayed$.pipe(startWith('3...')),
        delayed$.pipe(startWith('2...')),
        delayed$.pipe(startWith('1...')),
        delayed$.pipe(startWith('Go!'))
    ),
    startWith('Get Ready!')
);

obs$.subscribe(console.log);
