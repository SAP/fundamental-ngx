import { Component } from '@angular/core';
import { Schema, SchemaFactoryService } from '@fundamental-ngx/docs/schema';

import { RouterLink } from '@angular/router';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { TableLoadingExampleComponent } from './examples/loading/table-loading-example.component';
import { NoDataExampleComponent } from './examples/no-data/no-data-example.component';
import { TableActivableExampleComponent } from './examples/table-activable-example.component';
import { TableCdkExampleComponent } from './examples/table-cdk-example.component';
import { TableCheckboxesExampleComponent } from './examples/table-checkboxes-example.component';
import { TableColumnSortingExampleComponent } from './examples/table-column-sorting-example.component';
import { TableCustomColumnsExampleComponent } from './examples/table-custom-columns-example/table-custom-columns-example.component';
import { TableExampleComponent } from './examples/table-example.component';
import { TableFixedExampleComponent } from './examples/table-fixed-example.component';
import { TableFocusableExampleComponent } from './examples/table-focusable-example/table-focusable-example.component';
import { TableFooterExampleComponent } from './examples/table-footer-example.component';
import { TableNavigatableRowExampleComponent } from './examples/table-navigatable-row-example.component';
import { TablePageScrollExampleComponent } from './examples/table-page-scroll-example.component';
import { TablePaginationExampleComponent } from './examples/table-pagination-example.component';
import { TablePopinExampleComponent } from './examples/table-popin-example/table-popin-example.component';
import { TableResponsiveExampleComponent } from './examples/table-responsive-example.component';
import { TableSemanticExampleComponent } from './examples/table-semantic-example.component';
import { TableToolbarExampleComponent } from './examples/table-toolbar-example.component';
import { TableWithoutBordersExampleComponent } from './examples/table-without-borders-example.component';

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
const tableFocusableTs = 'table-focusable-example/table-focusable-example.component.ts';
const tableCustomTs = 'table-custom-columns-example/table-custom-columns-example.component.ts';
const tableDialogCustom = 'table-custom-columns-example/table-custom-dialog.component.ts';
const tableNavigatableRowHtml = 'table-navigatable-row-example.component.html';
const tableNavigatableRowTs = 'table-navigatable-row-example.component.ts';
const tableLoadingHtmlSrc = 'loading/table-loading-example.component.html';
const tableLoadingTs = 'loading/table-loading-example.component.ts';
const tableFixedTs = 'table-fixed-example.component.ts';
const tableFixedHtml = 'table-fixed-example.component.html';
const tablePageScrollHtml = 'table-page-scroll-example.component.html';
const tablePageScrollTs = 'table-page-scroll-example.component.ts';
const noDataExampleHtml = 'no-data/no-data-example.component.html';
const noDataExampleTs = 'no-data/no-data-example.component.ts';

@Component({
    selector: 'app-table',
    templateUrl: './table-docs.component.html',
    styleUrls: ['table-docs.component.scss'],
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        TableExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        TableToolbarExampleComponent,
        TableWithoutBordersExampleComponent,
        TableFooterExampleComponent,
        TableCustomColumnsExampleComponent,
        TableColumnSortingExampleComponent,
        SeparatorComponent,
        TableActivableExampleComponent,
        TableFocusableExampleComponent,
        TableCheckboxesExampleComponent,
        TableSemanticExampleComponent,
        TableCdkExampleComponent,
        TablePopinExampleComponent,
        TableNavigatableRowExampleComponent,
        TablePaginationExampleComponent,
        TableFixedExampleComponent,
        TableResponsiveExampleComponent,
        RouterLink,
        TableLoadingExampleComponent,
        TablePageScrollExampleComponent,
        NoDataExampleComponent
    ]
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
        },
        {
            language: 'typescript',
            component: 'TableFocusableExampleComponent',
            code: getAssetFromModuleAssets(tableFocusableTs),
            fileName: 'table-focusable-example'
        }
    ];

    tableLoading: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tableLoadingHtmlSrc),
            fileName: 'table-loading-example'
        },
        {
            language: 'typescript',
            component: 'TableLoadingExampleComponent',
            code: getAssetFromModuleAssets(tableLoadingTs),
            fileName: 'table-loading-example'
        }
    ];

    tableFixed: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tableFixedHtml),
            fileName: 'table-fixed-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(tableFixedTs),
            fileName: 'table-fixed-example',
            component: 'TableFixedExampleComponent'
        }
    ];

    tablePageScroll: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(tablePageScrollHtml),
            fileName: 'table-page-scroll-example'
        },
        {
            language: 'typescript',
            component: 'TablePageScrollExampleComponent',
            code: getAssetFromModuleAssets(tablePageScrollTs),
            fileName: 'table-page-scroll-example'
        }
    ];

    noData: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(noDataExampleHtml),
            fileName: 'no-data-example'
        },
        {
            language: 'typescript',
            component: 'NoDataExampleComponent',
            code: getAssetFromModuleAssets(noDataExampleTs),
            fileName: 'no-data-example'
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('table');
    }

    onSchemaValues(data): void {
        this.data = data;
    }
}
