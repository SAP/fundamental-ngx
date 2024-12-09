import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { Observable, of } from 'rxjs';

import { FormsModule } from '@angular/forms';
import { ToolbarComponent, ToolbarLabelDirective } from '@fundamental-ngx/core/toolbar';
import { PlatformListModule, SelectionChangeEvent, StandardListItemModule } from '@fundamental-ngx/platform/list';
import { DataProvider, ListDataSource } from '@fundamental-ngx/platform/shared';

const LIST_ELEMENTS: Address[] = [{ name: 'Name1' }, { name: 'Name2' }, { name: 'Name3' }, { name: 'Name4' }];
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
@Component({
    selector: 'fdp-platform-list-with-selection-example',
    templateUrl: './platform-list-with-selection-example.component.html',
    imports: [ToolbarComponent, ToolbarLabelDirective, PlatformListModule, FormsModule, StandardListItemModule]
})
export class PlatformListWithSelectionExampleComponent implements AfterViewInit {
    _dataSource = new ListDataSource<Address>(new ListDataProvider());
    _selectedItems: Address[] = [];

    constructor(
        private _render: Renderer2,
        private _elementRef: ElementRef
    ) {}

    ngAfterViewInit(): void {
        const toolbar = this._elementRef.nativeElement.querySelector('fd-toolbar');
        this._render.setAttribute(toolbar, 'tabindex', '-1');
        this._render.setStyle(toolbar, 'outline', 'none');
    }

    _showItemInfo(event: SelectionChangeEvent): void {
        this._selectedItems = event.selectedItems;
    }
}
