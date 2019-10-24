import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as formHtml from '!raw-loader!./examples/textarea-example.component.html';
import * as textareaTscode from '!raw-loader!./examples/textarea-examples.component.ts';
import * as formInlineHelpHtml from '!raw-loader!./examples/textarea-inline-help-example.component.html';
import * as formStateHtml from '!raw-loader!./examples/textarea-state-example.component.html';
import * as formGroupInputHtml from '!raw-loader!./examples/textarea-form-group-example.component.html';
import * as formGroupInputScss from '!raw-loader!./examples/textarea-form-group-example.component.scss';
import * as formGroupInputTs from '!raw-loader!./examples/textarea-form-group-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../../documentation/core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-input',
    templateUrl: './textarea-docs.component.html'
})
export class TextareaDocsComponent implements OnInit {
    textareaHtml: ExampleFile[] = [
        {
            language: 'html',
            code: formHtml,
            fileName: 'textarea-example',
            secondFile: 'textarea-examples',
            typescriptFileCode: textareaTscode,
            component: 'TextareaExampleComponent'
        }
    ];

    textareaHelpHtml: ExampleFile[] = [
        {
            language: 'html',
            code: formInlineHelpHtml,
            fileName: 'textarea-inline-help-example',
            secondFile: 'textarea-examples',
            typescriptFileCode: textareaTscode,
            component: 'TextareaInlineHelpExampleComponent'
        }
    ];

    textareaStatesHtml: ExampleFile[] = [
        {
            language: 'html',
            code: formStateHtml,
            fileName: 'textarea-state-example',
            secondFile: 'textarea-examples',
            typescriptFileCode: textareaTscode,
            component: 'TextareaStateExampleComponent'
        }
    ];

    textareaFormGroup: ExampleFile[] = [
        {
            language: 'html',
            code: formGroupInputHtml,
            fileName: 'textarea-form-group-example',
            scssFileCode: formGroupInputScss
        },
        {
            language: 'typescript',
            code: formGroupInputTs,
            fileName: 'textarea-form-group-example',
            component: 'TextareaFormGroupExampleComponent'
        }
    ];

    ngOnInit() { }
}
