import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RtlService } from '@fundamental-ngx/core';
import { map, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'fd-table-navigatable-row-example',
    templateUrl: './table-navigatable-row-example.component.html'
})
export class TableNavigatableRowExampleComponent implements OnInit, OnDestroy {
    navigationArrow$: Observable<string>;

    navigationButton$: Observable<string>;

    tableRows: any[] = [
        {
            column1: 'user.name@email.com',
            column2: 'Row 1',
            column3: 'Row 1',
            date: '09-07-18',
            checked: false,
            navigatable: true
        },
        {
            column1: 'user.name@email.com',
            column2: 'Row 2',
            column3: 'Row 2',
            date: '09-07-18',
            checked: false,
            navigatable: false
        },
        {
            column1: 'user.name@email.com',
            column2: 'Row 3',
            column3: 'Row 3',
            date: '09-07-18',
            checked: false,
            navigatable: true
        }
    ];

    tableRowsAdditional: any[] = [
        {
            column1: 'user.name@email.com',
            column2: 'Row1',
            date: '09-07-18',
            type: 'search',
            navigatable: true
        },
        {
            column1: 'user.name@email.com',
            column2: 'Row 2',
            date: '09-08-18',
            type: 'cart',
            navigatable: false
        },
        {
            column1: 'user.name@email.com',
            column2: 'Row 3',
            date: '02-14-18',
            type: 'calendar',
            navigatable: true
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
            navigatable: true
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
            navigatable: false
        }
    ];

    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(private _rtlService: RtlService) {}

    ngOnInit(): void {
        this.navigationArrow$ = this._rtlService.rtl.pipe(
            takeUntil(this._onDestroy$),
            map((isRtl) => (isRtl ? 'slim-arrow-left' : 'slim-arrow-right'))
        );

        this.navigationButton$ = this._rtlService.rtl.pipe(
            takeUntil(this._onDestroy$),
            map((isRtl) => (isRtl ? 'sap-icon--navigation-left-arrow' : 'sap-icon--navigation-right-arrow'))
        );
    }

    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    getGlyph(row: any): string {
        if (row.navigatable) {
            let arrowGlyph: string;
            this.navigationArrow$.subscribe((arrow) => arrowGlyph = arrow);
            return arrowGlyph;
        }
    }

    getClass(): string {   
        let arrowButton: string;
        this.navigationButton$.subscribe((arrow) => arrowButton = arrow);
        return arrowButton;
    }

    alert(row: any): void {
        if (row.navigatable) {
            alert('Navigation event took place!');
        }
    }
}
