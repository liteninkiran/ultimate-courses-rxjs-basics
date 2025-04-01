import { fromEvent, interval } from 'rxjs';
import { sample, sampleTime, map } from 'rxjs/operators';

/*
 * At the duration you specify, sample time will emit the last
 * emitted value within that window. For instance, in this 
 * example we are sampling at an interval of 4s. When the 4s
 * interval timer begins, you can click multiple times. Once 4s
 * passes, the last click will be emitted. This behaviour is 
 * then repeated. If no values are emitted from the source in 
 * the sample window no values are emitted by sampleTime.
 */

/*
 * The sample window can also be based off another stream. 
 * For instance, in this example every time you click the
 * last value emitted by the timer$ observable will be emitted
 * by sample.
 */

const mapped = map(({ clientX, clientY }) => ({ clientX, clientY }));

const click$ = fromEvent(document, 'click');
const timer$ = interval(1000);
const obs1$ = click$.pipe(sampleTime(4000), mapped);
const obs2$ = timer$.pipe(sample(click$));

// obs1$.subscribe(console.log);
// obs2$.subscribe(console.log);
