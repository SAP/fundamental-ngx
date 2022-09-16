import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const platformObjectMarkerExampleScss = 'object-marker-example.scss';
const platformObjectMarkerDefaultExampleHtml = 'object-marker/object-marker-example.component.html';
const platformObjectMarkerDefaultExampleTs = 'object-marker/object-marker-example.component.ts';
const platformObjectMarkerTextAndIconExampleHtml =
    'object-marker-text-and-icon/object-marker-text-and-icon-example.component.html';
const platformObjectMarkerTextAndIconExampleTs =
    'object-marker-text-and-icon/object-marker-text-and-icon-example.component.ts';
const platformObjectMarkerTextAndIconClickableExampleHtml =
    'object-marker-text-clickable/object-marker-text-clickable-example.component.html';
const platformObjectMarkerTextAndIconClickableExampleTs =
    'object-marker-text-clickable/object-marker-text-clickable-example.component.ts';
const platformObjectMarkerTextOnlyExampleHtml =
    'object-marker-text-only-example/object-marker-text-only-example.component.html';
const platformObjectMarkerTextOnlyExampleTs =
    'object-marker-text-only-example/object-marker-text-only-example.component.ts';

@Component({
    selector: 'fdp-platform-object-marker',
    templateUrl: './platform-object-marker-docs.component.html'
})
export class PlatformObjectMarkerDocsComponent {
    platformDefaultObjectMarkerHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformObjectMarkerDefaultExampleHtml),
            fileName: 'object-marker-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformObjectMarkerDefaultExampleTs),
            fileName: 'object-marker-example',
            component: 'ObjectMarkerExampleComponent',
            scssFileCode: getAssetFromModuleAssets(platformObjectMarkerExampleScss)
        }
    ];

    platformTextAndIconObjectMarkerHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformObjectMarkerTextAndIconExampleHtml),
            fileName: 'object-marker-text-and-icon-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformObjectMarkerTextAndIconExampleTs),
            fileName: 'object-marker-text-and-icon-example',
            component: 'ObjectMarkerTextAndIconExampleComponent',
            scssFileCode: getAssetFromModuleAssets(platformObjectMarkerExampleScss)
        }
    ];

    platformTextOnlyObjectMarkerHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformObjectMarkerTextOnlyExampleHtml),
            fileName: 'object-marker-text-only-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformObjectMarkerTextOnlyExampleTs),
            fileName: 'object-marker-text-only-example',
            component: 'ObjectMarkerTextOnlyExampleComponent',
            scssFileCode: getAssetFromModuleAssets(platformObjectMarkerExampleScss)
        }
    ];

    platformTextIconClickableObjectMarkerHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformObjectMarkerTextAndIconClickableExampleHtml),
            fileName: 'object-marker-text-clickable-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformObjectMarkerTextAndIconClickableExampleTs),
            fileName: 'object-marker-text-clickable-example',
            component: 'ObjectMarkerIconAndTextClickableExampleComponent',
            scssFileCode: getAssetFromModuleAssets(platformObjectMarkerExampleScss)
        }
    ];
}
