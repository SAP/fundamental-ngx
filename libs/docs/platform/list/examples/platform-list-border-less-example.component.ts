import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ListDataSource, DataProvider } from '@fundamental-ngx/platform/shared';

const LIST_ELEMENTS: Address[] = [{ name: 'Name1' }, { name: 'Name2' }, { name: 'Name3' }, { name: 'Name4' }];
@Component({
    selector: 'fdp-platform-list-border-less-example',
    templateUrl: './platform-list-border-less-example.component.html'
})
export class PlatformListBorderLessExampleComponent {
    _dataSource = new ListDataSource<Address>(new ListDataProvider());
}
// it is from application point of to show as example,they refer internal structurs in general
export interface Address {
    name: string;
}

export class ListDataProvider extends DataProvider<Address> {
    constructor() {
        super();
    }
    fetch(params: Map<string, string>): Observable<Address[]> {
        let data = LIST_ELEMENTS;
        const name = params.get('name');
        if (name) {
            const keyword = name.toLowerCase();
            data = data.filter((city) => city.name.toLowerCase().indexOf(keyword) > -1);
        }
        return of(data);
    }
}
