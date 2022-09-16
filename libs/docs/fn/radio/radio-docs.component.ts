import { Component } from '@angular/core';

const formHtml = 'radio-example.component.html';
const formTs = 'radio-examples.component.ts';
const formGroupInputHtml = 'radio-form-group-example.component.html';
const formGroupInputTs = 'radio-form-group-example.component.ts';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-radio',
    templateUrl: './radio-docs.component.html'
})
export class RadioDocsComponent {
    radioFormHtml: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(formHtml),
            fileName: 'radio-example',
            typescriptFileCode: getAssetFromModuleAssets(formTs),
            component: 'RadioExamplesComponent'
        }
    ];

    formGroupRadioInput: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(formGroupInputHtml),
            fileName: 'radio-form-group-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(formGroupInputTs),
            fileName: 'radio-form-group-example',
            component: 'RadioFormGroupExampleComponent'
        }
    ];
}
