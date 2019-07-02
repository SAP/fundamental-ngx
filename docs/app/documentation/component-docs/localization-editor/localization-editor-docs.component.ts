import { Component, OnInit } from '@angular/core';

import * as localizationSrc from '!raw-loader!./examples/localization-editor-example.component.html';
import * as localizationTemplateSrc from '!raw-loader!./examples/localization-editor-template-example.component.html';
import * as localizationTextareaSrc from '!raw-loader!./examples/localization-editor-template-example.component.html';
import * as localizationFormsSrcH from '!raw-loader!./examples/localization-editor-forms-example.component.html';
import * as localizationFormsSrcT from '!raw-loader!./examples/localization-editor-forms-example.component.ts';

@Component({
    selector: 'app-localization-editor',
    templateUrl: './localization-editor-docs.component.html'
})
export class LocalizationEditorDocsComponent implements OnInit {
    localizationHtml = localizationSrc;
    localizationTemplateHtml = localizationTemplateSrc;
    localizationTextareaHtml = localizationTextareaSrc;
    localizationFormsHtml = localizationFormsSrcH;
    localizationFormsTs = localizationFormsSrcT;

    constructor() {}

    ngOnInit() {}
}
