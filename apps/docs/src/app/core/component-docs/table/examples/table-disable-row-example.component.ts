import { Component } from '@angular/core';

@Component({
    selector: 'fd-table-disable-row-example',
    templateUrl: './table-disable-row-example.component.html'
})
export class TableDisableRowExampleComponent {
    selectMasterModel = false;

    tableRows: any[] = [
        {
            status: '',
            column1: 'user.name@email.com',
            column2: 'Row 1',
            column3: 'Row 1',
            date: '09-07-18',
            checked: false,
            disabled: false
        },
        {
            status: 'valid',
            column1: 'user.name@email.com',
            column2: 'Row 2',
            column3: 'Row 2',
            date: '09-07-18',
            checked: false,
            disabled: true
        },
        {
            status: '',
            column1: 'user.name@email.com',
            column2: 'Row 3',
            column3: 'Row 3',
            date: '09-07-18',
            checked: false,
            disabled: false
        }
    ];

    fruits: any[] = [
        {
            name: 'Banana',
            status: 'positive',
            statusName: 'Available',
            dateOfExpire: '12.06.2020',
            price: '5 EUR',
            country: 'India',
            description: 'A banana is an elongated, edible fruit – botanically a berry – produced by several kinds of large herbaceous flowering plants in the genus Musa.',
            checked: false,
            disabled: false
        },
        {
            name: 'Apple',
            status: 'informative',
            statusName: 'Temporary unavailable',
            dateOfExpire: '10.06.2020',
            price: '5,5 EUR',
            country: 'USA',
            description: 'An apple is an edible fruit produced by an apple tree (Malus domestica). Apple trees are cultivated worldwide and are the most widely grown species in the genus Malus.',
            checked: false,
            disabled: true
        }
    ];

    select(index: number, checked: boolean): void {
        this.tableRows[index].checked = checked;
        this.selectMasterModel = this._allSelected();
    }

    selectMaster(checked: boolean): void {
        this.selectMasterModel = checked;
        if (checked) {
            this._selectAll();
        } else {
            this._deselectAll();
        }
    }

    private _selectAll(): void {
        this.tableRows.forEach((row) => {
            if (!row.disabled) {
                row.checked = true;
            }
        });
    }

    private _deselectAll(): void {
        this.tableRows.forEach((row) => (row.checked = false));
    }

    private _allSelected(): boolean {
        return !this.tableRows.filter((_row) => (!_row.disabled)).find((_row) => !_row.checked);
    }
}
