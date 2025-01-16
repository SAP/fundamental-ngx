import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { RtlService } from '@fundamental-ngx/cdk/utils';
import { ContentDensityMode } from '@fundamental-ngx/core/content-density';
import { DatetimeAdapter, FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { Schema, SchemaFactoryService } from '@fundamental-ngx/docs/schema';

import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleChildService,
    ExampleFile,
    PlayGroundComponent,
    SeparatorComponent,
    getAsset,
    getAssetFromModuleAssets,
    getExampleFile
} from '@fundamental-ngx/docs/shared';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import {
    PlatformTableModule,
    TableColumnFreezeEvent,
    TableDataSource,
    TableFilterChangeEvent,
    TableGroupChangeEvent,
    TableRowSelectionChangeEvent,
    TableSortChangeEvent
} from '@fundamental-ngx/platform/table';
import {
    TableDataSourceDirective,
    TableHeaderResizerDirective,
    TableInitialStateDirective
} from '@fundamental-ngx/platform/table-helpers';
import { PlatformTableEditableRowsExampleComponent } from './examples/editable-rows/platform-table-editable-rows-example.component';
import { PlatformTableInitialLoadingExampleComponent } from './examples/initial-loading/platform-table-initial-loading-example.component';
import { PlatformTableColumnsNgforExampleComponent } from './examples/platform-table-columns-ngfor-example.component';
import { PlatformTableCustomColumnExampleComponent } from './examples/platform-table-custom-column-example.component';
import { PlatformTableCustomTitleExampleComponent } from './examples/platform-table-custom-title-example.component';
import { PlatformTableCustomWidthExampleComponent } from './examples/platform-table-custom-width-example.component';
import { ExampleItem } from './examples/platform-table-data-items-example';
import { TableDataProviderExample } from './examples/platform-table-data-provider-example';
import { PlatformTableDefaultExampleComponent } from './examples/platform-table-default-example.component';
import { PlatformTableFreezableExampleComponent } from './examples/platform-table-freezable-example.component';
import { PlatformTableInitialStateExampleComponent } from './examples/platform-table-initial-state-example.component';
import { PlatformTableLoadingExampleComponent } from './examples/platform-table-loading-example.component';
import { PlatformTableNoItemsTemplateExampleComponent } from './examples/platform-table-no-items-template-example.component';
import { PlatformTableNoOuterBordersExampleComponent } from './examples/platform-table-no-outer-borders-example.component';
import { PlatformTableResponsiveColumnsExampleComponent } from './examples/platform-table-responsive-columns-example.component';
import { PlatformTableRowClassExampleComponent } from './examples/platform-table-row-class-example.component';
import { PlatformTableSemanticExampleComponent } from './examples/platform-table-semantic-example.component';
import { PlatformTableTreeExampleComponent } from './examples/platform-table-tree-example.component';
import { PlatformTableWrapExampleComponent } from './examples/platform-table-wrap-example.component';

const platformTableDefaultSrc = 'platform-table-default-example.component.html';
const platformTableDefaultTsSrc = 'platform-table-default-example.component.ts';
const platformTableCustomColumnSrc = 'platform-table-custom-column-example.component.html';
const platformTableCustomColumnTsSrc = 'platform-table-custom-column-example.component.ts';
const platformTableCustomTitleSrc = 'platform-table-custom-title-example.component.html';
const platformTableCustomTitleTsSrc = 'platform-table-custom-title-example.component.ts';
const platformTableFreezableSrc = 'platform-table-freezable-example.component.html';
const platformTableFreezableTsSrc = 'platform-table-freezable-example.component.ts';
const platformTableLoadingSrc = 'platform-table-loading-example.component.html';
const platformTableLoadingTsSrc = 'platform-table-loading-example.component.ts';
const platformTableInitialStateSrc = 'platform-table-initial-state-example.component.html';
const platformTableInitialStateTsSrc = 'platform-table-initial-state-example.component.ts';
const platformTreeTableDefaultSrc = 'platform-table-tree-example.component.html';
const platformTreeTableDefaultTsSrc = 'platform-table-tree-example.component.ts';
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

@Component({
    selector: 'fdp-table-docs',
    templateUrl: './platform-table-docs.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [RtlService],
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformTableDefaultExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        PlatformTableCustomWidthExampleComponent,
        PlatformTableCustomColumnExampleComponent,
        PlatformTableCustomTitleExampleComponent,
        PlatformTableFreezableExampleComponent,
        PlatformTableLoadingExampleComponent,
        PlatformTableInitialStateExampleComponent,
        RouterLink,
        PlatformTableTreeExampleComponent,
        PlatformTableNoItemsTemplateExampleComponent,
        PlatformTableSemanticExampleComponent,
        PlatformTableRowClassExampleComponent,
        PlatformTableWrapExampleComponent,
        PlatformTableNoOuterBordersExampleComponent,
        PlatformTableEditableRowsExampleComponent,
        PlatformTableResponsiveColumnsExampleComponent,
        PlatformTableInitialLoadingExampleComponent,
        PlatformTableColumnsNgforExampleComponent,
        PlayGroundComponent,
        TableDataSourceDirective,
        TableHeaderResizerDirective,
        PlatformTableModule,
        TableInitialStateDirective,
        ContentDensityDirective,
        PlatformButtonModule,
        FdDatetimeModule
    ]
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

    customTitleTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTableCustomTitleSrc),
            fileName: 'platform-table-custom-title-example',
            name: 'platform-table-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTableCustomTitleTsSrc),
            fileName: 'platform-table-custom-title-example',
            component: 'PlatformTableCustomTitleExampleComponent',
            name: 'platform-table-example.component.ts'
        }
    ];

    customWidthFiles: ExampleFile[] = [
        getExampleFile('platform-table-custom-width-example.component.html'),
        getExampleFile('platform-table-custom-width-example.component.ts', {
            selector: 'platform-table-custom-width-example',
            component: 'PlatformTableCustomWidthExampleComponent'
        })
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
        getExampleFile('platform-table-no-outer-borders-example.component.html'),
        getExampleFile('platform-table-no-outer-borders-example.component.ts', {
            selector: 'platform-table-no-outer-borders-example',
            component: 'PlatformTableNoOuterBordersExampleComponent'
        })
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

    childService = inject(ExampleChildService);
    route = inject(ActivatedRoute);
    constructor(
        private schemaFactory: SchemaFactoryService,
        private _cd: ChangeDetectorRef,
        datetimeAdapter: DatetimeAdapter<any>
    ) {
        this.schema = this.schemaFactory.getComponent('fdp-table');
        this.dataSource = new TableDataSource(new TableDataProviderExample(datetimeAdapter));
        this.childService.setLink(this.route.snapshot.routeConfig?.path);
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
