import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DataProvider, ListDataSource } from '@fundamental-ngx/platform/shared';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'fdp-doc-platform-list-free-content-example',
    templateUrl: './platform-list-free-content-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlatformListFreeContentExampleComponent {
    _dataSource = new ListDataSource<ListItem>(new ListDataProvider());
}

// it is from application point of to show as example,they refer internal structures in general
export interface ListItem {
    name: string;
    icon?: string;
    navigated?: boolean;
}

const LIST_ELEMENTS: ListItem[] = [
    { name: 'Link List item 1', icon: 'history' },
    { name: 'Link List item 2', icon: 'cart', navigated: true },
    { name: 'Link List item 3' }
];

export class ListDataProvider extends DataProvider<ListItem> {
    constructor() {
        super();
    }
    fetch(params: Map<string, string>): Observable<ListItem[]> {
        let data = LIST_ELEMENTS;
        const name = params.get('name');
        if (name) {
            const keyword = name.toLowerCase();
            data = data.filter((city) => city.name.toLowerCase().indexOf(keyword) > -1);
        }
        return of(data);
    }
}
