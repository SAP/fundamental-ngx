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
            originalFileName: 'basic-example'
        },
        {
            language: 'typescript',
            component: 'ListBasicExample',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'basic-example'
        }
    ]);

    private readonly growingListExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(growingListHtml),
            originalFileName: 'growing-list-example'
        },
        {
            language: 'typescript',
            component: 'ListGrowingExample',
            code: getAssetFromModuleAssets(growingListTs),
            originalFileName: 'growing-list-example'
        }
    ]);

    private readonly selectionModesExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(selectionModesHtml),
            originalFileName: 'selection-modes'
        },
        {
            language: 'typescript',
            component: 'ListSelectionModesExample',
            code: getAssetFromModuleAssets(selectionModesTs),
            originalFileName: 'selection-modes'
        }
    ]);

    private readonly noDataExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(noDataHtml),
            originalFileName: 'no-data'
        },
        {
            language: 'typescript',
            component: 'ListNoDataExample',
            code: getAssetFromModuleAssets(noDataTs),
            originalFileName: 'no-data'
        }
    ]);

    private readonly groupingExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(groupingHtml),
            originalFileName: 'grouping'
        },
        {
            language: 'typescript',
            component: 'ListGroupingExample',
            code: getAssetFromModuleAssets(groupingTs),
            originalFileName: 'grouping'
        }
    ]);

    private readonly separatorsExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(separatorsHtml),
            originalFileName: 'separators'
        },
        {
            language: 'typescript',
            component: 'ListSeparatorsExample',
            code: getAssetFromModuleAssets(separatorsTs),
            originalFileName: 'separators'
        }
    ]);

    private readonly dragAndDropExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(dragAndDropHtml),
            originalFileName: 'drag-and-drop'
        },
        {
            language: 'typescript',
            component: 'ListDragAndDropExample',
            code: getAssetFromModuleAssets(dragAndDropTs),
            originalFileName: 'drag-and-drop'
        }
    ]);

    private readonly multipleDragAndDropExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(multipleDragAndDropHtml),
            originalFileName: 'multiple-drag-and-drop'
        },
        {
            language: 'typescript',
            component: 'ListMultipleDragAndDropExample',
            code: getAssetFromModuleAssets(multipleDragAndDropTs),
            originalFileName: 'multiple-drag-and-drop'
        }
    ]);

    private readonly wrappingExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(wrappingHtml),
            originalFileName: 'wrapping'
        },
        {
            language: 'typescript',
            component: 'ListWrappingExample',
            code: getAssetFromModuleAssets(wrappingTs),
            originalFileName: 'wrapping'
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
