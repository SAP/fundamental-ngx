import { ChangeDetectorRef, Component } from '@angular/core';

import { RtlService } from '@fundamental-ngx/cdk/utils';
import { DatetimeAdapter } from '@fundamental-ngx/core/datetime';
import {
    TableColumnFreezeEvent,
    TableDataSource,
    TableFilterChangeEvent,
    TableGroupChangeEvent,
    TableRowSelectionChangeEvent,
    TableSortChangeEvent
} from '@fundamental-ngx/platform/table';

import { ExampleFile, getAsset, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { Schema, SchemaFactoryService } from '@fundamental-ngx/docs/schema';

const platformTableDefaultSrc = 'platform-table-default-example.component.html';
const platformTableDefaultTsSrc = 'platform-table-default-example.component.ts';
const platformTableCustomColumnSrc = 'platform-table-custom-column-example.component.html';
const platformTableCustomColumnTsSrc = 'platform-table-custom-column-example.component.ts';
const platformTableCustomWidthSrc = 'platform-table-custom-width-example.component.html';
const platformTableCustomWidthTsSrc = 'platform-table-custom-width-example.component.ts';
const platformTableSingleRowSelectionSrc = 'platform-table-single-row-selection-example.component.html';
const platformTableSingleRowSelectionTsSrc = 'platform-table-single-row-selection-example.component.ts';
const platformTableMultipleRowSelectionSrc = 'platform-table-multiple-row-selection-example.component.html';
const platformTableMultipleRowSelectionTsSrc = 'platform-table-multiple-row-selection-example.component.ts';
const platformTableSortableSrc = 'platform-table-sortable-example.component.html';
const platformTableSortableTsSrc = 'platform-table-sortable-example.component.ts';
const platformTableGroupableSrc = 'platform-table-groupable-example.component.html';
const platformTableGroupableTsSrc = 'platform-table-groupable-example.component.ts';
const platformTableFilterableSrc = 'platform-table-filterable-example.component.html';
const platformTableFilterableTsSrc = 'platform-table-filterable-example.component.ts';
const platformTableFreezableSrc = 'platform-table-freezable-example.component.html';
const platformTableFreezableTsSrc = 'platform-table-freezable-example.component.ts';
const platformTableLoadingSrc = 'platform-table-loading-example.component.html';
const platformTableLoadingTsSrc = 'platform-table-loading-example.component.ts';
const platformTablePageScrollingSrc = 'platform-table-page-scrolling-example.component.html';
const platformTablePageScrollingTsSrc = 'platform-table-page-scrolling-example.component.ts';
const platformTableInitialStateSrc = 'platform-table-initial-state-example.component.html';
const platformTableInitialStateTsSrc = 'platform-table-initial-state-example.component.ts';
const platformTableP13ColumnSrc = 'platform-table-p13-columns-example.component.html';
const platformTableP13ColumnTsSrc = 'platform-table-p13-columns-example.component.ts';
const platformTableP13SortSrc = 'platform-table-p13-sort-example.component.html';
const platformTableP13SortTsSrc = 'platform-table-p13-sort-example.component.ts';
const platformTableP13FilterSrc = 'platform-table-p13-filter-example.component.html';
const platformTableP13FilterTsSrc = 'platform-table-p13-filter-example.component.ts';
const platformTableP13GroupSrc = 'platform-table-p13-group-example.component.html';
const platformTableP13GroupTsSrc = 'platform-table-p13-group-example.component.ts';
const platformTreeTableDefaultSrc = 'platform-table-tree-example.component.html';
const platformTreeTableDefaultTsSrc = 'platform-table-tree-example.component.ts';
const platformTableNavigatableRowSrc = 'platform-table-navigatable-row-indicator-example.component.html';
const platformTableNoOuterBordersSrc = 'platform-table-navigatable-row-indicator-example.component.html';
const platformTableNavigatableRowTsSrc = 'platform-table-navigatable-row-indicator-example.component.ts';
const platformTableNoOuterBordersTsSrc = 'platform-table-navigatable-row-indicator-example.component.ts';
const platformTableSemanticSrc = 'platform-table-semantic-example.component.html';
const platformTableSemanticTsSrc = 'platform-table-semantic-example.component.ts';
const platformTableRowClassSrc = 'platform-table-row-class-example.component.html';
const platformTableRowClassTsSrc = 'platform-table-row-class-example.component.ts';
const platformTableCustomNoDataMessageSrc = 'platform-table-no-items-template-example.component.html';
const platformTableCustomNoDataMessageTsSrc = 'platform-table-no-items-template-example.component.ts';
const platformTableWrappedTextSrc = 'platform-table-wrap-example.component.html';
const platformTableWrappedTextTsSrc = 'platform-table-wrap-example.component.ts';

const platformTableEditableRowsSrc = 'editable-rows/platform-table-editable-rows-example.component.html';
const platformTableEditableRowsTsSrc = 'editable-rows/platform-table-editable-rows-example.component.ts';

const platformResponsiveColumnsSrc = 'platform-table-responsive-columns-example.component.html';
const platformResponsiveColumnsTsSrc = 'platform-table-responsive-columns-example.component.ts';

const platformInitialLoadingSrc = 'initial-loading/platform-table-initial-loading-example.component.html';
const platformInitialLoadingTsSrc = 'initial-loading/platform-table-initial-loading-example.component.ts';

const platformTableNgForSrc = 'platform-table-columns-ngfor-example.component.html';
const platformTableNgForTsSrc = 'platform-table-columns-ngfor-example.component.ts';

const illustrationDialogNoMail = '/assets/images/sapIllus-Dialog-NoMail.svg';

import { TableDataProviderExample } from './examples/platform-table-data-provider-example';
import { ExampleItem } from './examples/platform-table-data-items-example';
import { ContentDensityMode } from '@fundamental-ngx/core/content-density';

@Component({
    selector: 'fdp-table-docs',
    templateUrl: './platform-table-docs.component.html',
    providers: [RtlService]
})
export class PlatformTableDocsComponent {
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
            code: getAssetFromModuleAssets(platformTableDefaultSrc),
            fileName: 'platform-table-default-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableDefaultTsSrc),
            fileName: 'platform-table-default-example',
            component: 'PlatformTableDefaultExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    customColumnTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableCustomColumnSrc),
            fileName: 'platform-table-custom-column-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableCustomColumnTsSrc),
            fileName: 'platform-table-custom-column-example',
            component: 'PlatformTableCustomColumnExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    customWidthFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableCustomWidthSrc),
            fileName: 'platform-table-custom-width-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableCustomWidthTsSrc),
            fileName: 'platform-table-custom-width-example',
            component: 'PlatformTableCustomColumnExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    singleRowSelectionFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableSingleRowSelectionSrc),
            fileName: 'platform-table-single-row-selection-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableSingleRowSelectionTsSrc),
            fileName: 'platform-table-single-row-selection-example',
            component: 'PlatformTableSingleRowSelectionExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    multipleRowSelectionFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableMultipleRowSelectionSrc),
            fileName: 'platform-table-multiple-row-selection-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableMultipleRowSelectionTsSrc),
            fileName: 'platform-table-multiple-row-selection-example',
            component: 'PlatformTableMultipleRowSelectionExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    sortableTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableSortableSrc),
            fileName: 'platform-table-sortable-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableSortableTsSrc),
            fileName: 'platform-table-sortable-example',
            component: 'PlatformTableSortableExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    filterableTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableFilterableSrc),
            fileName: 'platform-table-filterable-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableFilterableTsSrc),
            fileName: 'platform-table-filterable-example',
            component: 'PlatformTableFilterableExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    groupableTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableGroupableSrc),
            fileName: 'platform-table-groupable-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableGroupableTsSrc),
            fileName: 'platform-table-groupable-example',
            component: 'PlatformTableGroupableExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    freezableTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableFreezableSrc),
            fileName: 'platform-table-freezable-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableFreezableTsSrc),
            fileName: 'platform-table-freezable-example',
            component: 'PlatformTableFreezableExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    loadingTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableLoadingSrc),
            fileName: 'platform-table-loading-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableLoadingTsSrc),
            fileName: 'platform-table-loading-example',
            component: 'PlatformTableLoadingExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    pageScrollingTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTablePageScrollingSrc),
            fileName: 'platform-table-page-scrolling-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTablePageScrollingTsSrc),
            fileName: 'platform-table-page-scrolling-example',
            component: 'PlatformTablePageScrollingExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    initialStateFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableInitialStateSrc),
            fileName: 'platform-table-initial-state-example',
            name: 'platform-table-initial-state-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableInitialStateTsSrc),
            fileName: 'platform-table-initial-state-example',
            component: 'PlatformTableInitialStateExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    p13ColumnsFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableP13ColumnSrc),
            fileName: 'platform-table-p13-columns-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableP13ColumnTsSrc),
            fileName: 'platform-table-p13-columns-example',
            component: 'PlatformTableP13ColumnsExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    p13SortFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableP13SortSrc),
            fileName: 'platform-table-p13-sort-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableP13SortTsSrc),
            fileName: 'platform-table-p13-sort-example',
            component: 'PlatformTableP13SortExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    p13FilterFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableP13FilterSrc),
            fileName: 'platform-table-p13-filter-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableP13FilterTsSrc),
            fileName: 'platform-table-p13-filter-example',
            component: 'PlatformTableP13FilterExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    p13GroupFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableP13GroupSrc),
            fileName: 'platform-table-p13-group-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableP13GroupTsSrc),
            fileName: 'platform-table-p13-group-example',
            component: 'PlatformTableP13GroupExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    treeTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTreeTableDefaultSrc),
            fileName: 'platform-table-tree-example',
            name: 'platform-table-tree-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTreeTableDefaultTsSrc),
            fileName: 'platform-table-tree-example',
            component: 'PlatformTableTreeExampleComponent',
            name: 'platform-table-tree-example.component.ts'
        }
    ];

    navitableRowFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableNavigatableRowSrc),
            fileName: 'platform-table-navigatable-row-indicator-example',
            name: 'platform-table-navigatable-row-indicator-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableNavigatableRowTsSrc),
            fileName: 'platform-table-navigatable-row-indicator-example',
            component: 'PlatformTableNavigatableRowIndicatorExampleComponent',
            name: 'platform-table-navigatable-row-indicator-example.component.ts'
        }
    ];

    noDataCustomMessageFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableCustomNoDataMessageSrc),
            fileName: 'platform-table-no-items-template-example',
            name: 'platform-table-no-items-template-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableCustomNoDataMessageTsSrc),
            fileName: 'platform-table-no-items-template-example',
            component: 'PlatformTableNoItemsTemplateExampleComponent',
            name: 'platform-table-no-items-template-example.component.ts'
        },
        {
            language: 'svg',
            code: getAsset(illustrationDialogNoMail),
            fileName: 'sapIllus-Dialog-NoMail',
            name: 'sapIllus-Dialog-NoMail.svg',
            path: 'src/assets/images'
        }
    ];

    semanticFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableSemanticSrc),
            fileName: 'platform-table-semantic-example',
            name: 'platform-table-semantic-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableSemanticTsSrc),
            fileName: 'platform-table-semantic-example',
            component: 'PlatformTableSemanticExampleComponent',
            name: 'platform-table-semantic-example.component.ts'
        }
    ];

    rowClassTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableRowClassSrc),
            fileName: 'platform-table-row-class-example',
            name: 'platform-table-row-class-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableRowClassTsSrc),
            fileName: 'platform-table-row-class-example',
            component: 'PlatformTableRowClassExampleComponent',
            name: 'platform-table-row-class-example.component.ts'
        }
    ];

    noOuterBordersFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableNoOuterBordersSrc),
            fileName: 'platform-table-no-outer-borders-example',
            name: 'platform-table-no-outer-borders-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableNoOuterBordersTsSrc),
            fileName: 'platform-table-no-outer-borders-example',
            component: 'PlatformTableNoOuterBordersExampleComponent',
            name: 'platform-table-no-outer-borders-example.component.ts'
        }
    ];

    textWrapFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableWrappedTextSrc),
            fileName: 'platform-table-wrap-example',
            name: 'platform-table-wrap-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableWrappedTextTsSrc),
            fileName: 'platform-table-wrap-example',
            component: 'PlatformTableWrapExampleComponent',
            name: 'platform-table-wrap-example.component.ts'
        }
    ];

    editableRowsFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableEditableRowsSrc),
            fileName: 'platform-table-editable-rows-example',
            name: 'platform-table-editable-rows-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableEditableRowsTsSrc),
            fileName: 'platform-table-editable-rows-example',
            component: 'PlatformTableEditableRowsExampleComponent',
            name: 'platform-table-editable-rows-example.component.ts'
        }
    ];

    responsiveColumnsFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformResponsiveColumnsSrc),
            fileName: 'platform-table-responsive-columns-example',
            name: 'platform-table-responsive-columns-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformResponsiveColumnsTsSrc),
            fileName: 'platform-table-responsive-columns-example',
            component: 'PlatformTableResponsiveColumnsExampleComponent',
            name: 'platform-table-responsive-columns-example.component.ts'
        }
    ];

    initialLoading: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformInitialLoadingSrc),
            fileName: 'platform-table-initial-loading-example',
            name: 'platform-table-initial-loading-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformInitialLoadingTsSrc),
            fileName: 'platform-table-initial-loading-example',
            component: 'PlatformTableInitialLoadingExampleComponent',
            name: 'platform-table-initial-loading-example.component.ts'
        }
    ];

    ngFor: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableNgForSrc),
            fileName: 'platform-table-columns-ngfor-example',
            name: 'platform-table-columns-ngfor-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableNgForTsSrc),
            fileName: 'platform-table-columns-ngfor-example',
            component: 'PlatformTableColumnsNgforExampleComponent',
            name: 'platform-table-columns-ngfor-example.component.ts'
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
