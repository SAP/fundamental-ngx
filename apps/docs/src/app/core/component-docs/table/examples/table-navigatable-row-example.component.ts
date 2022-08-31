import { Component } from '@angular/core';

import { RtlService } from '@fundamental-ngx/core/utils';
import { ObjectStatus } from '@fundamental-ngx/core/object-status';

interface TableIem {
    column1: string;
    column2: string;
    column3: string;
    date: string;
    navigatable: boolean;
    active: boolean;
}

interface TableMobileItem {
    name: string;
    status: ObjectStatus;
    statusName: string;
    dateOfExpire: string;
    price: string;
    country: string;
    description: string;
    navigatable: boolean;
}

@Component({
    selector: 'fd-table-navigatable-row-example',
    templateUrl: './table-navigatable-row-example.component.html'
})
export class TableNavigatableRowExampleComponent {
    navigatableRows: TableIem[] = [
        {
            column1: 'user.name@email.com',
            column2: 'Row 1',
            column3: 'Row 1',
            date: '09-07-18',
            navigatable: true,
            active: false
        },
        {
            column1: 'user.name@email.com',
            column2: 'Row 2',
            column3: 'Row 2',
            date: '09-07-18',
            navigatable: false,
            active: false
        },
        {
            column1: 'user.name@email.com',
            column2: 'Row 3',
            column3: 'Row 3',
            date: '09-07-18',
            navigatable: true,
            active: false
        }
    ];

    fruits: TableMobileItem[] = [
        {
            name: 'Banana',
            status: 'positive',
            statusName: 'Available',
            dateOfExpire: '12.06.2020',
            price: '5 EUR',
            country: 'India',
            description: `A banana is an elongated, edible fruit – botanically a berry – produced by several kinds of large herbaceous
                flowering plants in the genus Musa.`,
            navigatable: true
        },
        {
            name: 'Apple',
            status: 'informative',
            statusName: 'Temporary unavailable',
            dateOfExpire: '10.06.2020',
            price: '5,5 EUR',
            country: 'USA',
            description: `An apple is an edible fruit produced by an apple tree (Malus domestica).
                Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus.`,
            navigatable: false
        }
    ];

    get isRtl(): boolean {
        return this._rtlService.rtl.getValue();
    }

    constructor(private _rtlService: RtlService) {}

    alert(row: any): void {
        if (row.navigatable) {
            alert('Navigation event took place!');
        }
    }

    setActiveItem(index: number): void {
        this.navigatableRows.map((item, rowIndex) => {
            item.active = rowIndex === index;
            return item;
        });
        this.alert(this.navigatableRows[index]);
    }
}
