import { Component } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import tableHtmlSrc from '!./examples/table-example.component.html?raw';
import tableTsSrc from '!./examples/table-example.component.ts?raw';
import tableWithoutBordersHtmlSrc from '!./examples/table-without-borders-example.component.html?raw';
import tableWithoutBordersTsSrc from '!./examples/table-without-borders-example.component.ts?raw';
import tableColumnSortHtmlSrc from '!./examples/table-column-sorting-example.component.html?raw';
import tableColumnSortTsSrc from '!./examples/table-column-sorting-example.component.ts?raw';
import tableColumnSortPipeTs from '!../../../documentation/core-helpers/pipes/sort.pipe.ts?raw';
import tableColumnFilterPipeTs from '!../../../documentation/core-helpers/pipes/filter.pipe.ts?raw';
import tableActivableHtmlSrc from '!./examples/table-activable-example.component.html?raw';
import tableActivableTsSrc from '!./examples/table-activable-example.component.ts?raw';
import tableToolbarHtmlSrc from '!./examples/table-toolbar-example.component.html?raw';
import tableToolbarTsSrc from '!./examples/table-toolbar-example.component.ts?raw';
import tableCheckHtml from '!./examples/table-checkboxes-example.component.html?raw';
import tableCheckTs from '!./examples/table-checkboxes-example.component.ts?raw';
import tableSemanticHtml from '!./examples/table-semantic-example.component.html?raw';
import tableSemanticTs from '!./examples/table-semantic-example.component.ts?raw';
import tablePaginationHtml from '!./examples/table-pagination-example.component.html?raw';
import tablePaginationTs from '!./examples/table-pagination-example.component.ts?raw';
import tableResponsiveHtml from '!./examples/table-responsive-example.component.html?raw';
import tableResponsiveTs from '!./examples/table-responsive-example.component.ts?raw';
import tableFooterHtml from '!./examples/table-footer-example.component.html?raw';
import tableFooterTs from '!./examples/table-footer-example.component.ts?raw';
import tableCdkHtml from '!./examples/table-cdk-example.component.html?raw';
import tableCdkTs from '!./examples/table-cdk-example.component.ts?raw';
import tableCdkScss from '!./examples/table-cdk-example.component.scss?raw';
import tablePopInHTs from '!./examples/table-popin-example/table-popin-example.component.ts?raw';
import tablePopInHtml from '!./examples/table-popin-example/table-popin-example.component.html?raw';
import tableCustomHtml from '!./examples/table-custom-columns-example/table-custom-columns-example.component.html?raw';
import tableFocusableHtml from '!./examples/table-focusable-example/table-focusable-example.component.html?raw';
import tableCustomTs from '!./examples/table-custom-columns-example/table-custom-columns-example.component.ts?raw';
import tableDialogCustom from '!./examples/table-custom-columns-example/table-custom-dialog.component.ts?raw';
import tableNavigatableRowHtml from '!./examples/table-navigatable-row-example.component.html?raw';
import tableNavigatableRowTs from '!./examples/table-navigatable-row-example.component.ts?raw';
import tableFilterPipe from '!../../../documentation/core-helpers/pipes/filter.pipe.ts?raw';
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
            component: 'TableWithoutBordersExampleComponent',
            code: tableWithoutBordersTsSrc,
            fileName: 'table-without-borders-example'
        }
    ];

    tableFooterExample: ExampleFile[] = [
        {
            language: 'html',
            code: tableFooterHtml,
            fileName: 'table-footer-example'
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
            component: 'SortByPipe',
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

    tableResponsive: ExampleFile[] = [
        {
            language: 'html',
            code: tableResponsiveHtml,
            fileName: 'table-responsive-example'
        },
        {
            language: 'typescript',
            component: 'TableResponsiveExampleComponent',
            code: tableResponsiveTs,
            fileName: 'table-responsive-example'
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
