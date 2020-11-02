import { ChangeDetectorRef, Component } from '@angular/core';

import { RtlService } from '@fundamental-ngx/core';

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
import * as platformTableFilterableSrc from '!raw-loader!./platform-table-examples/platform-table-filterable-example.component.html';
import * as platformTableFilterableTsSrc from '!raw-loader!./platform-table-examples/platform-table-filterable-example.component.ts';


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
                    }
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
            selectionMode: 'none'
        },
        'table-toolbar': {
            title: 'Order Line Items',
            hideItemCount: false
        },
        'first-column': {
            align: 'start',
            sortable: true,
            filterable: true
        }
    };

    tableData = ITEMS;

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

    constructor(private schemaFactory: SchemaFactoryService, private _cd: ChangeDetectorRef) {
        this.schema = this.schemaFactory.getComponent('fdp-table');
    }

    onSchemaValues(data): void {
        this.data = data;
        this._cd.detectChanges();
    }

    onRowSelectionChange(ev): void {
        console.log(ev);
    }
}

export const ITEMS = [{
    'name': '10 Portable DVD player',
    'description': 'diam neque vestibulum eget vulputate',
    'price': {
        'value': 66.04,
        'currency': 'CNY'
    },
    'status': 'Stocked on demand'
}, {
    'name': 'Astro Laptop 1516',
    'description': 'pede malesuada',
    'price': {
        'value': 489.01,
        'currency': 'EUR'
    },
    'status': 'Out of stock'
}, {
    'name': 'Astro Phone 6',
    'description': 'penatibus et magnis',
    'price': {
        'value': 154.1,
        'currency': 'IDR'
    },
    'status': 'Stocked on demand'
}, {
    'name': 'Beam Breaker B-1',
    'description': 'fermentum donec ut',
    'price': {
        'value': 36.56,
        'currency': 'NZD'
    },
    'status': 'Stocked on demand'
}, {
    'name': 'Beam Breaker B-2',
    'description': 'sapien in sapien iaculis congue',
    'price': {
        'value': 332.57,
        'currency': 'NZD'
    },
    'status': 'Become out of stock'
}, {
    'name': 'Benda Laptop 1408',
    'description': 'suspendisse potenti cras in',
    'price': {
        'value': 243.49,
        'currency': 'CNY'
    },
    'status': 'Stocked on demand'
}, {
    'name': 'Bending Screen 21HD',
    'description': 'nunc nisl duis bibendum',
    'price': {
        'value': 66.46,
        'currency': 'EUR'
    },
    'status': 'Available'
}, {
    'name': 'Blaster Extreme',
    'description': 'quisque ut',
    'price': {
        'value': 436.88,
        'currency': 'USD'
    },
    'status': 'Available'
}, {
    'name': 'Broad Screen 22HD',
    'description': 'ultrices posuere',
    'price': {
        'value': 458.18,
        'currency': 'CNY'
    },
    'status': 'Available'
}, {
    'name': 'Camcorder View',
    'description': 'integer ac leo pellentesque',
    'price': {
        'value': 300.52,
        'currency': 'USD'
    },
    'status': 'Available'
}, {
    'name': 'Cepat Tablet 10.5',
    'description': 'rutrum rutrum neque aenean auctor',
    'price': {
        'value': 365.12,
        'currency': 'NZD'
    },
    'status': 'Become out of stock'
}, {
    'name': 'Ergo Mousepad',
    'description': 'tortor duis mattis egestas',
    'price': {
        'value': 354.46,
        'currency': 'EUR'
    },
    'status': 'Stocked on demand'
}, {
    'name': 'Ergo Screen E-I',
    'description': 'massa quis augue luctus tincidunt',
    'price': {
        'value': 387.23,
        'currency': 'NZD'
    },
    'status': 'Stocked on demand'
}, {
    'name': 'Ergo Screen E-II',
    'description': 'orci eget',
    'price': {
        'value': 75.86,
        'currency': 'EUR'
    },
    'status': 'Become out of stock'
}, {
    'name': 'Gaming Monster',
    'description': 'cubilia curae',
    'price': {
        'value': 152.95,
        'currency': 'EGP'
    },
    'status': 'Become out of stock'
}, {
    'name': 'Gaming Monster Pro',
    'description': 'pharetra magna vestibulum aliquet',
    'price': {
        'value': 213.47,
        'currency': 'MZN'
    },
    'status': 'Out of stock'
}, {
    'name': 'ITelO Vault',
    'description': 'nisl duis',
    'price': {
        'value': 33.0,
        'currency': 'EGP'
    },
    'status': 'Become out of stock'
}, {
    'name': 'ITelO Vault Net',
    'description': 'ut odio',
    'price': {
        'value': 353.29,
        'currency': 'EUR'
    },
    'status': 'Available'
}, {
    'name': 'Multi Color',
    'description': 'cras mi pede malesuada',
    'price': {
        'value': 98.08,
        'currency': 'MZN'
    },
    'status': 'Become out of stock'
}, {
    'name': 'Multi Print',
    'description': 'ac diam cras pellentesque',
    'price': {
        'value': 169.13,
        'currency': 'IDR'
    },
    'status': 'Available'
}, {
    'name': 'Mini Tablet',
    'description': 'condimentum neque',
    'price': {
        'value': 196.52,
        'currency': 'EGP'
    },
    'status': 'Out of stock'
}, {
    'name': 'Proctra X',
    'description': 'augue vestibulum ante ipsum primis',
    'price': {
        'value': 275.65,
        'currency': 'USD'
    },
    'status': 'Available'
}, {
    'name': 'Server Professional',
    'description': 'porttitor lorem',
    'price': {
        'value': 456.5,
        'currency': 'EGP'
    },
    'status': 'Stocked on demand'
}, {
    'name': 'Ultra Jet Super Color',
    'description': 'tristique tortor',
    'price': {
        'value': 302.18,
        'currency': 'EUR'
    },
    'status': 'Stocked on demand'
}, {
    'name': 'Ultra Jet Mobile',
    'description': 'est congue elementum in hac',
    'price': {
        'value': 226.91,
        'currency': 'NZD'
    },
    'status': 'Available'
}, {
    'name': 'Wireless DSL Router',
    'description': 'ultrices aliquet maecenas leo odio',
    'price': {
        'value': 192.78,
        'currency': 'USD'
    },
    'status': 'Become out of stock'
}, {
    'name': '10 Portable DVD player',
    'description': 'cursus vestibulum proin',
    'price': {
        'value': 43.41,
        'currency': 'EUR'
    },
    'status': 'Out of stock'
}, {
    'name': 'Astro Laptop 1516',
    'description': 'justo sollicitudin ut',
    'price': {
        'value': 311.68,
        'currency': 'MZN'
    },
    'status': 'Become out of stock'
}, {
    'name': 'Astro Phone 6',
    'description': 'eget massa tempor convallis',
    'price': {
        'value': 326.64,
        'currency': 'MZN'
    },
    'status': 'Stocked on demand'
}, {
    'name': 'Beam Breaker B-1',
    'description': 'vestibulum sit',
    'price': {
        'value': 286.95,
        'currency': 'IDR'
    },
    'status': 'Available'
}];
