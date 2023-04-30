import { Component } from '@angular/core';
import { Schema } from '@fundamental-ngx/docs/schema';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { TreeActionButtonsExampleComponent } from './examples/tree-action-buttons-example.component';
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

@Component({
    selector: 'app-tree',
    templateUrl: './tree-docs.component.html'
})
export class TreeDocsComponent {
    simpleExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(simpleTreeExampleHtml),
            fileName: 'simple-tree-example'
        },
        {
            language: 'TypeScript',
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
            language: 'TypeScript',
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
            language: 'TypeScript',
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
            language: 'TypeScript',
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
            language: 'TypeScript',
            code: getAssetFromModuleAssets(formsExample),
            fileName: 'tree-with-forms-example',
            component: 'TreeWithFormsExampleComponent'
        }
    ];
}
