import { interval, timer } from 'rxjs';

// const source$ = interval(100);
const source$ = timer(1000, 100);

// source$.subscribe(console.log);
