import { ChangeDetectorRef, Component } from '@angular/core';

import { RtlService } from '@fundamental-ngx/core';
import {
    TableColumnFreezeEvent,
    TableDataSource,
    TableFilterChangeEvent,
    TableGroupChangeEvent,
    TableRowSelectionChangeEvent,
    TableSortChangeEvent
} from '@fundamental-ngx/platform';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import { PlatformTableDefaultExampleComponent } from './platform-table-examples/platform-table-default-example.component';

import * as platformTableDefaultSrc from '!raw-loader!./platform-table-examples/platform-table-default-example.component.html';
import * as platformTableDefaultTsSrc from '!raw-loader!./platform-table-examples/platform-table-default-example.component.ts';
import * as platformTableCustomColumnSrc from '!raw-loader!./platform-table-examples/platform-table-custom-column-example.component.html';
import * as platformTableCustomColumnTsSrc from '!raw-loader!./platform-table-examples/platform-table-custom-column-example.component.ts';
import * as platformTableSingleRowSelectionSrc from '!raw-loader!./platform-table-examples/platform-table-single-row-selection-example.component.html';
import * as platformTableSingleRowSelectionTsSrc from '!raw-loader!./platform-table-examples/platform-table-single-row-selection-example.component.ts';
import * as platformTableMultipleRowSelectionSrc from '!raw-loader!./platform-table-examples/platform-table-multiple-row-selection-example.component.html';
import * as platformTableMultipleRowSelectionTsSrc from '!raw-loader!./platform-table-examples/platform-table-multiple-row-selection-example.component.ts';
import * as platformTableSortableSrc from '!raw-loader!./platform-table-examples/platform-table-sortable-example.component.html';
import * as platformTableSortableTsSrc from '!raw-loader!./platform-table-examples/platform-table-sortable-example.component.ts';
import * as platformTableGroupableSrc from '!raw-loader!./platform-table-examples/platform-table-groupable-example.component.html';
import * as platformTableGroupableTsSrc from '!raw-loader!./platform-table-examples/platform-table-groupable-example.component.ts';
import * as platformTableFilterableSrc from '!raw-loader!./platform-table-examples/platform-table-filterable-example.component.html';
import * as platformTableFilterableTsSrc from '!raw-loader!./platform-table-examples/platform-table-filterable-example.component.ts';
import * as platformTableFreezableSrc from '!raw-loader!./platform-table-examples/platform-table-freezable-example.component.html';
import * as platformTableFreezableTsSrc from '!raw-loader!./platform-table-examples/platform-table-freezable-example.component.ts';
import { TableDataProviderExample } from './platform-table-examples/platform-table-data-provider-example';


@Component({
    selector: 'fdp-table-docs',
    templateUrl: './platform-table-docs.component.html',
    providers: [RtlService]
})
export class PlatformTableDocsComponent {
    static schema: any = {
        properties: {
            table: {
                type: 'object',
                properties: {
                    contentDensity: {
                        type: 'string',
                        enum: ['compact', 'cozy', 'condensed']
                    },
                    selectionMode: {
                        type: 'string',
                        enum: ['single', 'multiple', 'none']
                    },
                    freezeColumnsTo: {
                        type: 'string',
                        enum: ['name', 'description', 'price.value', 'status']
                    },
                    noHorizontalBorders: {
                        type: 'boolean'
                    },
                    noVerticalBorders: {
                        type: 'boolean'
                    },
                    noBorders: {
                        type: 'boolean'
                    },
                    noBodyBorders: {
                        type: 'boolean'
                    },
                }
            },
            'table-toolbar': {
                type: 'object',
                properties: {
                    title: {
                        type: 'string'
                    },
                    hideItemCount: {
                        type: 'boolean'
                    }
                }
            },
            'first-column': {
                type: 'object',
                properties: {
                    align: {
                        type: 'string',
                        enum: ['start', 'center', 'end']
                    },
                    sortable: {
                        type: 'boolean'
                    },
                    filterable: {
                        type: 'boolean'
                    },
                    groupable: {
                        type: 'boolean'
                    }
                }
            }
        },
        type: 'object'
    };

    schema: Schema;

    data: any = {
        table: {
            contentDensity: 'cozy',
            selectionMode: 'none',
            freezeColumnsTo: null,
            noHorizontalBorders: false,
            noVerticalBorders: false,
            noBorders: false,
            noBodyBorders: false
        },
        'table-toolbar': {
            title: 'Order Line Items',
            hideItemCount: false
        },
        'first-column': {
            align: 'start',
            sortable: true,
            filterable: true,
            groupable: true
        }
    };

    defaultTable: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableDefaultSrc,
            fileName: 'platform-table-default-example'
        },
        {
            language: 'typescript',
            code: platformTableDefaultTsSrc,
            fileName: 'platform-table-default-example',
            component: 'PlatformTableDefaultExampleComponent'
        }
    ];

    customColumnTable: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableCustomColumnSrc,
            fileName: 'platform-table-custom-column-example'
        },
        {
            language: 'typescript',
            code: platformTableCustomColumnTsSrc,
            fileName: 'platform-table-custom-column-example',
            component: 'PlatformTableCustomColumnExampleComponent'
        }
    ];

    singleRowSelection: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableSingleRowSelectionSrc,
            fileName: 'platform-table-single-row-selection-example'
        },
        {
            language: 'typescript',
            code: platformTableSingleRowSelectionTsSrc,
            fileName: 'platform-table-single-row-selection-example',
            component: 'PlatformTableSingleRowSelectionExampleComponent'
        }
    ];

    multipleRowSelection: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableMultipleRowSelectionSrc,
            fileName: 'platform-table-multiple-row-selection-example'
        },
        {
            language: 'typescript',
            code: platformTableMultipleRowSelectionTsSrc,
            fileName: 'platform-table-multiple-row-selection-example',
            component: 'PlatformTableMultipleRowSelectionExampleComponent'
        }
    ];

    sortableTable: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableSortableSrc,
            fileName: 'platform-table-sortable-example'
        },
        {
            language: 'typescript',
            code: platformTableSortableTsSrc,
            fileName: 'platform-table-sortable-example',
            component: 'PlatformTableSortableExampleComponent'
        }
    ];

    filterableTable: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableFilterableSrc,
            fileName: 'platform-table-filterable-example'
        },
        {
            language: 'typescript',
            code: platformTableFilterableTsSrc,
            fileName: 'platform-table-filterable-example',
            component: 'PlatformTableFilterableExampleComponent'
        }
    ];

    groupableTable: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableGroupableSrc,
            fileName: 'platform-table-groupable-example'
        },
        {
            language: 'typescript',
            code: platformTableGroupableTsSrc,
            fileName: 'platform-table-groupable-example',
            component: 'PlatformTableGroupableExampleComponent'
        }
    ];

    freezableTable: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableFreezableSrc,
            fileName: 'platform-table-freezable-example'
        },
        {
            language: 'typescript',
            code: platformTableFreezableTsSrc,
            fileName: 'platform-table-freezable-example',
            component: 'PlatformTableFreezableExampleComponent'
        }
    ];

    dataSource = new TableDataSource(new TableDataProviderExample());

    constructor(private schemaFactory: SchemaFactoryService, private _cd: ChangeDetectorRef) {
        this.schema = this.schemaFactory.getComponent('fdp-table');
    }

    onSchemaValues(data): void {
        this.data = data;
        this._cd.detectChanges();
    }

    onRowSelectionChange(ev: TableRowSelectionChangeEvent<any>): void {
        console.log(ev);
    }

    onSortChange(ev: TableSortChangeEvent): void {
        console.log(ev);
    }

    onFilterChange(ev: TableFilterChangeEvent): void {
        console.log(ev);
    }

    onFreezeChange(ev: TableColumnFreezeEvent): void {
        console.log(ev);
    }

    onGroupChange(ev: TableGroupChangeEvent): void {
        console.log(ev);
    }
}

export interface ItemInterface {
    name: string;
    description: string;
    price: {
        value: number;
        currency: string;
    };
    status: string;
    statusColor?: string;
}

export const ITEMS: ItemInterface[] = [{
    'name': '10 Portable DVD player',
    'description': 'diam neque vestibulum eget vulputate',
    'price': {
        'value': 66.04,
        'currency': 'CNY'
    },
    'status': 'Stocked on demand',
    'statusColor': 'informative'
}, {
    'name': 'Astro Laptop 1516',
    'description': 'pede malesuada',
    'price': {
        'value': 489.01,
        'currency': 'EUR'
    },
    'status': 'Out of stock',
    'statusColor': 'negative'
}, {
    'name': 'Astro Phone 6',
    'description': 'penatibus et magnis',
    'price': {
        'value': 154.1,
        'currency': 'IDR'
    },
    'status': 'Stocked on demand',
    'statusColor': 'informative'
}, {
    'name': 'Beam Breaker B-1',
    'description': 'fermentum donec ut',
    'price': {
        'value': 36.56,
        'currency': 'NZD'
    },
    'status': 'Stocked on demand',
    'statusColor': 'informative'
}, {
    'name': 'Beam Breaker B-2',
    'description': 'sapien in sapien iaculis congue',
    'price': {
        'value': 332.57,
        'currency': 'NZD'
    },
    'status': 'No info'
}, {
    'name': 'Benda Laptop 1408',
    'description': 'suspendisse potenti cras in',
    'price': {
        'value': 243.49,
        'currency': 'CNY'
    },
    'status': 'Stocked on demand',
    'statusColor': 'informative'
}, {
    'name': 'Bending Screen 21HD',
    'description': 'nunc nisl duis bibendum',
    'price': {
        'value': 66.46,
        'currency': 'EUR'
    },
    'status': 'Available',
    'statusColor': 'positive'
}, {
    'name': 'Blaster Extreme',
    'description': 'quisque ut',
    'price': {
        'value': 436.88,
        'currency': 'USD'
    },
    'status': 'Available',
    'statusColor': 'positive'
}, {
    'name': 'Broad Screen 22HD',
    'description': 'ultrices posuere',
    'price': {
        'value': 458.18,
        'currency': 'CNY'
    },
    'status': 'Available',
    'statusColor': 'positive'
}, {
    'name': 'Camcorder View',
    'description': 'integer ac leo pellentesque',
    'price': {
        'value': 300.52,
        'currency': 'USD'
    },
    'status': 'Available',
    'statusColor': 'positive'
}, {
    'name': 'Cepat Tablet 10.5',
    'description': 'rutrum rutrum neque aenean auctor',
    'price': {
        'value': 365.12,
        'currency': 'NZD'
    },
    'status': 'No info'
}, {
    'name': 'Ergo Mousepad',
    'description': 'tortor duis mattis egestas',
    'price': {
        'value': 354.46,
        'currency': 'EUR'
    },
    'status': 'Stocked on demand',
    'statusColor': 'informative'
}, {
    'name': 'Ergo Screen E-I',
    'description': 'massa quis augue luctus tincidunt',
    'price': {
        'value': 387.23,
        'currency': 'NZD'
    },
    'status': 'Stocked on demand',
    'statusColor': 'informative'
}, {
    'name': 'Ergo Screen E-II',
    'description': 'orci eget',
    'price': {
        'value': 75.86,
        'currency': 'EUR'
    },
    'status': 'No info'
}, {
    'name': 'Gaming Monster',
    'description': 'cubilia curae',
    'price': {
        'value': 152.95,
        'currency': 'EGP'
    },
    'status': 'No info'
}, {
    'name': 'Gaming Monster Pro',
    'description': 'pharetra magna vestibulum aliquet',
    'price': {
        'value': 213.47,
        'currency': 'MZN'
    },
    'status': 'Out of stock',
    'statusColor': 'negative'
}, {
    'name': 'ITelO Vault',
    'description': 'nisl duis',
    'price': {
        'value': 33.0,
        'currency': 'EGP'
    },
    'status': 'Become out of stock',
    'statusColor': 'critical'
}, {
    'name': 'ITelO Vault Net',
    'description': 'ut odio',
    'price': {
        'value': 353.29,
        'currency': 'EUR'
    },
    'status': 'Available',
    'statusColor': 'positive'
}, {
    'name': 'Multi Color',
    'description': 'cras mi pede malesuada',
    'price': {
        'value': 98.08,
        'currency': 'MZN'
    },
    'status': 'Become out of stock',
    'statusColor': 'critical'
}, {
    'name': 'Multi Print',
    'description': 'ac diam cras pellentesque',
    'price': {
        'value': 169.13,
        'currency': 'IDR'
    },
    'status': 'Available',
    'statusColor': 'positive'
}, {
    'name': 'Mini Tablet',
    'description': 'condimentum neque',
    'price': {
        'value': 196.52,
        'currency': 'EGP'
    },
    'status': 'Out of stock',
    'statusColor': 'negative'
}, {
    'name': 'Proctra X',
    'description': 'augue vestibulum ante ipsum primis',
    'price': {
        'value': 275.65,
        'currency': 'USD'
    },
    'status': 'Available',
    'statusColor': 'positive'
}, {
    'name': 'Server Professional',
    'description': 'porttitor lorem',
    'price': {
        'value': 456.5,
        'currency': 'EGP'
    },
    'status': 'Stocked on demand',
    'statusColor': 'informative'
}, {
    'name': 'Ultra Jet Super Color',
    'description': 'tristique tortor',
    'price': {
        'value': 302.18,
        'currency': 'EUR'
    },
    'status': 'Stocked on demand',
    'statusColor': 'informative'
}, {
    'name': 'Ultra Jet Mobile',
    'description': 'est congue elementum in hac',
    'price': {
        'value': 226.91,
        'currency': 'NZD'
    },
    'status': 'Available',
    'statusColor': 'positive'
}, {
    'name': 'Wireless DSL Router',
    'description': 'ultrices aliquet maecenas leo odio',
    'price': {
        'value': 192.78,
        'currency': 'USD'
    },
    'status': 'Become out of stock',
    'statusColor': 'critical'
}, {
    'name': '10 Portable DVD player',
    'description': 'cursus vestibulum proin',
    'price': {
        'value': 43.41,
        'currency': 'EUR'
    },
    'status': 'Out of stock',
    'statusColor': 'negative'
}, {
    'name': 'Astro Laptop 1516',
    'description': 'justo sollicitudin ut',
    'price': {
        'value': 311.68,
        'currency': 'MZN'
    },
    'status': 'Become out of stock',
    'statusColor': 'critical'
}, {
    'name': 'Astro Phone 6',
    'description': 'eget massa tempor convallis',
    'price': {
        'value': 326.64,
        'currency': 'MZN'
    },
    'status': 'Stocked on demand',
    'statusColor': 'informative'
}, {
    'name': 'Beam Breaker B-1',
    'description': 'vestibulum sit',
    'price': {
        'value': 286.95,
        'currency': 'IDR'
    },
    'status': 'Available',
    'statusColor': 'positive'
}];
