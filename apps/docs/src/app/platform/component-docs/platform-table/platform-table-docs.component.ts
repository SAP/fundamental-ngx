import { ChangeDetectorRef, Component } from '@angular/core';

import { RtlService } from '@fundamental-ngx/core/utils';
import { DatetimeAdapter } from '@fundamental-ngx/core/datetime';
import {
    TableColumnFreezeEvent,
    TableDataSource,
    TableFilterChangeEvent,
    TableGroupChangeEvent,
    TableRowSelectionChangeEvent,
    TableSortChangeEvent
} from '@fundamental-ngx/platform/table';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

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
import * as platformTableLoadingSrc from '!raw-loader!./platform-table-examples/platform-table-loading-example.component.html';
import * as platformTableLoadingTsSrc from '!raw-loader!./platform-table-examples/platform-table-loading-example.component.ts';
import * as platformTablePageScrollingSrc from '!raw-loader!./platform-table-examples/platform-table-page-scrolling-example.component.html';
import * as platformTablePageScrollingTsSrc from '!raw-loader!./platform-table-examples/platform-table-page-scrolling-example.component.ts';
import * as platformTableInitialStateSrc from '!raw-loader!./platform-table-examples/platform-table-initial-state-example.component.html';
import * as platformTableInitialStateTsSrc from '!raw-loader!./platform-table-examples/platform-table-initial-state-example.component.ts';
import * as platformTableP13ColumnSrc from '!raw-loader!./platform-table-examples/platform-table-p13-columns-example.component.html';
import * as platformTableP13ColumnTsSrc from '!raw-loader!./platform-table-examples/platform-table-p13-columns-example.component.ts';
import * as platformTableP13SortSrc from '!raw-loader!./platform-table-examples/platform-table-p13-sort-example.component.html';
import * as platformTableP13SortTsSrc from '!raw-loader!./platform-table-examples/platform-table-p13-sort-example.component.ts';
import * as platformTableP13FilterSrc from '!raw-loader!./platform-table-examples/platform-table-p13-filter-example.component.html';
import * as platformTableP13FilterTsSrc from '!raw-loader!./platform-table-examples/platform-table-p13-filter-example.component.ts';
import * as platformTableP13GroupSrc from '!raw-loader!./platform-table-examples/platform-table-p13-group-example.component.html';
import * as platformTableP13GroupTsSrc from '!raw-loader!./platform-table-examples/platform-table-p13-group-example.component.ts';
import * as platformTreeTableDefaultSrc from '!raw-loader!./platform-table-examples/platform-table-tree-example.component.html';
import * as platformTreeTableDefaultTsSrc from '!raw-loader!./platform-table-examples/platform-table-tree-example.component.ts';
import * as platformTableNavigatableRowSrc from '!raw-loader!./platform-table-examples/platform-table-navigatable-row-indicator-example.component.html';
import * as platformTableNavigatableRowTsSrc from '!raw-loader!./platform-table-examples/platform-table-navigatable-row-indicator-example.component.ts';
import * as platformTableSemanticSrc from '!raw-loader!./platform-table-examples/platform-table-semantic-example.component.html';
import * as platformTableSemanticTsSrc from '!raw-loader!./platform-table-examples/platform-table-semantic-example.component.ts';

import * as platformTableCustomNoDataMessageSrc from '!raw-loader!./platform-table-examples/platform-table-no-items-template-example.component.html';
import * as platformTableCustomNoDataMessageTsSrc from '!raw-loader!./platform-table-examples/platform-table-no-items-template-example.component.ts';
import * as illustrationDialogNoMail from '!raw-loader!../../../../assets/images/sapIllus-Dialog-NoMail.svg';

import { TableDataProviderExample } from './platform-table-examples/platform-table-data-provider-example';
import { ExampleItem } from './platform-table-examples/platform-table-data-items-example';

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
                        enum: ['none', 'single', 'multiple']
                    },
                    freezeColumnsTo: {
                        type: 'string',
                        enum: ['', 'name', 'description', 'price.value']
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
                    loading: {
                        type: 'boolean'
                    },
                    semanticHighlighting: {
                        type: 'boolean'
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
                    },
                    groupable: {
                        type: 'boolean'
                    },
                    width: {
                        type: 'string'
                    }
                }
            }
        },
        type: 'object'
    };

    schema: Schema;

    data: any = {
        table: {
            contentDensity: 'compact',
            selectionMode: 'none',
            freezeColumnsTo: '',
            noHorizontalBorders: false,
            noVerticalBorders: false,
            noBorders: false,
            noBodyBorders: false,
            loading: false,
            semanticHighlighting: false
        },
        'table-toolbar': {
            title: 'Order Line Items',
            hideItemCount: false
        },
        'first-column': {
            align: 'start',
            sortable: true,
            filterable: true,
            groupable: true,
            width: '100px'
        }
    };

    defaultTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableDefaultSrc,
            fileName: 'platform-table-default-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: platformTableDefaultTsSrc,
            fileName: 'platform-table-default-example',
            component: 'PlatformTableDefaultExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    customColumnTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableCustomColumnSrc,
            fileName: 'platform-table-custom-column-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: platformTableCustomColumnTsSrc,
            fileName: 'platform-table-custom-column-example',
            component: 'PlatformTableCustomColumnExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    singleRowSelectionFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableSingleRowSelectionSrc,
            fileName: 'platform-table-single-row-selection-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: platformTableSingleRowSelectionTsSrc,
            fileName: 'platform-table-single-row-selection-example',
            component: 'PlatformTableSingleRowSelectionExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    multipleRowSelectionFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableMultipleRowSelectionSrc,
            fileName: 'platform-table-multiple-row-selection-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: platformTableMultipleRowSelectionTsSrc,
            fileName: 'platform-table-multiple-row-selection-example',
            component: 'PlatformTableMultipleRowSelectionExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    sortableTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableSortableSrc,
            fileName: 'platform-table-sortable-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: platformTableSortableTsSrc,
            fileName: 'platform-table-sortable-example',
            component: 'PlatformTableSortableExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    filterableTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableFilterableSrc,
            fileName: 'platform-table-filterable-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: platformTableFilterableTsSrc,
            fileName: 'platform-table-filterable-example',
            component: 'PlatformTableFilterableExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    groupableTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableGroupableSrc,
            fileName: 'platform-table-groupable-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: platformTableGroupableTsSrc,
            fileName: 'platform-table-groupable-example',
            component: 'PlatformTableGroupableExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    freezableTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableFreezableSrc,
            fileName: 'platform-table-freezable-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: platformTableFreezableTsSrc,
            fileName: 'platform-table-freezable-example',
            component: 'PlatformTableFreezableExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    loadingTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableLoadingSrc,
            fileName: 'platform-table-loading-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: platformTableLoadingTsSrc,
            fileName: 'platform-table-loading-example',
            component: 'PlatformTableLoadingExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    pageScrollingTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTablePageScrollingSrc,
            fileName: 'platform-table-page-scrolling-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: platformTablePageScrollingTsSrc,
            fileName: 'platform-table-page-scrolling-example',
            component: 'PlatformTablePageScrollingExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    initialStateFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableInitialStateSrc,
            fileName: 'platform-table-initial-state-example',
            name: 'platform-table-initial-state-example.component.html'
        },
        {
            language: 'typescript',
            code: platformTableInitialStateTsSrc,
            fileName: 'platform-table-initial-state-example',
            component: 'PlatformTableInitialStateExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    p13ColumnsFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableP13ColumnSrc,
            fileName: 'platform-table-p13-columns-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: platformTableP13ColumnTsSrc,
            fileName: 'platform-table-p13-columns-example',
            component: 'PlatformTableP13ColumnsExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    p13SortFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableP13SortSrc,
            fileName: 'platform-table-p13-sort-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: platformTableP13SortTsSrc,
            fileName: 'platform-table-p13-sort-example',
            component: 'PlatformTableP13SortExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    p13FilterFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableP13FilterSrc,
            fileName: 'platform-table-p13-filter-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: platformTableP13FilterTsSrc,
            fileName: 'platform-table-p13-filter-example',
            component: 'PlatformTableP13FilterExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    p13GroupFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableP13GroupSrc,
            fileName: 'platform-table-p13-group-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: platformTableP13GroupTsSrc,
            fileName: 'platform-table-p13-group-example',
            component: 'PlatformTableP13GroupExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    treeTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTreeTableDefaultSrc,
            fileName: 'platform-table-tree-example',
            name: 'platform-table-tree-example.component.html'
        },
        {
            language: 'typescript',
            code: platformTreeTableDefaultTsSrc,
            fileName: 'platform-table-tree-example',
            component: 'PlatformTableTreeExampleComponent',
            name: 'platform-table-tree-example.component.ts'
        }
    ];

    navitableRowFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableNavigatableRowSrc,
            fileName: 'platform-table-navigatable-row-indicator-example',
            name: 'platform-table-navigatable-row-indicator-example.component.html'
        },
        {
            language: 'typescript',
            code: platformTableNavigatableRowTsSrc,
            fileName: 'platform-table-navigatable-row-indicator-example',
            component: 'PlatformTableNavigatableRowIndicatorExampleComponent',
            name: 'platform-table-navigatable-row-indicator-example.component.ts'
        }
    ];

    noDataCustomMessageFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableCustomNoDataMessageSrc,
            fileName: 'platform-table-no-items-template-example',
            name: 'platform-table-no-items-template-example.component.html'
        },
        {
            language: 'typescript',
            code: platformTableCustomNoDataMessageTsSrc,
            fileName: 'platform-table-no-items-template-example',
            component: 'PlatformTableNoItemsTemplateExampleComponent',
            name: 'platform-table-no-items-template-example.component.ts'
        },
        {
            language: 'svg',
            code: illustrationDialogNoMail,
            fileName: 'sapIllus-Dialog-NoMail',
            name: 'sapIllus-Dialog-NoMail.svg',
            path: 'src/assets/images'
        }
    ];

    semanticFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableSemanticSrc,
            fileName: 'platform-table-semantic-example',
            name: 'platform-table-semantic-example.component.html'
        },
        {
            language: 'typescript',
            code: platformTableSemanticTsSrc,
            fileName: 'platform-table-semantic-example',
            component: 'PlatformTableSemanticExampleComponent',
            name: 'platform-table-semantic-example.component.ts'
        }
    ];

    dataSource: TableDataSource<ExampleItem>;

    constructor(
        private schemaFactory: SchemaFactoryService,
        private _cd: ChangeDetectorRef,
        datetimeAdapter: DatetimeAdapter<any>
    ) {
        this.schema = this.schemaFactory.getComponent('fdp-table');
        this.dataSource = new TableDataSource(new TableDataProviderExample(datetimeAdapter));
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
