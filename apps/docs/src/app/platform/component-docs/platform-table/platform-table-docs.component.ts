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

import platformTableDefaultSrc from '!./platform-table-examples/platform-table-default-example.component.html?raw';
import platformTableDefaultTsSrc from '!./platform-table-examples/platform-table-default-example.component.ts?raw';
import platformTableCustomColumnSrc from '!./platform-table-examples/platform-table-custom-column-example.component.html?raw';
import platformTableCustomColumnTsSrc from '!./platform-table-examples/platform-table-custom-column-example.component.ts?raw';
import platformTableCustomWidthSrc from '!./platform-table-examples/platform-table-custom-width-example.component.html?raw';
import platformTableCustomWidthTsSrc from '!./platform-table-examples/platform-table-custom-width-example.component.ts?raw';
import platformTableSingleRowSelectionSrc from '!./platform-table-examples/platform-table-single-row-selection-example.component.html?raw';
import platformTableSingleRowSelectionTsSrc from '!./platform-table-examples/platform-table-single-row-selection-example.component.ts?raw';
import platformTableMultipleRowSelectionSrc from '!./platform-table-examples/platform-table-multiple-row-selection-example.component.html?raw';
import platformTableMultipleRowSelectionTsSrc from '!./platform-table-examples/platform-table-multiple-row-selection-example.component.ts?raw';
import platformTableSortableSrc from '!./platform-table-examples/platform-table-sortable-example.component.html?raw';
import platformTableSortableTsSrc from '!./platform-table-examples/platform-table-sortable-example.component.ts?raw';
import platformTableGroupableSrc from '!./platform-table-examples/platform-table-groupable-example.component.html?raw';
import platformTableGroupableTsSrc from '!./platform-table-examples/platform-table-groupable-example.component.ts?raw';
import platformTableFilterableSrc from '!./platform-table-examples/platform-table-filterable-example.component.html?raw';
import platformTableFilterableTsSrc from '!./platform-table-examples/platform-table-filterable-example.component.ts?raw';
import platformTableFreezableSrc from '!./platform-table-examples/platform-table-freezable-example.component.html?raw';
import platformTableFreezableTsSrc from '!./platform-table-examples/platform-table-freezable-example.component.ts?raw';
import platformTableLoadingSrc from '!./platform-table-examples/platform-table-loading-example.component.html?raw';
import platformTableLoadingTsSrc from '!./platform-table-examples/platform-table-loading-example.component.ts?raw';
import platformTablePageScrollingSrc from '!./platform-table-examples/platform-table-page-scrolling-example.component.html?raw';
import platformTablePageScrollingTsSrc from '!./platform-table-examples/platform-table-page-scrolling-example.component.ts?raw';
import platformTableInitialStateSrc from '!./platform-table-examples/platform-table-initial-state-example.component.html?raw';
import platformTableInitialStateTsSrc from '!./platform-table-examples/platform-table-initial-state-example.component.ts?raw';
import platformTableP13ColumnSrc from '!./platform-table-examples/platform-table-p13-columns-example.component.html?raw';
import platformTableP13ColumnTsSrc from '!./platform-table-examples/platform-table-p13-columns-example.component.ts?raw';
import platformTableP13SortSrc from '!./platform-table-examples/platform-table-p13-sort-example.component.html?raw';
import platformTableP13SortTsSrc from '!./platform-table-examples/platform-table-p13-sort-example.component.ts?raw';
import platformTableP13FilterSrc from '!./platform-table-examples/platform-table-p13-filter-example.component.html?raw';
import platformTableP13FilterTsSrc from '!./platform-table-examples/platform-table-p13-filter-example.component.ts?raw';
import platformTableP13GroupSrc from '!./platform-table-examples/platform-table-p13-group-example.component.html?raw';
import platformTableP13GroupTsSrc from '!./platform-table-examples/platform-table-p13-group-example.component.ts?raw';
import platformTreeTableDefaultSrc from '!./platform-table-examples/platform-table-tree-example.component.html?raw';
import platformTreeTableDefaultTsSrc from '!./platform-table-examples/platform-table-tree-example.component.ts?raw';
import platformTableNavigatableRowSrc from '!./platform-table-examples/platform-table-navigatable-row-indicator-example.component.html?raw';
import platformTableNoOuterBordersSrc from '!./platform-table-examples/platform-table-navigatable-row-indicator-example.component.html?raw';
import platformTableNavigatableRowTsSrc from '!./platform-table-examples/platform-table-navigatable-row-indicator-example.component.ts?raw';
import platformTableNoOuterBordersTsSrc from '!./platform-table-examples/platform-table-navigatable-row-indicator-example.component.ts?raw';
import platformTableSemanticSrc from '!./platform-table-examples/platform-table-semantic-example.component.html?raw';
import platformTableSemanticTsSrc from '!./platform-table-examples/platform-table-semantic-example.component.ts?raw';
import platformTableRowClassSrc from '!./platform-table-examples/platform-table-row-class-example.component.html?raw';
import platformTableRowClassTsSrc from '!./platform-table-examples/platform-table-row-class-example.component.ts?raw';
import platformTableCustomNoDataMessageSrc from '!./platform-table-examples/platform-table-no-items-template-example.component.html?raw';
import platformTableCustomNoDataMessageTsSrc from '!./platform-table-examples/platform-table-no-items-template-example.component.ts?raw';
import platformTableWrappedTextSrc from '!./platform-table-examples/platform-table-wrap-example.component.html?raw';
import platformTableWrappedTextTsSrc from '!./platform-table-examples/platform-table-wrap-example.component.ts?raw';

import platformTableEditableRowsSrc from '!./platform-table-examples/editable-rows/platform-table-editable-rows-example.component.html?raw';
import platformTableEditableRowsTsSrc from '!./platform-table-examples/editable-rows/platform-table-editable-rows-example.component.ts?raw';

import platformResponsiveColumnsSrc from '!./platform-table-examples/platform-table-responsive-columns-example.component.html?raw';
import platformResponsiveColumnsTsSrc from '!./platform-table-examples/platform-table-responsive-columns-example.component.ts?raw';

import illustrationDialogNoMail from '!../../../../assets/images/sapIllus-Dialog-NoMail.svg?raw';

import { TableDataProviderExample } from './platform-table-examples/platform-table-data-provider-example';
import { ExampleItem } from './platform-table-examples/platform-table-data-items-example';
import { ContentDensityMode } from '@fundamental-ngx/core/content-density';

@Component({
    selector: 'fdp-table-docs',
    templateUrl: './platform-table-docs.component.html',
    providers: [RtlService]
})
export class PlatformTableDocsComponent {
    static schema: Schema = {
        properties: {
            table: {
                type: 'object',
                properties: {
                    contentDensity: {
                        type: 'string',
                        enum: [ContentDensityMode.COMPACT, ContentDensityMode.COZY, ContentDensityMode.CONDENSED]
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
                    noOuterBorders: {
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
            contentDensity: ContentDensityMode.COMPACT,
            selectionMode: 'none',
            freezeColumnsTo: '',
            noHorizontalBorders: false,
            noVerticalBorders: false,
            noBorders: false,
            noBodyBorders: false,
            semanticHighlighting: false,
            noOuterBorders: false,
            loading: false
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
            width: '200px'
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

    customWidthFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableCustomWidthSrc,
            fileName: 'platform-table-custom-width-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: platformTableCustomWidthTsSrc,
            fileName: 'platform-table-custom-width-example',
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

    rowClassTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableRowClassSrc,
            fileName: 'platform-table-row-class-example',
            name: 'platform-table-row-class-example.component.html'
        },
        {
            language: 'typescript',
            code: platformTableRowClassTsSrc,
            fileName: 'platform-table-row-class-example',
            component: 'PlatformTableRowClassExampleComponent',
            name: 'platform-table-row-class-example.component.ts'
        }
    ];

    noOuterBordersFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableNoOuterBordersSrc,
            fileName: 'platform-table-no-outer-borders-example',
            name: 'platform-table-no-outer-borders-example.component.html'
        },
        {
            language: 'typescript',
            code: platformTableNoOuterBordersTsSrc,
            fileName: 'platform-table-no-outer-borders-example',
            component: 'PlatformTableNoOuterBordersExampleComponent',
            name: 'platform-table-no-outer-borders-example.component.ts'
        }
    ];

    textWrapFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableWrappedTextSrc,
            fileName: 'platform-table-wrap-example',
            name: 'platform-table-wrap-example.component.html'
        },
        {
            language: 'typescript',
            code: platformTableWrappedTextTsSrc,
            fileName: 'platform-table-wrap-example',
            component: 'PlatformTableWrapExampleComponent',
            name: 'platform-table-wrap-example.component.ts'
        }
    ];

    editableRowsFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformTableEditableRowsSrc,
            fileName: 'platform-table-editable-rows-example',
            name: 'platform-table-editable-rows-example.component.html'
        },
        {
            language: 'typescript',
            code: platformTableEditableRowsTsSrc,
            fileName: 'platform-table-editable-rows-example',
            component: 'PlatformTableEditableRowsExampleComponent',
            name: 'platform-table-editable-rows-example.component.ts'
        }
    ];

    responsiveColumnsFiles: ExampleFile[] = [
        {
            language: 'html',
            code: platformResponsiveColumnsSrc,
            fileName: 'platform-table-responsive-columns-example',
            name: 'platform-table-responsive-columns-example.component.html'
        },
        {
            language: 'typescript',
            code: platformResponsiveColumnsTsSrc,
            fileName: 'platform-table-responsive-columns-example',
            component: 'PlatformTableResponsiveColumnsExampleComponent',
            name: 'platform-table-responsive-columns-example.component.ts'
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
