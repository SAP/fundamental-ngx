import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FdDate, FdDatetimeModule, provideDateTimeFormats } from '@fundamental-ngx/core/datetime';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { FD_LANGUAGE, FD_LANGUAGE_ENGLISH } from '@fundamental-ngx/i18n';
import { PlatformSmartFilterBarModule } from '@fundamental-ngx/platform/smart-filter-bar';
import { FilterType, FilterableColumnDataType, PlatformTableModule } from '@fundamental-ngx/platform/table';
import {
    TableDataSourceDirective,
    TableHeaderResizerDirective,
    TableInitialStateDirective
} from '@fundamental-ngx/platform/table-helpers';
import { of } from 'rxjs';

@Component({
    selector: 'fdp-platform-smart-filter-bar-custom-labels-example',
    templateUrl: './platform-smart-filter-bar-custom-labels-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: FD_LANGUAGE,
            useValue: of({
                ...FD_LANGUAGE_ENGLISH,
                platformSmartFilterBar: {
                    ...FD_LANGUAGE_ENGLISH.platformSmartFilterBar,
                    // Strategy labels
                    filterConditionContains: 'custom "contains" label',
                    filterConditionEqualTo: 'custom "equal to" label',
                    filterConditionBetween: 'custom "between" label',
                    filterConditionBeginsWith: 'custom "starts with" label',
                    filterConditionEndsWith: 'custom "ends with" label',
                    filterConditionLessThan: 'custom "less than" label',
                    filterConditionLessThanOrEqualTo: 'custom "less than or equal to" label',
                    filterConditionGreaterThan: 'custom "greater than" label',
                    filterConditionGreaterThanOrEqualTo: 'custom "greater than or equal to" label',
                    filterConditionAfter: 'custom "after" label',
                    filterConditionOnOrAfter: 'custom "on or after" label',
                    filterConditionBefore: 'custom "before" label',
                    filterConditionBeforeOrOn: 'custom "before or on" label',
                    // Filters visibility category labels
                    settingsCategoryAll: 'Custom "All" label',
                    settingsCategoryVisible: 'Custom "Visible" label',
                    settingsCategoryActive: 'Custom "Active" label',
                    settingsCategoryVisibleAndActive: 'Custom "Visible and active" label',
                    settingsCategoryMandatory: 'Custom "Mandatory" label'
                }
            })
        },
        provideDateTimeFormats()
    ],
    imports: [
        PlatformSmartFilterBarModule,
        TitleComponent,
        TableDataSourceDirective,
        TableHeaderResizerDirective,
        PlatformTableModule,
        TableInitialStateDirective,
        FdDatetimeModule
    ]
})
export class PlatformSmartFilterBarCustomLabelsExampleComponent {
    readonly dataTypeEnum = FilterableColumnDataType;
    readonly filterTypeEnum = FilterType;

    source: ExampleItem[] = ITEMS;

    constructor() {}

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
