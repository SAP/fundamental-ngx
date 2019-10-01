import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as formHtml from '!raw-loader!./examples/select-native-example.component.html';
import * as formInlineHelpHtml from '!raw-loader!./examples/select-native-inline-help-example.component.html';
import * as formStateHtml from '!raw-loader!./examples/select-native-state-example.component.html';
import * as formGroupSelectHtml from '!raw-loader!./examples/select-native-form-group-example.component.html';
import * as formGroupSelectTs from '!raw-loader!./examples/select-native-form-group-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../../documentation/core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-select',
    templateUrl: './select-native-docs.component.html'
})
export class SelectNativeDocsComponent implements OnInit {
    selectFormHtml: ExampleFile[] = [
        {
            language: 'html',
            code: formHtml
        }
    ];

    selectHelpFormHtml: ExampleFile[] = [
        {
            language: 'html',
            code: formInlineHelpHtml
        }
    ];

    selectStatesFormHtml: ExampleFile[] = [
        {
            language: 'html',
            code: formStateHtml
        }
    ];

    formGroupSelect: ExampleFile[] = [
        {
            language: 'html',
            code: formGroupSelectHtml
        },
        {
            language: 'typescript',
            code: formGroupSelectTs
        }
    ];

    ngOnInit() {}
}
