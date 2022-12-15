import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const bylineSrcHtml = 'list-byline-standard-example/list-byline-standard-example.component.html';
const bylineNavigationSrcHtml = 'list-byline-navigation-example/list-byline-navigation-example.component.html';
const bylineBorderlessSrcHtml = 'list-byline-borderless-example/list-byline-borderless-example.component.html';
const bylineSelectionSrcHtml = 'list-byline-selection-example/list-byline-selection-example.component.html';
const bylineSelectionSrcTs = 'list-byline-selection-example/list-byline-selection-example.component.ts';
const bylineButtonsTs = 'list-byline-button-example/list-byline-button-example.component.ts';
const bylineButtonsHtml = 'list-byline-button-example/list-byline-button-example.component.html';
const bylineInteractiveTs = 'list-byline-interactive-example/list-byline-interactive-example.component.ts';
const bylineInteractiveHtml = 'list-byline-interactive-example/list-byline-interactive-example.component.html';
const bylineWrapTs = 'list-byline-wrap-example/list-byline-wrap-example.component.ts';
const bylineWrapHtml = 'list-byline-wrap-example/list-byline-wrap-example.component.html';
const bylineLoadingSrcHtml = 'list-byline-loading-example/list-byline-loading-example.component.html';

@Component({
    selector: 'app-list-byline',
    templateUrl: './list-byline-docs.component.html'
})
export class ListBylineDocsComponent {
    listByline: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(bylineSrcHtml),
            fileName: 'list-byline-standard-example'
        }
    ];

    listBylineNavigation: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(bylineNavigationSrcHtml),
            fileName: 'list-byline-navigation-example'
        }
    ];

    listBylineBorderless: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(bylineBorderlessSrcHtml),
            fileName: 'list-byline-borderless-example'
        }
    ];

    listBylineSelection: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(bylineSelectionSrcHtml),
            fileName: 'list-byline-selection-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(bylineSelectionSrcTs),
            fileName: 'list-byline-selection-example',
            component: 'ListBylineSelectionExampleComponent'
        }
    ];

    listBylineComplex: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(bylineButtonsHtml),
            fileName: 'list-byline-button-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(bylineButtonsTs),
            fileName: 'list-byline-button-example',
            component: 'ListBylineButtonExampleComponent'
        }
    ];

    interactiveList: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(bylineInteractiveHtml),
            fileName: 'list-byline-interactive-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(bylineInteractiveTs),
            fileName: 'list-byline-interactive-example',
            component: 'ListBylineInteractiveExampleComponent'
        }
    ];

    wrapList: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(bylineWrapHtml),
            fileName: 'list-byline-wrap-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(bylineWrapTs),
            fileName: 'list-byline-wrap-example',
            component: 'ListBylineWrapExampleComponent'
        }
    ];

    listBylineLoading: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(bylineLoadingSrcHtml),
            fileName: 'list-byline-loading-example'
        }
    ];
}
