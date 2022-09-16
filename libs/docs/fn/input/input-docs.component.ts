import { Component } from '@angular/core';

const inputHtml = 'input-example.component.html';
const StateHtml = 'input-state-example.component.html';
const FormHtml = 'input-form-example.component.html';
const FormTs = 'input-form-example.component.ts';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-input',
    templateUrl: './input-docs.component.html'
})
export class InputDocsComponent {
    inputsHtml: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(inputHtml),
            fileName: 'input-example'
        }
    ];

    inputStatesHtml: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(StateHtml),
            fileName: 'input-state-example'
        }
    ];

    inputFormsHtml: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(FormHtml),
            fileName: 'input-form-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(FormTs),
            fileName: 'input-form-example',
            component: 'InputFormExampleComponent'
        }
    ];
}
