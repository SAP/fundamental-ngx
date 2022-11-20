import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';

import { SmartFilterBarComponent } from './smart-filter-bar.component';
import { whenStable } from '@fundamental-ngx/core/tests';
import { FdDate } from '@fundamental-ngx/core/datetime';
import { PlatformTableModule } from '@fundamental-ngx/platform/table';
import { PlatformSmartFilterBarModule } from './smart-filter-bar.module';

@Component({
    selector: 'fdp-smart-filter-bar-test',
    template: ` <fdp-smart-filter-bar [subject]="subject"></fdp-smart-filter-bar>

        <fdp-table
            fdp-smart-filter-bar-subject
            #subject="fdp-smart-filter-bar-subject"
            [dataSource]="source"
            [trackBy]="trackBy"
        >
            <fdp-column fdp-smart-filter-bar-field-definition name="name" key="name" label="Name" align="start">
            </fdp-column>

            <fdp-column fdp-smart-filter-bar-field-definition name="description" key="description" label="Description">
            </fdp-column>

            <fdp-column
                fdp-smart-filter-bar-field-definition
                dataType="number"
                name="price"
                key="price.value"
                label="Price"
                align="end"
            >
            </fdp-column>

            <fdp-column
                fdp-smart-filter-bar-field-definition
                filterType="multi-select"
                name="status"
                key="status"
                label="Status"
                align="center"
            >
            </fdp-column>

            <fdp-column
                fdp-smart-filter-bar-field-definition
                filterType="single-select"
                name="statusColor"
                key="statusColor"
                label="Status color"
                align="center"
            >
            </fdp-column>

            <fdp-column
                fdp-smart-filter-bar-field-definition
                dataType="date"
                name="date"
                key="date"
                label="Date"
            ></fdp-column>

            <fdp-column
                fdp-smart-filter-bar-field-definition
                filterType="single-select"
                dataType="boolean"
                name="verified"
                key="verified"
                label="Verified"
            ></fdp-column>
        </fdp-table>`
})
class TestComponent {
    source: ExampleItem[] = ITEMS;

    @ViewChild(SmartFilterBarComponent) smartFilterBar: SmartFilterBarComponent;

    trackBy(_: number, item: ExampleItem): number {
        return item.id;
    }
}

export interface ExampleItem {
    id: number;
    name: string;
    description: string;
    price: {
        value: number;
        currency: string;
    };
    status: string;
    statusColor?: string;
    date: FdDate;
    verified: boolean;
}

// Example items
const ITEMS: ExampleItem[] = [
    {
        id: 1,
        name: '10 Portable DVD player',
        description: 'diam neque vestibulum eget vulputate',
        price: {
            value: 66.04,
            currency: 'CNY'
        },
        status: 'Stocked on demand',
        statusColor: 'informative',
        date: new FdDate(2020, 1, 7),
        verified: true
    },
    {
        id: 2,
        name: 'Astro Laptop 1516',
        description: 'pede malesuada',
        price: {
            value: 489.01,
            currency: 'EUR'
        },
        status: 'Out of stock',
        statusColor: 'negative',
        date: new FdDate(2020, 2, 5),
        verified: true
    },
    {
        id: 3,
        name: 'Astro Phone 6',
        description: 'penatibus et magnis',
        price: {
            value: 154.1,
            currency: 'IDR'
        },
        status: 'Stocked on demand',
        statusColor: 'informative',
        date: new FdDate(2020, 1, 12),
        verified: true
    },
    {
        id: 4,
        name: 'Beam Breaker B-1',
        description: 'fermentum donec ut',
        price: {
            value: 36.56,
            currency: 'NZD'
        },
        status: 'Stocked on demand',
        statusColor: 'informative',
        date: new FdDate(2020, 11, 24),
        verified: false
    },
    {
        id: 5,
        name: 'Beam Breaker B-2',
        description: 'sapien in sapien iaculis congue',
        price: {
            value: 332.57,
            currency: 'NZD'
        },
        status: 'No info',
        date: new FdDate(2020, 10, 23),
        verified: true
    },
    {
        id: 6,
        name: 'Benda Laptop 1408',
        description: 'suspendisse potenti cras in',
        price: {
            value: 243.49,
            currency: 'CNY'
        },
        status: 'Stocked on demand',
        statusColor: 'informative',
        date: new FdDate(2020, 9, 22),
        verified: true
    },
    {
        id: 7,
        name: 'Bending Screen 21HD',
        description: 'nunc nisl duis bibendum',
        price: {
            value: 66.46,
            currency: 'EUR'
        },
        status: 'Available',
        statusColor: 'positive',
        date: new FdDate(2020, 8, 14),
        verified: false
    },
    {
        id: 8,
        name: 'Blaster Extreme',
        description: 'quisque ut',
        price: {
            value: 436.88,
            currency: 'USD'
        },
        status: 'Available',
        statusColor: 'positive',
        date: new FdDate(2020, 8, 15),
        verified: true
    },
    {
        id: 9,
        name: 'Broad Screen 22HD',
        description: 'ultrices posuere',
        price: {
            value: 458.18,
            currency: 'CNY'
        },
        status: 'Available',
        statusColor: 'positive',
        date: new FdDate(2020, 5, 4),
        verified: true
    },
    {
        id: 10,
        name: 'Camcorder View',
        description: 'integer ac leo pellentesque',
        price: {
            value: 300.52,
            currency: 'USD'
        },
        status: 'Available',
        statusColor: 'positive',
        date: new FdDate(2020, 5, 5),
        verified: true
    },
    {
        id: 11,
        name: 'Cepat Tablet 10.5',
        description: 'rutrum rutrum neque aenean auctor',
        price: {
            value: 365.12,
            currency: 'NZD'
        },
        status: 'No info',
        date: new FdDate(2020, 5, 6),
        verified: true
    },
    {
        id: 12,
        name: 'Ergo Mousepad',
        description: 'tortor duis mattis egestas',
        price: {
            value: 354.46,
            currency: 'EUR'
        },
        status: 'Stocked on demand',
        statusColor: 'informative',
        date: new FdDate(2020, 5, 7),
        verified: true
    },
    {
        id: 13,
        name: 'Ergo Screen E-I',
        description: 'massa quis augue luctus tincidunt',
        price: {
            value: 387.23,
            currency: 'NZD'
        },
        status: 'Stocked on demand',
        statusColor: 'informative',
        date: new FdDate(2020, 3, 23),
        verified: true
    },
    {
        id: 14,
        name: 'Ergo Screen E-II',
        description: 'orci eget',
        price: {
            value: 75.86,
            currency: 'EUR'
        },
        status: 'No info',
        date: new FdDate(2020, 3, 20),
        verified: false
    },
    {
        id: 15,
        name: 'Gaming Monster',
        description: 'cubilia curae',
        price: {
            value: 152.95,
            currency: 'EGP'
        },
        status: 'No info',
        date: new FdDate(2020, 9, 20),
        verified: false
    },
    {
        id: 16,
        name: 'Gaming Monster Pro',
        description: 'pharetra magna vestibulum aliquet',
        price: {
            value: 213.47,
            currency: 'MZN'
        },
        status: 'Out of stock',
        statusColor: 'negative',
        date: new FdDate(2020, 4, 17),
        verified: false
    }
];

describe('SmartFilterBarComponent', () => {
    let component: TestComponent;
    let smartFilterBar: SmartFilterBarComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PlatformTableModule, PlatformSmartFilterBarModule],
            declarations: [TestComponent]
        }).compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await whenStable(fixture);
        smartFilterBar = component.smartFilterBar;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open filters dialog', async () => {
        await whenStable(fixture);

        const dialogSpy = spyOn((smartFilterBar as any)._dialogService, 'open').and.callThrough();

        smartFilterBar.showFilteringSettings();

        expect(dialogSpy).toHaveBeenCalled();
    });

    it('should submit form', async () => {
        await whenStable(fixture);

        const fgSpy = spyOn(component.smartFilterBar, '_onFormSubmitted').and.callThrough();

        smartFilterBar.submitForm();

        await new Promise((resolve) => setTimeout(() => resolve(null), 200));

        expect(fgSpy).toHaveBeenCalled();
    });

    it('should toggle filter bar', async () => {
        smartFilterBar._toggleFilterBar();
        fixture.detectChanges();
        await whenStable(fixture);

        expect(smartFilterBar._showFilterBar).toBeFalse();
        expect(fixture.nativeElement.querySelector('.fdp-smart-filter-bar__filters').classList).toContain(
            'fdp-smart-filter-bar__filters--hidden'
        );
    });
});
