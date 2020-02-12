import { Component, OnInit } from '@angular/core';

import * as localizationSrcH from '!raw-loader!./examples/localization-editor-example.component.html';
import * as localizationSrcT from '!raw-loader!./examples/localization-editor-example.component.ts';
import * as localizationTemplateSrcH from '!raw-loader!./examples/localization-editor-template-example.component.html';
import * as localizationTemplateSrcT from '!raw-loader!./examples/localization-editor-template-example.component.ts';
import * as localizationTextareaSrcH from '!raw-loader!./examples/localization-editor-textarea-example.component.html';
import * as localizationTextareaSrcT from '!raw-loader!./examples/localization-editor-textarea-example.component.ts';
import * as localizationFormsSrcH from '!raw-loader!./examples/localization-editor-forms-example.component.html';
import * as localizationFormsSrcT from '!raw-loader!./examples/localization-editor-forms-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-localization-editor',
    templateUrl: './localization-editor-docs.component.html'
})
export class LocalizationEditorDocsComponent implements OnInit {
    localizationBasic: ExampleFile[] = [
        {
            language: 'html',
            code: localizationSrcH,
            fileName: 'localization-editor-example',
        },
        {
            language: 'typescript',
            component: 'LocalizationEditorExampleComponent',
            code: localizationSrcT,
            fileName: 'localization-editor-example',
        }
    ];

    localizationTemplate: ExampleFile[] = [
        {
            language: 'html',
            code: localizationTemplateSrcH,
            fileName: 'localization-editor-template-example',
        },
        {
            language: 'typescript',
            component: 'LocalizationEditorTemplateExampleComponent',
            code: localizationTemplateSrcT,
            fileName: 'localization-editor-template-example',
        }
    ];

    localizationTextarea: ExampleFile[] = [
        {
            language: 'html',
            code: localizationTextareaSrcH,
            fileName: 'localization-editor-textarea-example',
        },
        {
            language: 'typescript',
            component: 'LocalizationEditorTextareaExampleComponent',
            code: localizationTextareaSrcT,
            fileName: 'localization-editor-textarea-example',
        }
    ];

    localizationForms: ExampleFile[] = [
        {
            language: 'html',
            code: localizationFormsSrcH,
            fileName: 'localization-editor-forms-example',
        },
        {
            language: 'typescript',
            component: 'LocalizationEditorFormsExampleComponent',
            code: localizationFormsSrcT,
            fileName: 'localization-editor-forms-example',
        }
    ];

    ngOnInit() { }
}
