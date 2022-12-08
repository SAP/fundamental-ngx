import { AfterViewInit, Component, ElementRef, Renderer2 } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ObjectStatus } from '@fundamental-ngx/core/object-status';
import { DataProvider, ListDataSource } from '@fundamental-ngx/platform/shared';
import { BaseListItem, SelectionChangeEvent } from '@fundamental-ngx/platform/list';

const LIST_ELEMENTS: Product[] = [
    {
        title: 'Notebook Basic 15',
        introductionText: 'First product with discount',
        currency: 'Euro',
        amount: 87.5,
        image: 'http://picsum.photos/id/1018/400',
        gylp1: 'add-favorite',
        gylp2: 'flag',
        tip1: 'favorite',
        tip2: 'flag',
        attribute2: '',
        attribute1: '125 g',
        attribute3: '145 x 140 x 360 cm',
        status1: 'critical',
        statusgyph1: 'status-critical',
        statuslabel1: 'Critical',
        inverted1: false,
        status2: 'informative',
        statusgyph2: '',
        statuslabel2: 'Informative',
        inverted2: true,
        decimal: 2
    },
    {
        title: 'Notebook Basic 16',
        introductionText: 'First product with discount',
        currency: 'Euro',
        amount: 237.5,
        image: 'http://picsum.photos/id/1018/400',
        gylp1: 'request',
        gylp2: 'flag',
        tip1: 'request',
        tip2: 'flag',
        attribute1: '155 x 240 x 160 cm',
        attribute2: '125.50 kg',
        attribute3: '145 x 140 x 360 cm',
        status1: undefined,
        statusgyph1: 'to-be-reviewed',
        statuslabel1: 'Default',
        inverted1: true,
        status2: undefined,
        statusgyph2: '',
        statuslabel2: '',
        inverted2: false,
        decimal: 2
    },
    {
        title: 'Notebook Basic 17',
        introductionText: 'No discount',
        currency: 'Euro',
        amount: 117.5,
        image: 'http://picsum.photos/id/1018/400',
        gylp1: 'add-favorite',
        gylp2: 'user-edit',
        tip1: 'favorite',
        tip2: 'edit',
        attribute1: 'Fixed rate',
        attribute2: '125 g',
        attribute3: '145 x 140 x 360 cm',
        status1: 'positive',
        statusgyph1: '',
        statuslabel1: 'Positive',
        inverted1: false,
        status2: 'negative',
        statusgyph2: 'status-negative',
        statuslabel2: 'Negative',
        inverted2: true,
        decimal: 2
    },
    {
        title: 'Notebook Basic 18',
        introductionText: '',
        currency: 'Euro',
        amount: 734.5,
        image: 'http://picsum.photos/id/1018/400',
        gylp1: '',
        gylp2: 'private',
        tip1: '',
        tip2: 'private',
        attribute1: '12g',
        attribute2: 'Not for resale',
        attribute3: '145 x 140 x 360 cm',
        status1: 'critical',
        statusgyph1: 'status-critical',
        statuslabel1: 'Critical',
        inverted1: false,
        status2: 'informative',
        statusgyph2: 'hint',
        statuslabel2: 'Informative',
        inverted2: true,
        decimal: 2
    }
];

export interface Product {
    title: string;
    introductionText: string;
    currency: string;
    amount: number;
    image: string;
    gylp1: string;
    gylp2: string;
    attribute1: string;
    attribute2: string;
    attribute3: string;
    status1?: ObjectStatus;
    statusgyph1: string;
    statuslabel1: string;
    inverted1: boolean;
    status2?: ObjectStatus;
    statusgyph2: string;
    statuslabel2: string;
    inverted2: boolean;
    decimal: number;
    tip1: string;
    tip2: string;
    link?: string;
}

export class ListDataProvider extends DataProvider<Product> {
    constructor() {
        super();
    }
    fetch(params: Map<string, string>): Observable<Product[]> {
        let data = LIST_ELEMENTS;
        const name = params.get('name');
        if (name) {
            const keyword = name.toLowerCase();
            data = data.filter((item) => item.title.toLowerCase().indexOf(keyword) > -1);
        }
        return of(data);
    }
}
@Component({
    selector: 'fdp-platform-object-list-item-with-row-selection-example',
    templateUrl: './platform-object-list-item-with-row-selection-example.component.html'
})
export class PlatformObjectListItemWithRowSelectionExampleComponent implements AfterViewInit {
    _dataSource = new ListDataSource<Product>(new ListDataProvider());
    _selectedItems: BaseListItem[] = [];

    constructor(private _render: Renderer2, private _elementRef: ElementRef) {}

    ngAfterViewInit(): void {
        const toolbar = this._elementRef.nativeElement.querySelector('fd-toolbar');
        this._render.setAttribute(toolbar, 'tabindex', '0');
        this._render.setStyle(toolbar, 'outline', 'none');
    }

    _showItemInfo(event: SelectionChangeEvent): void {
        this._selectedItems = event.selectedItems;
    }
}
