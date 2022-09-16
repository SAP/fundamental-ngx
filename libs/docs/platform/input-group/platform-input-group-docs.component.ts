import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const inputGroupStandardExampleHtml = 'platform-input-group-standard-example.component.html';
const inputGroupCompactExampleHtml = 'platform-input-group-compact-example.component.html';
const inputGroupDisabledExampleHtml = 'platform-input-group-disabled-example.component.html';
const inputGroupFormExampleHtml = 'platform-input-group-form-example.component.html';

@Component({
    selector: 'app-input-group',
    templateUrl: './platform-input-group-docs.component.html'
})
export class PlatformInputGroupDocsComponent {
    inputGroupStandard: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(inputGroupStandardExampleHtml),
            fileName: 'platform-input-group-standard-example'
        }
    ];

    inputGroupCompact: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(inputGroupCompactExampleHtml),
            fileName: 'platform-input-group-compact-example'
        }
    ];

    inputGroupDisabled: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(inputGroupDisabledExampleHtml),
            fileName: 'platform-input-group-disabled-example'
        }
    ];

    inputGroupForm: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(inputGroupFormExampleHtml),
            fileName: 'platform-input-group-form-example'
        }
    ];
}
