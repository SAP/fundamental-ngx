import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ListDataSource, DataProvider, SelectionChangeEvent } from '@fundamental-ngx/platform';


const LIST_ELEMENTS: Address[] = [
    { name: 'Name1' },
    { name: 'Name2' },
    { name: 'Name3' },
    { name: 'Name4' }];
export interface Address {
    name: string;
}

export class ListDataProvider extends DataProvider<Address> {
    constructor() {
        super();
    }
    fetch(params: Map<string, string>): Observable<Address[]> {
        let data = LIST_ELEMENTS;
        if (!!params.get('name')) {
            const keyword = params.get('name').toLowerCase();
            data = data.filter((city) => city.name.toLowerCase().indexOf(keyword) > -1);
        }
        return of(data);
    }
}
@Component({
    selector: 'fdp-list-with-selection-example',
    templateUrl: './platform-list-with-selection-example.component.html'
})
export class PlatformListWithSelectionExampleComponent {
    _dataSource = new ListDataSource<Address>(new ListDataProvider());
    _selectedItems: Address[] = [];

    _showItemInfo(event: SelectionChangeEvent): void {
        this._selectedItems = event.selectedItems;
    }

}
