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
import {
    InputExampleComponent,
    InputInlineHelpExampleComponent,
    InputStateExampleComponent
} from './examples/input-examples.component';
import { InputFormGroupExampleComponent } from './examples/input-form-group-example.component';

const formGroupInputScss = 'input-form-group-example.component.scss';

const formHtml = 'input-example.component.html';
const formInlineHelpHtml = 'input-inline-help-example.component.html';
const formStateHtml = 'input-state-example.component.html';
const formGroupInputHtml = 'input-form-group-example.component.html';
const formGroupInputTs = 'input-form-group-example.component.ts';

@Component({
    selector: 'app-input',
    templateUrl: './input-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        InputExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        DescriptionComponent,
        InputInlineHelpExampleComponent,
        InputStateExampleComponent,
        InputFormGroupExampleComponent
    ]
})
export class InputDocsComponent {
    inputsFormHtml: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(formHtml),
            fileName: 'input-example'
        }
    ];
    inputsHelpFormHtml: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(formInlineHelpHtml),
            fileName: 'input-inline-help-example'
        }
    ];

    inputStatesFormHtml: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(formStateHtml),
            fileName: 'input-state-example'
        }
    ];

    formGroupInput: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(formGroupInputHtml),
            fileName: 'input-form-group-example',
            scssFileCode: getAssetFromModuleAssets(formGroupInputScss)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(formGroupInputTs),
            fileName: 'input-form-group-example',
            component: 'InputFormGroupExampleComponent'
        }
    ];
}
