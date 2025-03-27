import { Observable } from 'rxjs';

const observer = {
    next: value => console.log('Next', value),
    error: error => console.log('Error', error),
    complete: () => console.log('Complete'),
}

const observable = new Observable(subscriber => {
    subscriber.next('Hello');
    subscriber.next('World');
    subscriber.complete();
    subscriber.next('XXX');
});

observable.subscribe(observer);

