import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
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
export class PlatformListWithSelectionExampleComponent implements AfterViewInit {
    _dataSource = new ListDataSource<Address>(new ListDataProvider());
    _selectedItems: Address[] = [];

    constructor(private _render: Renderer2, private _ele: ElementRef) {}

    ngAfterViewInit(): void {
        this._render.setAttribute( this._ele.nativeElement.querySelector('fd-toolbar'), 'tabindex', '0' );
        this._render.setStyle( this._ele.nativeElement.querySelector('fd-toolbar'), 'outline', 'none' );
    }

    _showItemInfo(event: SelectionChangeEvent): void {
        this._selectedItems = event.selectedItems;
    }

    

}
