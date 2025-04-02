import { fromEvent, empty, interval } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
    debounceTime,
    pluck,
    distinctUntilChanged,
    switchMap,
    catchError,
} from 'rxjs/operators';

/*
 * switchMap is perfect for GET requests, as you do
 * not normally care about the previous request
 * to the same URL if another has fired. For instance,
 * in this example if the user continues typing
 * and the previuos request has not returned,
 * switchMap will go ahead and cancel it and only
 * the current request will be considered.
 */

/*
 * switchMap switches to a new observable on each emission
 * from the source, cancelling any previous inner 
 * observables. For instance, if you click once a new
 * interval observable will be subscribed to internally,
 * with it's values emitted. When you click again,
 * that observable will be completed, and the next 
 * interval will be subscribed to, restarting
 * the count. This will happen on each emission from
 * the click$ observable.
 */

// const interval$ = interval(1000);
// const click$ = fromEvent(document, 'click');
// const obs$ = click$.pipe(switchMap(() => interval$));
// obs$.subscribe(console.log);

const url = 'https://api.openbrewerydb.org/v1/breweries';
const container = document.getElementById('typeahead-container');
const inputBox = document.getElementById('text-input');
const mapResponse = response => response.map(b => b.name).join('<br>');
const handleResponse = response => container.innerHTML = response === null ? '' : mapResponse(response);
const input$ = fromEvent(inputBox, 'keyup');
const getFullUrl = searchTerm => `${url}?by_name=${searchTerm}`;
const switchMapped = switchMap(searchTerm => ajax.getJSON(getFullUrl(searchTerm)));
const obs$ = input$.pipe(
    debounceTime(200),
    pluck('target', 'value'),
    distinctUntilChanged(),
    switchMapped,
);
obs$.subscribe(handleResponse);
