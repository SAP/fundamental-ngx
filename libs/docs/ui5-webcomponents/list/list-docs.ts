import { Component, computed, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { ListBasicExample } from './examples/basic-sample';
import { ListDragAndDropExample } from './examples/drag-and-drop';
import { ListGroupingExample } from './examples/grouping';
import { ListGrowingExample } from './examples/growing-list';
import { ListMultipleDragAndDropExample } from './examples/multiple-drag-and-drop';
import { ListNoDataExample } from './examples/no-data';
import { ListSelectionModesExample } from './examples/selection-modes';
import { ListSeparatorsExample } from './examples/separators';
import { ListWrappingExample } from './examples/wrapping';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';
const growingListHtml = 'growing-list.html';
const growingListTs = 'growing-list.ts';
const selectionModesHtml = 'selection-modes.html';
const selectionModesTs = 'selection-modes.ts';
const noDataHtml = 'no-data.html';
const noDataTs = 'no-data.ts';
const groupingHtml = 'grouping.html';
const groupingTs = 'grouping.ts';
const separatorsHtml = 'separators.html';
const separatorsTs = 'separators.ts';
const dragAndDropHtml = 'drag-and-drop.html';
const dragAndDropTs = 'drag-and-drop.ts';
const multipleDragAndDropHtml = 'multiple-drag-and-drop.html';
const multipleDragAndDropTs = 'multiple-drag-and-drop.ts';
const wrappingHtml = 'wrapping.html';
const wrappingTs = 'wrapping.ts';

@Component({
    selector: 'ui5-list-docs',
    templateUrl: './list-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        ListBasicExample,
        ListGrowingExample,
        ListSelectionModesExample,
        ListNoDataExample,
        ListGroupingExample,
        ListSeparatorsExample,
        ListDragAndDropExample,
        ListMultipleDragAndDropExample,
        ListWrappingExample
    ]
})
export class ListDocs {
    private readonly basicExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            fileName: 'basic-example'
        },
        {
            language: 'typescript',
            component: 'ListBasicExample',
            code: getAssetFromModuleAssets(basicSampleTs),
            fileName: 'basic-example'
        }
    ]);

    private readonly growingListExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(growingListHtml),
            fileName: 'growing-list-example'
        },
        {
            language: 'typescript',
            component: 'ListGrowingExample',
            code: getAssetFromModuleAssets(growingListTs),
            fileName: 'growing-list-example'
        }
    ]);

    private readonly selectionModesExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(selectionModesHtml),
            fileName: 'selection-modes'
        },
        {
            language: 'typescript',
            component: 'ListSelectionModesExample',
            code: getAssetFromModuleAssets(selectionModesTs),
            fileName: 'selection-modes'
        }
    ]);

    private readonly noDataExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(noDataHtml),
            fileName: 'no-data'
        },
        {
            language: 'typescript',
            component: 'ListNoDataExample',
            code: getAssetFromModuleAssets(noDataTs),
            fileName: 'no-data'
        }
    ]);

    private readonly groupingExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(groupingHtml),
            fileName: 'grouping'
        },
        {
            language: 'typescript',
            component: 'ListGroupingExample',
            code: getAssetFromModuleAssets(groupingTs),
            fileName: 'grouping'
        }
    ]);

    private readonly separatorsExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(separatorsHtml),
            fileName: 'separators'
        },
        {
            language: 'typescript',
            component: 'ListSeparatorsExample',
            code: getAssetFromModuleAssets(separatorsTs),
            fileName: 'separators'
        }
    ]);

    private readonly dragAndDropExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(dragAndDropHtml),
            fileName: 'drag-and-drop'
        },
        {
            language: 'typescript',
            component: 'ListDragAndDropExample',
            code: getAssetFromModuleAssets(dragAndDropTs),
            fileName: 'drag-and-drop'
        }
    ]);

    private readonly multipleDragAndDropExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(multipleDragAndDropHtml),
            fileName: 'multiple-drag-and-drop'
        },
        {
            language: 'typescript',
            component: 'ListMultipleDragAndDropExample',
            code: getAssetFromModuleAssets(multipleDragAndDropTs),
            fileName: 'multiple-drag-and-drop'
        }
    ]);

    private readonly wrappingExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(wrappingHtml),
            fileName: 'wrapping'
        },
        {
            language: 'typescript',
            component: 'ListWrappingExample',
            code: getAssetFromModuleAssets(wrappingTs),
            fileName: 'wrapping'
        }
    ]);

    readonly basicExamples = computed(() => this.basicExampleFiles());
    readonly growingListExamples = computed(() => this.growingListExampleFiles());
    readonly selectionModesExamples = computed(() => this.selectionModesExampleFiles());
    readonly noDataExamples = computed(() => this.noDataExampleFiles());
    readonly groupingExamples = computed(() => this.groupingExampleFiles());
    readonly separatorsExamples = computed(() => this.separatorsExampleFiles());
    readonly dragAndDropExamples = computed(() => this.dragAndDropExampleFiles());
    readonly multipleDragAndDropExamples = computed(() => this.multipleDragAndDropExampleFiles());
    readonly wrappingExamples = computed(() => this.wrappingExampleFiles());
}
