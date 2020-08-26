import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ListDataSource, DataProvider } from '@fundamental-ngx/platform';


const LIST_ELEMENTS: Address[] = [
    { id: '1', name: 'Name1' },
    { id: '2', name: 'Name2' },
    { id: '3', name: 'Name3' },
    { id: '4', name: 'Name4' }];
export interface Address {
    id: string;
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
    selector: 'fdp-list-with-single-selection-example',
    templateUrl: './platform-list-with-single-selection-example.component.html'
})
export class PlatformListWithSingleSelectionExampleComponent {
    dataSource = new ListDataSource<Address>(new ListDataProvider());
    selectedItems: any[] = [];

    showItemInfo(event: any): void {
        if (event.selectedItems[0] !== undefined) {
            this.selectedItems = event.selectedItems[0].id;
        }
    }

}
