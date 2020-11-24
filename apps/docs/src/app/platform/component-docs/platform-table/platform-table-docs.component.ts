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
            hideItemCount: false,
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
    'name': 'implementation',
    'description': 'sit amet consectetuer adipiscing elit',
    'price': {
        'value': 2.06,
        'currency': 'IDR'
    },
    'status': 'valid'
}, {
    'name': 'moderator',
    'description': 'luctus et ultrices posuere cubilia curae donec',
    'price': {
        'value': 33.34,
        'currency': 'MZN'
    },
    'status': 'warning'
}, {
    'name': 'focus group',
    'description': 'at velit vivamus vel nulla eget eros',
    'price': {
        'value': 72.12,
        'currency': 'CNY'
    },
    'status': 'error'
}, {
    'name': 'contingency',
    'description': 'posuere nonummy integer',
    'price': {
        'value': 6.25,
        'currency': 'CNY'
    },
    'status': 'information'
}, {
    'name': 'matrix',
    'description': 'congue etiam justo etiam pretium iaculis',
    'price': {
        'value': 54.29,
        'currency': 'NZD'
    },
    'status': 'warning'
}, {
    'name': 'Persistent',
    'description': 'ipsum praesent blandit',
    'price': {
        'value': 14.59,
        'currency': 'UGX'
    },
    'status': 'information'
}, {
    'name': 'paradigm',
    'description': 'nec condimentum neque',
    'price': {
        'value': 9.37,
        'currency': 'IDR'
    },
    'status': 'warning'
}, {
    'name': 'content-based',
    'description': 'non mauris morbi non lectus aliquam',
    'price': {
        'value': 10.17,
        'currency': 'EGP'
    },
    'status': 'error'
}, {
    'name': 'multimedia',
    'description': 'pede morbi porttitor lorem id ligula',
    'price': {
        'value': 8.06,
        'currency': 'IDR'
    },
    'status': 'information'
}, {
    'name': 'high-level',
    'description': 'ligula nec sem',
    'price': {
        'value': 27.13,
        'currency': 'EUR'
    },
    'status': 'valid'
}];
