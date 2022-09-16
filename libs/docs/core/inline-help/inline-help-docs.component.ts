import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const inlineHelpTs = 'inline-help-example.component.ts';
const inlineHelpSrc = 'inline-help-example.component.html';
const inlineHelpTriggerHtml = 'inline-help-trigger-example.component.html';
const inlineHelpStylesTs = 'inline-help-styled-example.component.ts';
const inlineHelpStylesHtml = 'inline-help-styled-example.component.html';
const inlineHelpTemplateHtml = 'inline-help-template-example/inline-help-template-example.component.html';

@Component({
    selector: 'app-inline-help',
    templateUrl: './inline-help-docs.component.html'
})
export class InlineHelpDocsComponent {
    inlineHelpBasic: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(inlineHelpSrc),
            fileName: 'inline-help-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(inlineHelpTs),
            fileName: 'inline-help-example',
            component: 'InlineHelpExampleComponent'
        }
    ];

    inlineHelpTrigger: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(inlineHelpTriggerHtml),
            fileName: 'inline-help-trigger-example'
        }
    ];

    inlineHelpTemplate: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(inlineHelpTemplateHtml),
            fileName: 'inline-help-template-example'
        }
    ];

    inlineHelpStyles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(inlineHelpStylesHtml),
            fileName: 'inline-help-styled-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(inlineHelpStylesTs),
            fileName: 'inline-help-styled-example',
            component: 'InlineHelpStyledExampleComponent'
        }
    ];
}
