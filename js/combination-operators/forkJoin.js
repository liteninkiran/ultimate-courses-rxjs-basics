import { forkJoin, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { delay } from 'rxjs/operators';

/*
 * forkJoin waits for all inner observables to complete 
 * before emitting the last emitted value of each.
 * The use cases for forkJoin are generally similar to
 * Promise.all
 */

/*
 * You can also pass in comma seperated arugments and
 * receieve an array in return. This is the only option if
 * you are using less than RxJS 6.5
 */

// const numbers$ = of(1, 2, 3, 4, 5);
// const letters$ = of('A', 'B', 'C');

// // forkJoin emits both values after 3 seconds
// const obs$ = forkJoin([
//     numbers$.pipe(delay(3000)),
//     letters$,
// ]);
// obs$.subscribe(console.log);


const url = 'https://api.github.com';
const userUrl = `${url}/users/reactivex`;
const repoUrl = `${userUrl}/repos`;

const obj = {
    user: ajax.getJSON(userUrl),
    repo: ajax.getJSON(repoUrl),
}

const arr = [
    ajax.getJSON(userUrl),
    ajax.getJSON(repoUrl),
];

const obs$ = forkJoin(obj);
// const obs$ = forkJoin(arr);

obs$.subscribe(console.log);
