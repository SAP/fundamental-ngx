import { Component, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ListDataSource, DataProvider } from '@fundamental-ngx/platform/shared';
import { SelectionChangeEvent } from '@fundamental-ngx/platform/list';

const LIST_ELEMENTS: Address[] = [
    { id: '1', name: 'Name1' },
    { id: '2', name: 'Name2' },
    { id: '3', name: 'Name3' },
    { id: '4', name: 'Name4' }
];
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
        const name = params.get('name');
        if (name) {
            const keyword = name.toLowerCase();
            data = data.filter((city) => city.name.toLowerCase().indexOf(keyword) > -1);
        }
        return of(data);
    }
}
@Component({
    selector: 'fdp-platform-list-with-single-selection-example',
    templateUrl: './platform-list-with-single-selection-example.component.html'
})
export class PlatformListWithSingleSelectionExampleComponent implements AfterViewInit {
    _dataSource = new ListDataSource<Address>(new ListDataProvider());
    _selectedItem: string;

    constructor(private _render: Renderer2, private _elementRef: ElementRef) {}

    ngAfterViewInit(): void {
        const toolbar = this._elementRef.nativeElement.querySelector('fd-toolbar');
        this._render.setAttribute(toolbar, 'tabindex', '0');
        this._render.setStyle(toolbar, 'outline', 'none');
    }

    _showItemInfo(event: SelectionChangeEvent): void {
        if (event.selectedItems[0] !== undefined) {
            this._selectedItem = event.selectedItems[0].id;
        }
    }
}
