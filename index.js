import { from } from 'rxjs';

function* hello() {
    yield 'Hello';
    yield 'World';
}

const observer = {
    next: value => console.log(value),
    error: error => console.log(error),
    complete: () => console.log('Complete'),
}

const url = 'https://api.github.com/users/octocat'

// const source = [1, 2, 3, 4, 5];
// const source = 'Hello';
// const source = fetch(url);
const source = hello();
const source$ = from(source);

const sub = source$.subscribe(observer);
