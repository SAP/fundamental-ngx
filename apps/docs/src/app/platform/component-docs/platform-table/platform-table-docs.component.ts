import { ChangeDetectorRef, Component } from '@angular/core';

import { RtlService } from '@fundamental-ngx/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import {
    ITEMS,
    PlatformTableDefaultExampleComponent
} from './platform-table-examples/platform-table-default-example.component';
import { PlatformTableDifferentExamplesComponent } from './platform-table-examples/platform-table-different-examples.component';

import * as platformTableDefaultSrc from '!raw-loader!./platform-table-examples/platform-table-default-example.component.html';
import * as platformTableDefaultTsSrc from '!raw-loader!./platform-table-examples/platform-table-default-example.component.ts';

import * as platformTableDifferentSrc from '!raw-loader!./platform-table-examples/platform-table-different-examples.component.html';
import * as platformTableDifferentTsSrc from '!raw-loader!./platform-table-examples/platform-table-different-examples.component.ts';

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

    different: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableDifferentSrc,
            fileName: 'platform-table-different-examples'
        },
        {
            language: 'typescript',
            code: platformTableDifferentTsSrc,
            fileName: 'platform-table-different-examples',
            component: 'PlatformTableDifferentExamplesComponent'
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
