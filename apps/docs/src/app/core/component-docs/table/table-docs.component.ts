import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as tableHtmlSrc from '!raw-loader!./examples/table-example.component.html';
import * as tableTsSrc from '!raw-loader!./examples/table-example.component.ts';
import * as tableCheckHtml from '!raw-loader!./examples/table-checkboxes-example.component.html';
import * as tableCheckTs from '!raw-loader!./examples/table-checkboxes-example.component.ts';
import * as tableCdkHtml from '!raw-loader!./examples/table-cdk-example.component.html';
import * as tableCdkTs from '!raw-loader!./examples/table-cdk-example.component.ts';
import * as tableCdkScss from '!raw-loader!./examples/table-cdk-example.component.scss';
import * as tableResponsiveHtml from '!raw-loader!./examples/table-responsive-example.component.html';
import * as tableResponsiveTs from '!raw-loader!./examples/table-responsive-example.component.ts';
import * as tableResponsiveScss from '!raw-loader!./examples/table-responsive-example.component.scss';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-table',
    templateUrl: './table-docs.component.html',
    styleUrls: ['table-docs.component.scss']

})
export class TableDocsComponent implements OnInit {
    static schema: Schema = {
        properties: {
            state: {
                type: 'object',
                properties: {
                    disabled: {
                        type: 'boolean'
                    }
                }
            }
        },
        type: 'object'
    };

    schema: Schema;
    data: any = {
        state: {
            disabled: false
        }
    };

    tableExample: ExampleFile[] = [
        {
            language: 'html',
            code: tableHtmlSrc,
            fileName: 'table-example'
        },
        {
            language: 'typescript',
            component: 'TableExampleComponent',
            code: tableTsSrc,
            fileName: 'table-example'
        }
    ];

    tableCheckboxes: ExampleFile[] = [
        {
            language: 'html',
            code: tableCheckHtml,
            fileName: 'table-checkboxes-example'
        },
        {
            language: 'typescript',
            component: 'TableCheckboxesExampleComponent',
            code: tableCheckTs,
            fileName: 'table-checkboxes-example'
        }
    ];

    tableCdk: ExampleFile[] = [
        {
            language: 'html',
            code: tableCdkHtml,
            fileName: 'table-cdk-example',
            scssFileCode: tableCdkScss
        },
        {
            language: 'typescript',
            component: 'TableCdkExampleComponent',
            code: tableCdkTs,
            fileName: 'table-cdk-example'
        }
    ];

    tableResponsive: ExampleFile[] = [
        {
            language: 'html',
            code: tableResponsiveHtml,
            fileName: 'table-responsive-example',
            scssFileCode: tableResponsiveScss
        },
        {
            language: 'typescript',
            component: 'TableResponsiveExampleComponent',
            code: tableResponsiveTs,
            fileName: 'table-responsive-example'
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('table');
    }

    ngOnInit() { }
    onSchemaValues(data) {
        this.data = data;
    }
}
