import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

import {
    ListDataSource, DataProvider,
    SelectionChangeEvent
} from '@fundamental-ngx/platform';


const LIST_ELEMENTS: Product[] = [
    {
        title: 'Notebook Basic 15',
        introductionText: 'First product with discount',
        currency: 'Euro',
        amount: 87.50,
        image: 'http://lorempixel.com/400/400/nature',
        gylp1: 'add-favorite',
        gylp2: 'flag',
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
        amount: 237.50,
        image: 'http://lorempixel.com/400/400/nature',
        gylp1: 'request',
        gylp2: 'flag',
        attribute1: '155 x 240 x 160 cm',
        attribute2: '125.50 kg',
        attribute3: '145 x 140 x 360 cm',
        status1: '',
        statusgyph1: 'to-be-reviewed',
        statuslabel1: 'Default',
        inverted1: true,
        status2: '',
        statusgyph2: '',
        statuslabel2: '',
        inverted2: false,
        decimal: 2
    },
    {
        title: 'Notebook Basic 17',
        introductionText: 'No discount',
        currency: 'Euro',
        amount: 117.50,
        image: 'http://lorempixel.com/400/400/nature',
        gylp1: 'add-favorite',
        gylp2: 'user-edit',
        attribute1: 'Fixed rate',
        attribute2: '125 g',
        attribute3: '145 x 140 x 360 cm',
        status1: 'positive',
        statusgyph1: '',
        statuslabel1: 'Positive',
        inverted1: false,
        status2: 'negative',
        statusgyph2: 'status-negative',
        statuslabel2: '',
        inverted2: true,
        decimal: 2
    },
    {
        title: 'Notebook Basic 18',
        introductionText: '',
        currency: 'Euro',
        amount: 734.50,
        image: 'http://lorempixel.com/400/400/nature',
        gylp1: '',
        gylp2: 'private',
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
    }];

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
    status1: string;
    statusgyph1: string;
    statuslabel1: string;
    inverted1: boolean;
    status2: string;
    statusgyph2: string;
    statuslabel2: string;
    inverted2: boolean;
    decimal: number;
}

export class ListDataProvider extends DataProvider<Product> {
    constructor() {
        super();
    }
    fetch(params: Map<string, string>): Observable<Product[]> {
        let data = LIST_ELEMENTS;
        if (!!params.get(name)) {
            const keyword = params.get(name).toLowerCase();
            data = data.filter((item) => item.title.toLowerCase().indexOf(keyword) > -1);
        }
        return of(data);
    }
}
@Component({
    selector: 'fdp-object-list-item-with-row-selection-and-navigation-example',
    templateUrl: './platform-object-list-item-with-row-selection-and-navigation-example.component.html'
})
export class PlatformObjectListItemWithRowSelectionAndNavigationExampleComponent {
    _dataSource = new ListDataSource<Product>(new ListDataProvider());
    _selectedItems: String;

    _showItemInfo(event: SelectionChangeEvent): void {
        if (event.selectedItems[0] !== undefined) {
            this._selectedItems = event.selectedItems[0].id;
        }
    }
}
