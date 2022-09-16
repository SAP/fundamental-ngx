import { Component, ViewEncapsulation } from '@angular/core';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const defaultExampleHtml = 'default-example/default-example.component.html';
const defaultExampleTs = 'default-example/default-example.component.ts';

const diExampleHtml = 'di-example/di-example.component.html';
const diExampleTs = 'di-example/di-example.component.ts';
const diRecipientExampleTs = 'di-example/fn-disabled-recipient.directive.ts';

@Component({
    selector: 'app-tabs',
    templateUrl: './fn-disabled-docs.component.html',
    encapsulation: ViewEncapsulation.None
})
export class FnDisabledDocsComponent {
    defaultExample: ExampleFile[] = [
        {
            code: getAssetFromModuleAssets(defaultExampleHtml),
            language: 'html',
            fileName: 'fn-disabled-default-example',
            component: 'FnDisabledDefaultExample'
        },
        {
            code: getAssetFromModuleAssets(defaultExampleTs),
            language: 'ts',
            fileName: 'fn-disabled-default-example',
            component: 'FnDisabledDefaultExample'
        }
    ];
    diExample: ExampleFile[] = [
        {
            code: getAssetFromModuleAssets(diExampleHtml),
            language: 'html',
            fileName: 'fn-disabled-di-example',
            component: 'FnDisabledDIExample'
        },
        {
            code: getAssetFromModuleAssets(diExampleTs),
            language: 'ts',
            fileName: 'fn-disabled-di-example',
            component: 'FnDisabledDIExample'
        },
        {
            code: getAssetFromModuleAssets(diRecipientExampleTs),
            language: 'ts',
            fileName: 'fn-disabled-recipient.directive',
            component: 'FnDisabledRecipientDirective'
        }
    ];

    constructor() {}
}
