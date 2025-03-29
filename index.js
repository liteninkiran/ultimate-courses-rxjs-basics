import { Observable } from 'rxjs';

const observer = {
    next: value => console.log('Next', value),
    error: error => console.log('Error', error),
    complete: () => console.log('Complete'),
}

const observable = new Observable(subscriber => {
    let count = 0;
    const id = setInterval(() => {
        subscriber.next(count);
        subscriber.complete();
        count ++;
    }, 1000);
    return () => {
        console.log('Clearing ID', id);
        clearInterval(id);
    }
});

console.log('Before');
observable.subscribe(observer);
console.log('After');

