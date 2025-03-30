import { of, range } from 'rxjs';

const observer = {
    next: value => console.log(value),
    error: error => console.log(error),
    complete: () => console.log('Complete'),
}

const source1$ = of(1, 2, 3, 4, 5);
const source2$ = range(1, 5);

// const sub1 = source1$.subscribe(observer);
const sub2 = source1$.subscribe(observer);

