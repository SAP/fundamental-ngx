import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const formGroupInputScss = 'textarea-form-group-example.component.scss';

const formHtml = 'textarea-example.component.html';
const formInlineHelpHtml = 'textarea-inline-help-example.component.html';
const formStateHtml = 'textarea-state-example.component.html';
const formGroupInputHtml = 'textarea-form-group-example.component.html';
const formGroupInputTs = 'textarea-form-group-example.component.ts';

@Component({
    selector: 'app-input',
    templateUrl: './textarea-docs.component.html'
})
export class TextareaDocsComponent {
    textareaHtml: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(formHtml),
            fileName: 'textarea-example'
        }
    ];

    textareaHelpHtml: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(formInlineHelpHtml),
            fileName: 'textarea-inline-help-example'
        }
    ];

    textareaStatesHtml: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(formStateHtml),
            fileName: 'textarea-state-example'
        }
    ];

    textareaFormGroup: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(formGroupInputHtml),
            fileName: 'textarea-form-group-example',
            scssFileCode: getAssetFromModuleAssets(formGroupInputScss)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(formGroupInputTs),
            fileName: 'textarea-form-group-example',
            component: 'TextareaFormGroupExampleComponent'
        }
    ];
}
