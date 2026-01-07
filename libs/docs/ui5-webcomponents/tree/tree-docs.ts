import { Component, signal } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { TreeBasicSample } from './examples/basic-sample';
import { TreeCustomContentSample } from './examples/custom-content';
import { TreeDragAndDropSample } from './examples/drag-and-drop';
import { TreeIconsSample } from './examples/icons';
import { TreeLazyLoadingSample } from './examples/lazy-loading';
import { TreeSelectionSample } from './examples/selection';

const basicSampleHtml = 'basic-sample.html';
const basicSampleTs = 'basic-sample.ts';
const selectionHtml = 'selection.html';
const selectionTs = 'selection.ts';
const iconsHtml = 'icons.html';
const iconsTs = 'icons.ts';
const lazyLoadingHtml = 'lazy-loading.html';
const lazyLoadingTs = 'lazy-loading.ts';
const customContentHtml = 'custom-content.html';
const customContentTs = 'custom-content.ts';
const dragAndDropHtml = 'drag-and-drop.html';
const dragAndDropTs = 'drag-and-drop.ts';

@Component({
    selector: 'ui5-tree-docs',
    templateUrl: './tree-docs.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        TreeBasicSample,
        TreeSelectionSample,
        TreeIconsSample,
        TreeLazyLoadingSample,
        TreeCustomContentSample,
        TreeDragAndDropSample
    ]
})
export class TreeDocs {
    private readonly basicExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(basicSampleHtml),
            originalFileName: 'basic-sample'
        },
        {
            language: 'typescript',
            component: 'TreeBasicSample',
            code: getAssetFromModuleAssets(basicSampleTs),
            originalFileName: 'basic-sample'
        }
    ]);

    private readonly selectionExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(selectionHtml),
            originalFileName: 'selection'
        },
        {
            language: 'typescript',
            component: 'TreeSelectionSample',
            code: getAssetFromModuleAssets(selectionTs),
            originalFileName: 'selection'
        }
    ]);

    private readonly iconsExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(iconsHtml),
            originalFileName: 'icons'
        },
        {
            language: 'typescript',
            component: 'TreeIconsSample',
            code: getAssetFromModuleAssets(iconsTs),
            originalFileName: 'icons'
        }
    ]);

    private readonly lazyLoadingExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(lazyLoadingHtml),
            originalFileName: 'lazy-loading'
        },
        {
            language: 'typescript',
            component: 'TreeLazyLoadingSample',
            code: getAssetFromModuleAssets(lazyLoadingTs),
            originalFileName: 'lazy-loading'
        }
    ]);

    private readonly customContentExampleFiles = signal<ExampleFile[]>([
        {
            language: 'html',
            code: getAssetFromModuleAssets(customContentHtml),
            originalFileName: 'custom-content'
        },
        {
            language: 'typescript',
            component: 'TreeCustomContentSample',
            code: getAssetFromModuleAssets(customContentTs),
            originalFileName: 'custom-content'
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
            component: 'TreeDragAndDropSample',
            code: getAssetFromModuleAssets(dragAndDropTs),
            originalFileName: 'drag-and-drop'
        }
    ]);

    readonly basicExamples = this.basicExampleFiles.asReadonly();
    readonly selectionExamples = this.selectionExampleFiles.asReadonly();
    readonly iconsExamples = this.iconsExampleFiles.asReadonly();
    readonly lazyLoadingExamples = this.lazyLoadingExampleFiles.asReadonly();
    readonly customContentExamples = this.customContentExampleFiles.asReadonly();
    readonly dragAndDropExamples = this.dragAndDropExampleFiles.asReadonly();
}
