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
import { RadioExampleComponent } from './examples/radio-example.component';
import { RadioFormGroupExampleComponent } from './examples/radio-form-group-example.component';

const formHtml = 'radio-example.component.html';
const formTs = 'radio-example.component.ts';
const formGroupInputHtml = 'radio-form-group-example.component.html';
const formGroupInputTs = 'radio-form-group-example.component.ts';

@Component({
    selector: 'app-radio',
    templateUrl: './radio-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        RadioExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        DescriptionComponent,
        RadioFormGroupExampleComponent
    ]
})
export class RadioDocsComponent {
    radioFormHtml: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(formHtml),
            fileName: 'radio-example',
            component: 'RadioExamplesComponent'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(formTs),
            fileName: 'radio-example',
            component: 'RadioExampleComponent'
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
