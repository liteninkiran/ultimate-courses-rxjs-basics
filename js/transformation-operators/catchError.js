import { fromEvent, EMPTY } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import {
    debounceTime,
    pluck,
    distinctUntilChanged,
    switchMap,
    catchError,
} from 'rxjs/operators';

/*
 * catchError receives the error and the
 * observable on which the error was caught
 * (in case you wish to retry). In this case,
 * we are catching the error on the ajax
 * observable returned by our switchMap
 * function, as we don't want the entire
 * input$ stream to be completed in the
 * case of an error.
 */

/*
 * In this case, we just want to ignore
 * any errors and hope the next request
 * succeeds so we will just return an 
 * empty observable (completes without
 * emitting any values).
 * 
 * You can also use the EMPTY import, 
 * which is just a shortcut for empty(). 
 * Behind the scenes empty() returns the
 * EMPTY constant when a scheduler is not provided.
 * ex. import { EMPTY } from 'rxjs';
 * return EMPTY;
 * https://github.com/ReactiveX/rxjs/blob/fc3d4264395d88887cae1df2de1b931964f3e684/src/internal/observable/empty.ts#L62-L64
 */

const url = 'https://api.openbrewerydb.org/v1/breweries?by_name=';
const inputBox = document.getElementById('text-input');
const typeaheadContainer = document.getElementById('typeahead-container');
const input$ = fromEvent(inputBox, 'keyup');
const switchMapFn = searchTerm => ajax.getJSON(`${url}${searchTerm}`).pipe(catchError((error, caught) => EMPTY));
const switchMapped = switchMap(switchMapFn); 
const obs$ = input$
    .pipe(
        debounceTime(200),
        pluck('target', 'value'),
        distinctUntilChanged(),
        switchMapped,
    );

obs$.subscribe((response) => typeaheadContainer.innerHTML = response.map(b => b.name).join('<br>'));
