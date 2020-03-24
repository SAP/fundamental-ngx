import { of, Observable } from 'rxjs';

export class PlatformSearchFieldExampleService {
    public match(keyword: string, category: string): Observable<any> {
        return of(DATA);
    }
}

const DATA = [{
    keyword: 'Blueberry',
    category: 'blue'
}, {
    keyword: 'Blueberry Pancakes',
    category: 'blue'
}, {
    keyword: 'Blue Cheese',
    category: 'blue'
}, {
    keyword: 'Blue Dragon',
    category: 'blue'
}, {
    keyword: 'Blue Jeans',
    category: 'blue'
}, {
    keyword: 'Blue Monday',
    category: 'blue'
}, {
    keyword: 'Blue Moon',
    category: 'blue'
}, {
    keyword: 'Blue Ox',
    category: 'blue'
}, {
    keyword: 'Boy Blue',
    category: 'blue'
}, {
    keyword: 'Electric Indigo',
    category: 'indigo'
}, {
    keyword: 'Green Dragon',
    category: 'green'
}, {
    keyword: 'Green Giant',
    category: 'green'
}, {
    keyword: 'Green Salad',
    category: 'green'
}, {
    keyword: 'Green Thumb',
    category: 'green'
}, {
    keyword: 'Indigo',
    category: 'indigo'
}, {
    keyword: 'Mellow Yellow',
    category: 'yellow'
}, {
    keyword: 'Red Dragon',
    category: 'red'
}, {
    keyword: 'Red Rose',
    category: 'red'
}, {
    keyword: 'Red Wagon',
    category: 'red'
}, {
    keyword: 'Violet',
    category: 'violet'
}, {
    keyword: 'Violet Violin',
    category: 'violet'
}, {
    keyword: 'Yellow Corn',
    category: 'yellow'
}, {
    keyword: 'Yellowstone',
    category: 'yellow'
}, {
    keyword: 'Yellow Rose',
    category: 'yellow'
}];
