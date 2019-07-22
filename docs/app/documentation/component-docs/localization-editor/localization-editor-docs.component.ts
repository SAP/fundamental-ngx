import { Component, OnInit } from '@angular/core';

import * as localizationSrcH from '!raw-loader!./examples/localization-editor-example.component.html';
import * as localizationSrcT from '!raw-loader!./examples/localization-editor-example.component.ts';
import * as localizationTemplateSrcH from '!raw-loader!./examples/localization-editor-template-example.component.html';
import * as localizationTemplateSrcT from '!raw-loader!./examples/localization-editor-template-example.component.ts';
import * as localizationTextareaSrcH from '!raw-loader!./examples/localization-editor-textarea-example.component.html';
import * as localizationTextareaSrcT from '!raw-loader!./examples/localization-editor-textarea-example.component.ts';
import * as localizationFormsSrcH from '!raw-loader!./examples/localization-editor-forms-example.component.html';
import * as localizationFormsSrcT from '!raw-loader!./examples/localization-editor-forms-example.component.ts';

@Component({
    selector: 'app-localization-editor',
    templateUrl: './localization-editor-docs.component.html'
})
export class LocalizationEditorDocsComponent implements OnInit {
    localizationHtml = localizationSrcH;
    localizationTs = localizationSrcT;
    localizationTemplateHtml = localizationTemplateSrcH;
    localizationTemplateTs = localizationTemplateSrcT;
    localizationTextareaHtml = localizationTextareaSrcH;
    localizationTextareaTs = localizationTextareaSrcT;
    localizationFormsHtml = localizationFormsSrcH;
    localizationFormsTs = localizationFormsSrcT;

    constructor() {}

    ngOnInit() {}
}
