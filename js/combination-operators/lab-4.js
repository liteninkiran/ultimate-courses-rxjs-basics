import { combineLatest, fromEvent, of } from 'rxjs';
import { map, filter, delay, mergeMap, tap, share } from 'rxjs/operators';

/*
 * Combine streams of the three values needed to complete
 * our mortgage calculation. Once all three are filled out
 * any subsequent updates will trigger a new calculation.
 */

/*
 * If a field is empty, we'll just ignore the update for now
 * by filtering out invalid values.
 */

/*
 * Demonstrate sharing a stream so saves won't impact
 * display updates. Behind the scenes this uses a Subject,
 * which we we learn about in the first lessons of the
 * Masterclass course.
 */

// Elements
const loanAmount = document.getElementById('loanAmount');
const interest = document.getElementById('interest');
const loanLength = document.querySelectorAll('.loanLength');
const expected = document.getElementById('expected');

// Helper functions
const calculateMortgage = (interest, loanAmount, loanLength) => {
    const calculatedInterest = interest / 1200;
    const numerator = loanAmount * calculatedInterest;
    const denominator = 1 - Math.pow(1 / (1 + calculatedInterest), loanLength);
    const total = numerator / denominator;
    return total.toFixed(2);
}
const createInputValueStream = elem => fromEvent(elem, 'input').pipe(map((event) => parseFloat(event.target.value)));
const mergeMapped = mergeMap(mortageAmount => saveResponse(mortageAmount));
const mapFn = ([i, amt, len]) => calculateMortgage(i, amt, len);
const mapped = map(mapFn);

// Simulate a save request
const saveResponse = mortageAmount => of(mortageAmount).pipe(delay(1000));

// Streams
const interest$ = createInputValueStream(interest);
const loanLength$ = createInputValueStream(loanLength);
const loanAmount$ = createInputValueStream(loanAmount);

const combined = [interest$, loanAmount$, loanLength$];
const calculation$ = combineLatest(combined).pipe(
    mapped,
    tap(console.log),
    filter(mortageAmount => !isNaN(mortageAmount)),
    share(),
);

calculation$.subscribe(mortageAmount => expected.innerHTML = mortageAmount);
calculation$.pipe(mergeMapped).subscribe();
