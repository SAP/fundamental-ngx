import { of, Observable } from 'rxjs';

import { DataProvider } from '@fundamental-ngx/platform/shared';

const DATA = [
    {
        keyword: 'Blueberry',
        category: 'blue'
    },
    {
        keyword: 'Blueberry Pancakes',
        category: 'blue'
    },
    {
        keyword: 'Blue Cheese',
        category: 'blue'
    },
    {
        keyword: 'Blue Dragon',
        category: 'blue'
    },
    {
        keyword: 'Blue Jeans',
        category: 'blue'
    },
    {
        keyword: 'Blue Monday',
        category: 'blue'
    },
    {
        keyword: 'Blue Moon',
        category: 'blue'
    },
    {
        keyword: 'Blue Ox',
        category: 'blue'
    },
    {
        keyword: 'Boy Blue',
        category: 'blue'
    },
    {
        keyword: 'Electric Indigo',
        category: 'indigo'
    },
    {
        keyword: 'Green Apple',
        category: 'green'
    },
    {
        keyword: 'Green Dragon',
        category: 'green'
    },
    {
        keyword: 'Green Giant',
        category: 'green'
    },
    {
        keyword: 'Green Grass',
        category: 'green'
    },
    {
        keyword: 'Green Salad',
        category: 'green'
    },
    {
        keyword: 'Green Thumb',
        category: 'green'
    },
    {
        keyword: 'Indigo',
        category: 'indigo'
    },
    {
        keyword: 'Mellow Yellow',
        category: 'yellow'
    },
    {
        keyword: 'Orange Crush',
        category: 'orange'
    },
    {
        keyword: 'Orange Juice',
        category: 'orange'
    },
    {
        keyword: 'Red Dragon',
        category: 'red'
    },
    {
        keyword: 'Red Rose',
        category: 'red'
    },
    {
        keyword: 'Red Tag',
        category: 'red'
    },
    {
        keyword: 'Red Wagon',
        category: 'red'
    },
    {
        keyword: 'Violet',
        category: 'violet'
    },
    {
        keyword: 'Violet Violin',
        category: 'violet'
    },
    {
        keyword: 'Yellow Corn',
        category: 'yellow'
    },
    {
        keyword: 'Yellowstone',
        category: 'yellow'
    },
    {
        keyword: 'Yellow Rose',
        category: 'yellow'
    }
];

export class SearchFieldDataProvider extends DataProvider<string> {
    constructor() {
        super();
    }

    fetch(params: Map<string, string>): Observable<string[]> {
        let data = DATA;
        const name = params.get('keyword');
        if (name) {
            const keyword = name.toLowerCase();
            data = data.filter((item) => item.keyword.toLowerCase().indexOf(keyword) > -1);
        }
        if (params.get('category')) {
            data = data.filter((item) => item.category === params.get('category'));
        }
        return of(data.map((item) => item.keyword));
    }
}
