import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { BasicTableSample } from './examples/basic-sample';
import { DragAndDropTableSample } from './examples/drag-and-drop-sample';
import { GrowingTableSample } from './examples/growing-sample';
import { HeaderCellAISample } from './examples/header-cell-ai-sample';
import { InteractiveRowsTableSample } from './examples/interactive-rows-sample';
import { NoDataTableSample } from './examples/no-data-sample';
import { OverflowModeTableSample } from './examples/overflow-mode-sample';
import { RowActionTableSample } from './examples/row-action-sample';
import { SelectableTableSample } from './examples/selectable-sample';
import { StickyHeaderTableSample } from './examples/sticky-header-sample';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';
const selectableSampleHtml = 'selectable-sample.html';
const selectableSampleTs = 'selectable-sample.ts';
const growingSampleHtml = 'growing-sample.html';
const growingSampleTs = 'growing-sample.ts';
const overflowModeSampleHtml = 'overflow-mode-sample.html';
const overflowModeSampleTs = 'overflow-mode-sample.ts';
const stickyHeaderSampleHtml = 'sticky-header-sample.html';
const stickyHeaderSampleTs = 'sticky-header-sample.ts';
const noDataSampleHtml = 'no-data-sample.html';
const noDataSampleTs = 'no-data-sample.ts';
const interactiveRowsSampleHtml = 'interactive-rows-sample.html';
const interactiveRowsSampleTs = 'interactive-rows-sample.ts';
const dragAndDropSampleHtml = 'drag-and-drop-sample.html';
const dragAndDropSampleTs = 'drag-and-drop-sample.ts';
const rowActionSampleHtml = 'row-action-sample.html';
const rowActionSampleTs = 'row-action-sample.ts';
const headerCellAISampleHtml = 'header-cell-ai-sample.html';
const headerCellAISampleTs = 'header-cell-ai-sample.ts';

@Component({
    selector: 'ui5-table-docs',
    templateUrl: './table-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        BasicTableSample,
        OverflowModeTableSample,
        StickyHeaderTableSample,
        NoDataTableSample,
        InteractiveRowsTableSample,
        DragAndDropTableSample,
        SelectableTableSample,
        GrowingTableSample,
        RowActionTableSample,
        HeaderCellAISample
    ]
})
export class TableDocs {
    private readonly exampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'basic-sample'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(basicSampleTs),
            component: 'BasicTableSample',
            originalFileName: 'basic-sample'
        }
    ]);

    private readonly selectableExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(selectableSampleHtml),
            originalFileName: 'selectable-sample'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(selectableSampleTs),
            component: 'SelectableTableSample',
            originalFileName: 'selectable-sample'
        }
    ]);

    private readonly growingExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(growingSampleHtml),
            originalFileName: 'growing-sample'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(growingSampleTs),
            component: 'GrowingTableSample',
            originalFileName: 'growing-sample'
        }
    ]);

    private readonly overflowModeExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(overflowModeSampleHtml),
            originalFileName: 'overflow-mode-sample'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(overflowModeSampleTs),
            component: 'OverflowModeTableSample',
            originalFileName: 'overflow-mode-sample'
        }
    ]);

    private readonly stickyHeaderExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(stickyHeaderSampleHtml),
            originalFileName: 'sticky-header-sample'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(stickyHeaderSampleTs),
            component: 'StickyHeaderTableSample',
            originalFileName: 'sticky-header-sample'
        }
    ]);

    private readonly noDataExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(noDataSampleHtml),
            originalFileName: 'no-data-sample'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(noDataSampleTs),
            component: 'NoDataTableSample',
            originalFileName: 'no-data-sample'
        }
    ]);

    private readonly interactiveRowsExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(interactiveRowsSampleHtml),
            originalFileName: 'interactive-rows-sample'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(interactiveRowsSampleTs),
            component: 'InteractiveRowsTableSample',
            originalFileName: 'interactive-rows-sample'
        }
    ]);

    private readonly dragAndDropExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(dragAndDropSampleHtml),
            originalFileName: 'drag-and-drop-sample'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(dragAndDropSampleTs),
            component: 'DragAndDropTableSample',
            originalFileName: 'drag-and-drop-sample'
        }
    ]);

    private readonly rowActionExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(rowActionSampleHtml),
            originalFileName: 'row-action-sample'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(rowActionSampleTs),
            component: 'RowActionTableSample',
            originalFileName: 'row-action-sample'
        }
    ]);

    private readonly headerCellAIExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(headerCellAISampleHtml),
            originalFileName: 'header-cell-ai-sample'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(headerCellAISampleTs),
            component: 'HeaderCellAISample',
            originalFileName: 'header-cell-ai-sample'
        }
    ]);

    readonly examples = computed(() => this.exampleFiles());
    readonly selectableExamples = computed(() => this.selectableExampleFiles());
    readonly growingExamples = computed(() => this.growingExampleFiles());
    readonly overflowModeExamples = computed(() => this.overflowModeExampleFiles());
    readonly stickyHeaderExamples = computed(() => this.stickyHeaderExampleFiles());
    readonly noDataExamples = computed(() => this.noDataExampleFiles());
    readonly interactiveRowsExamples = computed(() => this.interactiveRowsExampleFiles());
    readonly dragAndDropExamples = computed(() => this.dragAndDropExampleFiles());
    readonly rowActionExamples = computed(() => this.rowActionExampleFiles());
    readonly headerCellAIExamples = computed(() => this.headerCellAIExampleFiles());
}
