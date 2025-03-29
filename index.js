import { Observable } from 'rxjs';

const observer = {
    next: value => console.log('Next', value),
    error: error => console.log('Error', error),
    complete: () => console.log('Complete'),
}

const observable = new Observable(subscriber => {
    let count = 1;
    const id = setInterval(() => {
        subscriber.next(count);
        count ++;
    }, 1000);
    return () => {
        console.log('Clearing ID', id);
        clearInterval(id);
    }
});

const sub1 = observable.subscribe(observer);
const sub2 = observable.subscribe(observer);

sub1.add(sub2);

// Unsubscribing to sub1 unsubscribes to both sub1 and sub2
// Unsubscribing to sub2 unsubscribes to only sub2
setTimeout(() => {
    sub1.unsubscribe();
    // sub2.unsubscribe();
}, 3500);
