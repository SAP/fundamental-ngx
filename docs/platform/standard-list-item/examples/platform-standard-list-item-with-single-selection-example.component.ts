import { Component, Renderer2, ElementRef, AfterViewInit } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ListDataSource, DataProvider } from '@fundamental-ngx/platform/shared';
import { SelectionChangeEvent } from '@fundamental-ngx/platform/list';

const LIST_ELEMENTS: Address[] = [
    {
        img: 'https://picsum.photos/400/400?nature',
        imgInfo: 'nature',
        name: 'Green',
        description: 'First text item in Byline (Standard text item)',
        info: 'Second text item in Byline (Can be semantic (Status) or not)'
    },
    {
        img: 'https://picsum.photos/400/400?nature',
        imgInfo: 'nature',
        name: 'Yellow',
        description: 'First text item in Byline (Standard text item)',
        info: 'Second text item in Byline (Can be semantic (Status) or not)'
    },
    {
        img: 'https://picsum.photos/400/400?nature',
        imgInfo: 'nature',
        name: 'Purple',
        description: 'First text item in Byline (Standard text item)',
        info: 'Second text item in Byline (Can be semantic (Status) or not)'
    },
    {
        img: 'https://picsum.photos/400/400?nature',
        imgInfo: 'nature',
        name: 'Orange',
        description: 'First text item in Byline (Standard text item)',
        info: 'Second text item in Byline (Can be semantic (Status) or not)'
    }
];
export interface Address {
    name: string;
    img: string;
    description: string;
    imgInfo: string;
    info: string;
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
    selector: 'fdp-platform-standard-list-item-with-single-selection-example',
    templateUrl: './platform-standard-list-item-with-single-selection-example.component.html'
})
export class PlatformStandardListItemWithSingleSelectionExampleComponent implements AfterViewInit {
    _dataSource = new ListDataSource<Address>(new ListDataProvider());
    _selectedItems: any[] = [];

    constructor(private _render: Renderer2, private _elementRef: ElementRef) {}

    ngAfterViewInit(): void {
        const toolbar = this._elementRef.nativeElement.querySelector('fd-toolbar');
        this._render.setAttribute(toolbar, 'tabindex', '0');
        this._render.setStyle(toolbar, 'outline', 'none');
    }

    selectionChange(event: SelectionChangeEvent): void {
        this._selectedItems = event.selectedItems || [];
    }
}
