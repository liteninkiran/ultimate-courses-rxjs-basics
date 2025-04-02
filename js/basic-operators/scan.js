import { from, interval } from 'rxjs';
import { scan, map } from 'rxjs/operators';

const numbers = [1, 2, 3, 4, 5];

/*
 * Scan is similar to reduce, except it emits each new acculumated
 * value as it occurs. This is great for managing state changes 
 * in your application over time.
 */
// const scanNumbersFn = (acc, cur) => acc + cur;
// const scanNumbers = scan(scanNumbersFn, 0);
// const obs$ = from(numbers).pipe(scanNumbers);
// obs$.subscribe(console.log);


/*
 * For instance, in this example we are building up an object 
 * as new entries are emitted. Using scan, you can create a redux-like
 * pattern with just one operator. In fact, early versions of @ngrx/store,
 * Angular's reactive redux solution, were not much more than this:
 * https://github.com/ngrx/store/blob/d3a786aecafcda9b81fe60215af5852aae9de3a5/src/store.ts#L22
 */
const user = [
    { name: 'Brian', loggedIn: false, token: null },
    { name: 'Brian', loggedIn: true, token: 'abc' },
    { name: 'Brian', loggedIn: true, token: '123' },
];

const scanNumbersFn = (acc, cur) => ({ ...acc, ...cur });
const scanNumbers = scan(scanNumbersFn, {});
const state$ = from(user).pipe(scanNumbers);
// state$.subscribe(console.log);

/*
 * We could then use map to grab certain properties from our
 * state for display. As it stands, even if the name doesn't change 
 * the name will be emitted on any emissions from scan. In future lessons
 * we will see how to only emit unique values based on the previous
 * emission. We will also see how to share an execution path between 
 * subscribers when necessary.
 */
const mapStateFn = state => state.name;
const mapState = map(mapStateFn);
const name$ = state$.pipe(mapState);
name$.subscribe(console.log);
