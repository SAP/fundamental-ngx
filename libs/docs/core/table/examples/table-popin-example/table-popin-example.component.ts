import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FocusableGridDirective, RtlService } from '@fundamental-ngx/cdk/utils';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { TableModule } from '@fundamental-ngx/core/table';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'fd-table-popin-example',
    templateUrl: './table-popin-example.component.html',
    styles: [
        `
            .table-example-popin-title {
                margin: 0 0 10px 0;
            }
        `
    ],
    imports: [
        FocusableGridDirective,
        TableModule,
        FormLabelComponent,
        ObjectStatusComponent,
        CheckboxComponent,
        FormsModule,
        AsyncPipe
    ]
})
export class TablePopinExampleComponent implements OnInit {
    masterCheckbox: boolean | null = false;

    navigationArrow$: Observable<string>;

    fruits: any[] = [
        {
            name: 'Banana',
            status: 'positive',
            statusName: 'Available',
            dateOfExpire: '12.06.2020',
            price: '5 EUR',
            country: 'India',
            description: `A banana is an elongated, edible fruit – botanically a berry – produced by several kinds of large herbaceous
                flowering plants in the genus Musa.`,
            checked: false
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
            checked: false
        },
        {
            name: 'Pineapple',
            status: 'negative',
            statusName: 'Out of stock',
            dateOfExpire: '08.06.2020',
            price: '6 EUR',
            country: 'Mexico',
            description: `The pineapple (Ananas comosus) is a tropical plant with an edible fruit and the most
                economically significant plant in the family Bromeliaceae.`,
            checked: false
        },
        {
            name: 'Orange',
            status: 'informative',
            statusName: 'Temporary unavailable',
            dateOfExpire: '18.06.2020',
            price: '10 EUR',
            country: 'Spain',
            description: `The orange is the fruit of various citrus species in the family Rutaceae
                (see list of plants known as orange); it primarily refers to Citrus × sinensis.`,
            checked: false
        }
    ];

    constructor(private _rtlService: RtlService) {}

    select(index: number, checked: boolean): void {
        this.fruits[index].checked = checked;

        this._handleMasterCheckboxState();
    }

    selectMaster(checked: boolean): void {
        checked ? this._selectAll() : this._deselectAll();

        this._handleMasterCheckboxState();
    }

    ngOnInit(): void {
        this.navigationArrow$ = this._rtlService.rtl.pipe(
            map((isRtl) => (isRtl ? 'slim-arrow-left' : 'slim-arrow-right'))
        );
    }

    private _handleMasterCheckboxState(): void {
        this.masterCheckbox = this._allSelected() ? true : this._anySelected() ? null : false;
    }

    private _selectAll(): void {
        this.fruits.forEach((row) => (row.checked = true));
    }

    private _deselectAll(): void {
        this.fruits.forEach((row) => (row.checked = false));
    }

    private _anySelected(): boolean {
        return this.fruits.some((_row) => _row.checked);
    }

    private _allSelected(): boolean {
        return this.fruits.every((_row) => _row.checked);
    }
}
