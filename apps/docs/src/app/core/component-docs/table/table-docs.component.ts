import { Component } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as tableHtmlSrc from '!raw-loader!./examples/table-example.component.html';
import * as tableTsSrc from '!raw-loader!./examples/table-example.component.ts';
import * as tableWithoutBordersHtmlSrc from '!raw-loader!./examples/table-without-borders-example.component.html';
import * as tableWithoutBordersTsSrc from '!raw-loader!./examples/table-without-borders-example.component.ts';
import * as tableColumnSortHtmlSrc from '!raw-loader!./examples/table-column-sorting-example.component.html';
import * as tableColumnSortTsSrc from '!raw-loader!./examples/table-column-sorting-example.component.ts';
import * as tableColumnSortPipeTs from '!raw-loader!../../../documentation/core-helpers/pipes/sort.pipe.ts';
import * as tableColumnFilterPipeTs from '!raw-loader!../../../documentation/core-helpers/pipes/filter.pipe.ts';
import * as tableActivableHtmlSrc from '!raw-loader!./examples/table-activable-example.component.html';
import * as tableActivableTsSrc from '!raw-loader!./examples/table-activable-example.component.ts';
import * as tableToolbarHtmlSrc from '!raw-loader!./examples/table-toolbar-example.component.html';
import * as tableToolbarTsSrc from '!raw-loader!./examples/table-toolbar-example.component.ts';
import * as tableCheckHtml from '!raw-loader!./examples/table-checkboxes-example.component.html';
import * as tableCheckTs from '!raw-loader!./examples/table-checkboxes-example.component.ts';
import * as tableSemanticHtml from '!raw-loader!./examples/table-semantic-example.component.html';
import * as tableSemanticTs from '!raw-loader!./examples/table-semantic-example.component.ts';
import * as tablePaginationHtml from '!raw-loader!./examples/table-pagination-example.component.html';
import * as tablePaginationTs from '!raw-loader!./examples/table-pagination-example.component.ts';
import * as tableFooterHtml from '!raw-loader!./examples/table-footer-example.component.html';
import * as tableFooterTs from '!raw-loader!./examples/table-footer-example.component.ts';
import * as tableCdkHtml from '!raw-loader!./examples/table-cdk-example.component.html';
import * as tableCdkTs from '!raw-loader!./examples/table-cdk-example.component.ts';
import * as tableCdkScss from '!raw-loader!./examples/table-cdk-example.component.scss';
import * as tablePopInHTs from '!raw-loader!./examples/table-popin-example/table-popin-example.component.ts';
import * as tablePopInHtml from '!raw-loader!./examples/table-popin-example/table-popin-example.component.html';
import * as tableCustomHtml from '!raw-loader!./examples/table-custom-columns-example/table-custom-columns-example.component.html';
import * as tableFocusableHtml from '!raw-loader!./examples/table-focusable-example/table-focusable-example.component.html';
import * as tableCustomTs from '!raw-loader!./examples/table-custom-columns-example/table-custom-columns-example.component.ts';
import * as tableDialogCustom from '!raw-loader!./examples/table-custom-columns-example/table-custom-dialog.component.ts';
import * as tableNavigatableRowHtml from '!raw-loader!./examples/table-navigatable-row-example.component.html';
import * as tableNavigatableRowTs from '!raw-loader!./examples/table-navigatable-row-example.component.ts';
import * as tableFilterPipe from '!raw-loader!../../../documentation/core-helpers/pipes/filter.pipe.ts';
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

    tableNavigatableRowExample: ExampleFile[] = [
        {
            language: 'html',
            code: tableNavigatableRowHtml,
            fileName: 'table-navigatable-row-example'
        },
        {
            language: 'typescript',
            component: 'TableNavigatableRowExampleComponent',
            code: tableNavigatableRowTs,
            fileName: 'table-navigatable-row-example'
        }
    ];

    tableCustomColumnsExample: ExampleFile[] = [
        {
            language: 'html',
            code: tableCustomHtml,
            fileName: 'table-custom-columns-example'
        },
        {
            language: 'typescript',
            code: tableCustomTs,
            fileName: 'table-custom-columns-example',
            component: 'TableCustomColumnsExampleComponent',
            name: 'Table Component'
        },
        {
            language: 'typescript',
            code: tableDialogCustom,
            fileName: 'table-custom-dialog',
            component: 'TableCustomDialogComponent',
            name: 'Dialog Component'
        },
        {
            language: 'typescript',
            code: tableFilterPipe,
            fileName: 'filter-pipe',
            component: 'FilterPipe',
            pipe: true,
            name: 'Filter Pipe'
        }
    ];

    tableColumnSortExample: ExampleFile[] = [
        {
            language: 'html',
            code: tableColumnSortHtmlSrc,
            fileName: 'table-column-sorting-example'
        },
        {
            language: 'typescript',
            component: 'TableColumnSortingExampleComponent',
            code: tableColumnSortTsSrc,
            fileName: 'table-column-sorting-example'
        },
        {
            language: 'typescript',
            component: 'SortPipe',
            code: tableColumnSortPipeTs,
            pipe: true,
            fileName: 'table-example-sorting',
            name: 'Sort Pipe'
        },
        {
            language: 'typescript',
            component: 'FilterPipe',
            code: tableColumnFilterPipeTs,
            pipe: true,
            fileName: 'table-example-filter',
            name: 'Filter Pipe'
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

    tableToolbarExample: ExampleFile[] = [
        {
            language: 'html',
            code: tableToolbarHtmlSrc,
            fileName: 'table-toolbar-example'
        },
        {
            language: 'typescript',
            component: 'TableToolbarExampleComponent',
            code: tableToolbarTsSrc,
            fileName: 'table-toolbar-example'
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

    tablePagination: ExampleFile[] = [
        {
            language: 'html',
            code: tablePaginationHtml,
            fileName: 'table-pagination-example'
        },
        {
            language: 'typescript',
            component: 'TablePaginationExampleComponent',
            code: tablePaginationTs,
            fileName: 'table-pagination-example'
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

    tableFocusable: ExampleFile[] = [
        {
            language: 'html',
            code: tableFocusableHtml,
            fileName: 'table-focusable-example'
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('table');
    }

    onSchemaValues(data): void {
        this.data = data;
    }
}
