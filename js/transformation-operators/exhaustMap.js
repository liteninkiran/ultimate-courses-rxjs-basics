import { fromEvent, interval } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

// Ignores all clicks whilst current observable completes.
// Use case would be when saving a record or logging in 
// (i.e.  multiple button clicks).

// const interval$ = interval(1000);
// const click$ = fromEvent(document, 'click');
// const exhaustMapFn = () => interval$.pipe(take(3));
// const exhaustMapped = exhaustMap(exhaustMapFn);
// const obs$ = click$.pipe(exhaustMapped);
// obs$.subscribe(console.log);


const url = 'https://reqres.in/api/login';
const body = {
    email: 'eve.holt@reqres.in',
    password: 'cityslicka',
}

const authenticateUser = () => ajax.post(url, body);

const login = document.getElementById('login');
const login$ = fromEvent(login, 'click');
const exhaustMapped = exhaustMap(() => authenticateUser());
const obs$ = login$.pipe(exhaustMapped);
obs$.subscribe(console.log);
