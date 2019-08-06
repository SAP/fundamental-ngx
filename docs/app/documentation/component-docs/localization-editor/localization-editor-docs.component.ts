import { Component, OnInit } from '@angular/core';

import * as localizationSrcH from '!raw-loader!./examples/localization-editor-example.component.html';
import * as localizationSrcT from '!raw-loader!./examples/localization-editor-example.component.ts';
import * as localizationTemplateSrcH from '!raw-loader!./examples/localization-editor-template-example.component.html';
import * as localizationTemplateSrcT from '!raw-loader!./examples/localization-editor-template-example.component.ts';
import * as localizationTextareaSrcH from '!raw-loader!./examples/localization-editor-textarea-example.component.html';
import * as localizationTextareaSrcT from '!raw-loader!./examples/localization-editor-textarea-example.component.ts';
import * as localizationFormsSrcH from '!raw-loader!./examples/localization-editor-forms-example.component.html';
import * as localizationFormsSrcT from '!raw-loader!./examples/localization-editor-forms-example.component.ts';
import { ExampleFile } from '../../core-helpers/code-example/example-file';

@Component({
    selector: 'app-localization-editor',
    templateUrl: './localization-editor-docs.component.html'
})
export class LocalizationEditorDocsComponent implements OnInit {

    localizationBasic: ExampleFile[] = [
        {
            language: 'html',
            code: localizationSrcH
        },
        {
            language: 'typescript',
            code: localizationSrcT
        }
    ];

    localizationTemplate: ExampleFile[] = [
        {
            language: 'html',
            code: localizationTemplateSrcH
        },
        {
            language: 'typescript',
            code: localizationTemplateSrcT
        }
    ];

    localizationTextarea: ExampleFile[] = [
        {
            language: 'html',
            code: localizationTextareaSrcH
        },
        {
            language: 'typescript',
            code: localizationTextareaSrcT
        }
    ];

    localizationForms: ExampleFile[] = [
        {
            language: 'html',
            code: localizationFormsSrcH
        },
        {
            language: 'typescript',
            code: localizationFormsSrcT
        }
    ];

    constructor() {}

    ngOnInit() {}
}
