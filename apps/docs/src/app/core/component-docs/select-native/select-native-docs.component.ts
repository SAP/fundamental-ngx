import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as formHtml from '!raw-loader!./examples/select-native-example.component.html';
import * as formInlineHelpHtml from '!raw-loader!./examples/select-native-inline-help-example.component.html';
import * as formStateHtml from '!raw-loader!./examples/select-native-state-example.component.html';
import * as formGroupSelectHtml from '!raw-loader!./examples/select-native-form-group-example.component.html';
import * as formGroupSelectTs from '!raw-loader!./examples/select-native-form-group-example.component.ts';
import * as formGroupSelectScss from '!raw-loader!./examples/select-native-form-group-example.component.scss';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../../documentation/core-helpers/docs-section-title/docs-section-title.component';
import * as selectNativeTsCode from '!raw-loader!./examples/select-native-examples.component.ts';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-select',
    templateUrl: './select-native-docs.component.html'
})
export class SelectNativeDocsComponent implements OnInit {
    selectFormHtml: ExampleFile[] = [
        {
            language: 'html',
            code: formHtml,
            fileName: 'select-native-example',
        }
    ];

    selectHelpFormHtml: ExampleFile[] = [
        {
            language: 'html',
            code: formInlineHelpHtml,
            fileName: 'select-native-inline-help-example',
        }
    ];

    selectStatesFormHtml: ExampleFile[] = [
        {
            language: 'html',
            code: formStateHtml,
            fileName: 'select-native-state-example',
        }
    ];

    formGroupSelect: ExampleFile[] = [
        {
            language: 'html',
            code: formGroupSelectHtml,
            fileName: 'select-native-form-group-example',
            scssFileCode: formGroupSelectScss
        },
        {
            language: 'typescript',
            code: formGroupSelectTs,
            fileName: 'select-native-form-group-example',
            component: 'SelectNativeFormGroupExampleComponent'
        }
    ];

    ngOnInit() { }
}
