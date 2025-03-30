import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

// Helper functions
const scrollPercent = el => (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
const mapProgressFn = el => scrollPercent(el.target.scrollingElement);
const mapProgress = map(mapProgressFn);

// Elements
const progressBar = document.querySelector('.progress-bar');

// Streams
const scroll$ = fromEvent(document, 'scroll');
const progress$ = scroll$.pipe(mapProgress);

// Subscriptions
const sub = progress$.subscribe(percent => progressBar.style.width = `${percent}%`);
