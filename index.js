import { fromEvent } from 'rxjs';

const observer = {
    next: value => console.log(value),
    error: error => console.log(error),
    complete: () => console.log('Complete'),
}

const source$ = fromEvent(document, 'keyup');

const sub1 = source$.subscribe(observer);
const sub2 = source$.subscribe(observer);

setTimeout(() => {
    console.log('Unsubscribe');
    sub1.unsubscribe();
}, 3000);

