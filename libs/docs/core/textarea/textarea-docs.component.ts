import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { TextareaFormGroupExampleComponent } from './examples/textarea-form-group-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import {
    TextareaExampleComponent,
    TextareaInlineHelpExampleComponent,
    TextareaStateExampleComponent
} from './examples/textarea-examples.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const formGroupInputScss = 'textarea-form-group-example.component.scss';

const formHtml = 'textarea-example.component.html';
const formInlineHelpHtml = 'textarea-inline-help-example.component.html';
const formStateHtml = 'textarea-state-example.component.html';
const formGroupInputHtml = 'textarea-form-group-example.component.html';
const formGroupInputTs = 'textarea-form-group-example.component.ts';

@Component({
    selector: 'app-input',
    templateUrl: './textarea-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        TextareaExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        DescriptionComponent,
        TextareaInlineHelpExampleComponent,
        TextareaStateExampleComponent,
        TextareaFormGroupExampleComponent
    ]
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
