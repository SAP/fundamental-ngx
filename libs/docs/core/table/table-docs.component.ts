import { Component } from '@angular/core';
import { Schema, SchemaFactoryService } from '@fundamental-ngx/docs/schema';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const tableColumnSortPipeTs = 'sort.pipe.ts';
const tableColumnFilterPipeTs = 'filter.pipe.ts';
const tableFilterPipe = 'filter.pipe.ts';
const tableCdkScss = 'table-cdk-example.component.scss';
const tableHtmlSrc = 'table-example.component.html';
const tableTsSrc = 'table-example.component.ts';
const tableWithoutBordersHtmlSrc = 'table-without-borders-example.component.html';
const tableWithoutBordersTsSrc = 'table-without-borders-example.component.ts';
const tableColumnSortHtmlSrc = 'table-column-sorting-example.component.html';
const tableColumnSortTsSrc = 'table-column-sorting-example.component.ts';
const tableActivableHtmlSrc = 'table-activable-example.component.html';
const tableActivableTsSrc = 'table-activable-example.component.ts';
const tableToolbarHtmlSrc = 'table-toolbar-example.component.html';
const tableToolbarTsSrc = 'table-toolbar-example.component.ts';
const tableCheckHtml = 'table-checkboxes-example.component.html';
const tableCheckTs = 'table-checkboxes-example.component.ts';
const tableSemanticHtml = 'table-semantic-example.component.html';
const tableSemanticTs = 'table-semantic-example.component.ts';
const tablePaginationHtml = 'table-pagination-example.component.html';
const tablePaginationTs = 'table-pagination-example.component.ts';
const tableResponsiveHtml = 'table-responsive-example.component.html';
const tableResponsiveTs = 'table-responsive-example.component.ts';
const tableFooterHtml = 'table-footer-example.component.html';
const tableFooterTs = 'table-footer-example.component.ts';
const tableCdkHtml = 'table-cdk-example.component.html';
const tableCdkTs = 'table-cdk-example.component.ts';
const tablePopInHTs = 'table-popin-example/table-popin-example.component.ts';
const tablePopInHtml = 'table-popin-example/table-popin-example.component.html';
const tableCustomHtml = 'table-custom-columns-example/table-custom-columns-example.component.html';
const tableFocusableHtml = 'table-focusable-example/table-focusable-example.component.html';
const tableCustomTs = 'table-custom-columns-example/table-custom-columns-example.component.ts';
const tableDialogCustom = 'table-custom-columns-example/table-custom-dialog.component.ts';
const tableNavigatableRowHtml = 'table-navigatable-row-example.component.html';
const tableNavigatableRowTs = 'table-navigatable-row-example.component.ts';

@Component({
    selector: 'app-table',
    templateUrl: './table-docs.component.html',
    styleUrls: ['table-docs.component.scss']
})
export class TableDocsComponent {
    schema: Schema;
    data: any = {
        state: {
            disabled: false
        }
    };

    tableExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tableHtmlSrc),
            fileName: 'table-example'
        },
        {
            language: 'typescript',
            component: 'TableExampleComponent',
            code: getAssetFromModuleAssets(tableTsSrc),
            fileName: 'table-example'
        }
    ];

    tableWithoutBordersExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tableWithoutBordersHtmlSrc),
            fileName: 'table-without-borders-example'
        },
        {
            language: 'typescript',
            component: 'TableWithoutBordersExampleComponent',
            code: getAssetFromModuleAssets(tableWithoutBordersTsSrc),
            fileName: 'table-without-borders-example'
        }
    ];

    tableFooterExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tableFooterHtml),
            fileName: 'table-footer-example'
        },
        {
            language: 'typescript',
            component: 'TableFooterExampleComponent',
            code: getAssetFromModuleAssets(tableFooterTs),
            fileName: 'table-footer-example'
        }
    ];

    tablePopInExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tablePopInHtml),
            fileName: 'table-popin-example'
        },
        {
            language: 'typescript',
            component: 'TablePopinExampleComponent',
            code: getAssetFromModuleAssets(tablePopInHTs),
            fileName: 'table-popin-example'
        }
    ];

    tableNavigatableRowExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tableNavigatableRowHtml),
            fileName: 'table-navigatable-row-example'
        },
        {
            language: 'typescript',
            component: 'TableNavigatableRowExampleComponent',
            code: getAssetFromModuleAssets(tableNavigatableRowTs),
            fileName: 'table-navigatable-row-example'
        }
    ];

    tableCustomColumnsExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tableCustomHtml),
            fileName: 'table-custom-columns-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(tableCustomTs),
            fileName: 'table-custom-columns-example',
            component: 'TableCustomColumnsExampleComponent',
            name: 'Table Component'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(tableDialogCustom),
            fileName: 'table-custom-dialog',
            component: 'TableCustomDialogComponent',
            name: 'Dialog Component'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(tableFilterPipe, undefined, 'shared'),
            fileName: 'filter-pipe',
            component: 'FilterPipe',
            pipe: true,
            name: 'Filter Pipe'
        }
    ];

    tableColumnSortExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tableColumnSortHtmlSrc),
            fileName: 'table-column-sorting-example'
        },
        {
            language: 'typescript',
            component: 'TableColumnSortingExampleComponent',
            code: getAssetFromModuleAssets(tableColumnSortTsSrc),
            fileName: 'table-column-sorting-example'
        },
        {
            language: 'typescript',
            component: 'SortByPipe',
            code: getAssetFromModuleAssets(tableColumnSortPipeTs, undefined, 'shared'),
            pipe: true,
            fileName: 'table-example-sorting',
            name: 'Sort Pipe'
        },
        {
            language: 'typescript',
            component: 'FilterPipe',
            code: getAssetFromModuleAssets(tableColumnFilterPipeTs, undefined, 'shared'),
            pipe: true,
            fileName: 'table-example-filter',
            name: 'Filter Pipe'
        }
    ];

    tableActivableExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tableActivableHtmlSrc),
            fileName: 'table-activable-example'
        },
        {
            language: 'typescript',
            component: 'TableActivableExampleComponent',
            code: getAssetFromModuleAssets(tableActivableTsSrc),
            fileName: 'table-activable-example'
        }
    ];

    tableToolbarExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tableToolbarHtmlSrc),
            fileName: 'table-toolbar-example'
        },
        {
            language: 'typescript',
            component: 'TableToolbarExampleComponent',
            code: getAssetFromModuleAssets(tableToolbarTsSrc),
            fileName: 'table-toolbar-example'
        }
    ];

    tableCheckboxes: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tableCheckHtml),
            fileName: 'table-checkboxes-example'
        },
        {
            language: 'typescript',
            component: 'TableCheckboxesExampleComponent',
            code: getAssetFromModuleAssets(tableCheckTs),
            fileName: 'table-checkboxes-example'
        }
    ];

    tableSemantic: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tableSemanticHtml),
            fileName: 'table-semantic-example'
        },
        {
            language: 'typescript',
            component: 'TableSemanticExampleComponent',
            code: getAssetFromModuleAssets(tableSemanticTs),
            fileName: 'table-semantic-example'
        }
    ];

    tablePagination: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tablePaginationHtml),
            fileName: 'table-pagination-example'
        },
        {
            language: 'typescript',
            component: 'TablePaginationExampleComponent',
            code: getAssetFromModuleAssets(tablePaginationTs),
            fileName: 'table-pagination-example'
        }
    ];

    tableResponsive: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tableResponsiveHtml),
            fileName: 'table-responsive-example'
        },
        {
            language: 'typescript',
            component: 'TableResponsiveExampleComponent',
            code: getAssetFromModuleAssets(tableResponsiveTs),
            fileName: 'table-responsive-example'
        }
    ];

    tableCdk: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tableCdkHtml),
            fileName: 'table-cdk-example',
            scssFileCode: getAssetFromModuleAssets(tableCdkScss)
        },
        {
            language: 'typescript',
            component: 'TableCdkExampleComponent',
            code: getAssetFromModuleAssets(tableCdkTs),
            fileName: 'table-cdk-example'
        }
    ];

    tableFocusable: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tableFocusableHtml),
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
