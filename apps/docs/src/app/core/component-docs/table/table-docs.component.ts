import { Component } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as tableHtmlSrc from '!raw-loader!./examples/table-example.component.html';
import * as tableTsSrc from '!raw-loader!./examples/table-example.component.ts';
import * as tableWithoutBordersHtmlSrc from '!raw-loader!./examples/table-without-borders-example.component.html';
import * as tableWithoutBordersTsSrc from '!raw-loader!./examples/table-without-borders-example.component.ts';
import * as tableColumnSortHtmlSrc from '!raw-loader!./examples/table-column-sorting-example.component.html';
import * as tableColumnSortTsSrc from '!raw-loader!./examples/table-column-sorting-example.component.ts';
import * as tableColumnSortPipeTs from '!raw-loader!./examples/table-example-sort.pipe.ts';
import * as tableColumnFilterPipeTs from '!raw-loader!./examples/table-example-filter.pipe.ts';
import * as tableActivableHtmlSrc from '!raw-loader!./examples/table-activable-example.component.html';
import * as tableActivableTsSrc from '!raw-loader!./examples/table-activable-example.component.ts';
import * as tableCheckHtml from '!raw-loader!./examples/table-checkboxes-example.component.html';
import * as tableCheckTs from '!raw-loader!./examples/table-checkboxes-example.component.ts';
import * as tableSemanticHtml from '!raw-loader!./examples/table-semantic-example.component.html';
import * as tableSemanticTs from '!raw-loader!./examples/table-semantic-example.component.ts';
import * as tableFooterHtml from '!raw-loader!./examples/table-footer-example.component.html';
import * as tableFooterTs from '!raw-loader!./examples/table-footer-example.component.ts';
import * as tableCdkHtml from '!raw-loader!./examples/table-cdk-example.component.html';
import * as tableCdkTs from '!raw-loader!./examples/table-cdk-example.component.ts';
import * as tableCdkScss from '!raw-loader!./examples/table-cdk-example.component.scss';
import * as tablePopInHTs from '!raw-loader!./examples/table-popin-example/table-popin-example.component.ts';
import * as tablePopInHtml from '!raw-loader!./examples/table-popin-example/table-popin-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-table',
    templateUrl: './table-docs.component.html',
    styleUrls: ['table-docs.component.scss']
})
export class TableDocsComponent {
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

    tableWithoutBordersExample: ExampleFile[] = [
        {
            language: 'html',
            code: tableWithoutBordersHtmlSrc,
            fileName: 'table-without-borders-example'
        },
        {
            language: 'typescript',
            component: 'TableExampleComponent',
            code: tableWithoutBordersTsSrc,
            fileName: 'table-without-borders-example'
        }
    ];

    tableFooterExample: ExampleFile[] = [
        {
            language: 'html',
            code: tableFooterHtml,
            fileName: 'table-example'
        },
        {
            language: 'typescript',
            component: 'TableFooterExampleComponent',
            code: tableFooterTs,
            fileName: 'table-footer-example'
        }
    ];

    tablePopInExample: ExampleFile[] = [
        {
            language: 'html',
            code: tablePopInHtml,
            fileName: 'table-popin-example'
        },
        {
            language: 'typescript',
            component: 'TablePopinExampleComponent',
            code: tablePopInHTs,
            fileName: 'table-popin-example'
        }
    ];

    tableColumnSortExample: ExampleFile[] = [
        {
            language: 'html',
            code: tableColumnSortHtmlSrc,
            fileName: 'table-column-sort-example'
        },
        {
            language: 'typescript',
            component: 'TableColumnSortExampleComponent',
            code: tableColumnSortTsSrc,
            fileName: 'table-column-sort-example'
        },
        {
            language: 'typescript',
            component: 'TableColumnSortExampleComponent',
            code: tableColumnSortPipeTs,
            fileName: 'table-example-sort'
        },
        {
            language: 'typescript',
            component: 'TableColumnFilterExampleComponent',
            code: tableColumnFilterPipeTs,
            fileName: 'table-example-filter'
        }
    ];

    tableActivableExample: ExampleFile[] = [
        {
            language: 'html',
            code: tableActivableHtmlSrc,
            fileName: 'table-activable-example'
        },
        {
            language: 'typescript',
            component: 'TableActivableExampleComponent',
            code: tableActivableTsSrc,
            fileName: 'table-activable-example'
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

    tableSemantic: ExampleFile[] = [
        {
            language: 'html',
            code: tableSemanticHtml,
            fileName: 'table-semantic-example'
        },
        {
            language: 'typescript',
            component: 'TableSemanticExampleComponent',
            code: tableSemanticTs,
            fileName: 'table-semantic-example'
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

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('table');
    }

    onSchemaValues(data) {
        this.data = data;
    }
}
