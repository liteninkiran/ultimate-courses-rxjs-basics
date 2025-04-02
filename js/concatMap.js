import { fromEvent, interval, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { concatMap, catchError, take, delay } from 'rxjs/operators';

/*
 * concat based operators are the 'single file line' 
 * of operators, maintaining 1 active inner observable at
 * a time. For instance, in this example on the first click a new
 * interval observable will be subscribed to internally,
 * with any emitted values being emitted by concatMap. 
 * If you click again while that inner interval
 * is active, the next interval will be queued until
 * the current active interval completes. At this point,
 * the next inner observable will be activated and so on...
 */

/*
 * concatMap can be useful if you need to queue
 * requests client side. For instance, in this example
 * we are emulating save requests on a quiz, ensuring
 * order remains in tact by not initiating the next 
 * request until the previous completes. Be careful though,
 * as long running inner observables could cause backups.
 */

// const interval$ = interval(1000);
// const click$ = fromEvent(document, 'click');
// const concatMapFn = () => interval$.pipe(take(3));
// const concatMapped = concatMap(concatMapFn);
// const obs$ = click$.pipe(concatMapped);
// obs$.subscribe(console.log);

const saveAnswer = answer => of(`Saved: ${answer}`).pipe(delay(1500));
const radioButtons = document.querySelectorAll('.radio-option');
const answerChange$ = fromEvent(radioButtons, 'click');
const concatMapFn = event => saveAnswer(event.target.value);
const concatMapped = concatMap(concatMapFn);
const obs$ = answerChange$.pipe(concatMapped);
obs$.subscribe(console.log);
