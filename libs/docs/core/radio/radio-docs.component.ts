import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { RadioFormGroupExampleComponent } from './examples/radio-form-group-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { RadioExamplesComponent } from './examples/radio-examples.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const formHtml = 'radio-example.component.html';
const formTs = 'radio-examples.component.ts';
const formGroupInputHtml = 'radio-form-group-example.component.html';
const formGroupInputTs = 'radio-form-group-example.component.ts';

@Component({
    selector: 'app-radio',
    templateUrl: './radio-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        RadioExamplesComponent,
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
            typescriptFileCode: formTs,
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
