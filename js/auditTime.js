import { fromEvent } from 'rxjs';
import { auditTime, map } from 'rxjs/operators';

/*
 * auditTime will begin window when the source emits. Then,
 * once the window passes, the last emitted value
 * from the source will be emitted. For instance, in this
 * example if you click a 4s timer will be started. 
 * At the end, the last click event during that window
 * will be emitted by auditTime. This is similar to the
 * behavior of throttleTime, if you were to pass in a config
 * to emit the value on the trailing edge.
 */

const mapped = map(({clientX, clientY}) => ({clientX, clientY}));
const click$ = fromEvent(document, 'click');
const obs$ = click$.pipe(auditTime(4000), mapped);
obs$.subscribe(console.log);
