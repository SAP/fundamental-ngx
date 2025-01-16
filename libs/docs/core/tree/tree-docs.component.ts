import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { LazilyLoadedTreeItemsExampleComponent } from './examples/lazily-loaded-tree-items-example.component';
import { NavigatableTreeExampleComponent } from './examples/navigatable-tree-example.component';
import { SimpleTreeExampleComponent } from './examples/simple-tree-example.component';
import { TreeActionButtonsExampleComponent } from './examples/tree-action-buttons-example.component';
import { TreeHighlightIndicatorsExampleComponent } from './examples/tree-highlight-indicators-example.component';
import { TreeWithFormsExampleComponent } from './examples/tree-with-forms-example.component';

const simpleTreeExample = 'simple-tree-example.component.ts';
const simpleTreeExampleHtml = 'simple-tree-example.component.html';
const navigatableTreeExample = 'navigatable-tree-example.component.ts';
const navigatableTreeExampleHtml = 'navigatable-tree-example.component.html';
const highlightIndicatorsTreeExample = 'tree-highlight-indicators-example.component.ts';
const highlightIndicatorsTreeExampleHtml = 'tree-highlight-indicators-example.component.html';
const buttonsTreeExample = 'tree-action-buttons-example.component.ts';
const buttonsTreeExampleHtml = 'tree-action-buttons-example.component.html';
const formsExample = 'tree-with-forms-example.component.ts';
const formsExampleHtml = 'tree-with-forms-example.component.html';
const lazyLoadingExampleTs = 'lazily-loaded-tree-items-example.component.ts';
const lazyLoadingExampleHtml = 'lazily-loaded-tree-items-example.component.html';

@Component({
    selector: 'app-tree',
    templateUrl: './tree-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        SimpleTreeExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        NavigatableTreeExampleComponent,
        TreeHighlightIndicatorsExampleComponent,
        TreeActionButtonsExampleComponent,
        TreeWithFormsExampleComponent,
        LazilyLoadedTreeItemsExampleComponent
    ]
})
export class TreeDocsComponent {
    simpleExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(simpleTreeExampleHtml),
            fileName: 'simple-tree-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(simpleTreeExample),
            fileName: 'simple-tree-example',
            component: 'SimpleTreeExampleComponent'
        }
    ];

    navigatableExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(navigatableTreeExampleHtml),
            fileName: 'navigatable-tree-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(navigatableTreeExample),
            fileName: 'navigatable-tree-example',
            component: 'NavigatableTreeExampleComponent'
        }
    ];

    highlightExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(highlightIndicatorsTreeExampleHtml),
            fileName: 'tree-highlight-indicators-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(highlightIndicatorsTreeExample),
            fileName: 'tree-highlight-indicators-example',
            component: 'TreeHighlightIndicatorsExampleComponent'
        }
    ];

    buttonsExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(buttonsTreeExampleHtml),
            fileName: 'tree-action-buttons-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(buttonsTreeExample),
            fileName: 'tree-action-buttons-example',
            component: 'TreeActionButtonsExampleComponent'
        }
    ];

    formsExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(formsExampleHtml),
            fileName: 'tree-with-forms-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(formsExample),
            fileName: 'tree-with-forms-example',
            component: 'TreeWithFormsExampleComponent'
        }
    ];

    lazyLoadingExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(lazyLoadingExampleHtml),
            fileName: 'lazily-loaded-tree-items-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(lazyLoadingExampleTs),
            fileName: 'lazily-loaded-tree-items-example',
            component: 'LazilyLoadedTreeItemsExampleComponent'
        }
    ];
}
