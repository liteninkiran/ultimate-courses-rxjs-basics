import { merge } from 'rxjs';
import { ajax } from 'rxjs/ajax';

const url1 = "https://opendata.nhsbsa.net/api/3/action/datastore_search?resource_id=EPD_202301&sql=SELECT * from `EPD_202301` WHERE BNF_CODE = '0410030C0AAAFAF' AND PRACTICE_CODE = 'Y03641' LIMIT 5";
const url2 = "https://opendata.nhsbsa.net/api/3/action/datastore_search?resource_id=EPD_202302&sql=SELECT * from `EPD_202302` WHERE BNF_CODE = '0410030C0AAAFAF' AND PRACTICE_CODE = 'Y03641' LIMIT 5";
// const div1 = document.getElementById('box1');
// const div2 = document.getElementById('box2');
const arr = [];
const observer = {
    next: (x) => arr.push(x),
    complete: () => console.log(arr),
}

const merged$ = merge(
    ajax.getJSON(url1),
    ajax.getJSON(url2),
);

merged$.subscribe(observer);
