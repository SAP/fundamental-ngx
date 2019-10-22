import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';

import * as formHtml from '!raw-loader!./examples/checkbox-example.component.html';
import * as formHtmlTsCode from '!raw-loader!./examples/checkbox-examples.component.ts';
import * as formGroupInputHtml from '!raw-loader!./examples/checkbox-form-group-example.component.html';
import * as formGroupInputTs from '!raw-loader!./examples/checkbox-form-group-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../../documentation/core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-input',
    templateUrl: './checkbox-docs.component.html'
})
export class CheckboxDocsComponent implements OnInit {
    checkboxFormHtml: ExampleFile[] = [
        {
            language: 'html',
            code: formHtml,
            fileName: 'checkbox-example',
            component: 'CheckboxExample',
            secondFile: 'checkbox-examples',
            typescriptFileCode: formHtmlTsCode
        }
    ];

    checkboxFormGroup: ExampleFile[] = [
        {
            language: 'html',
            code: formGroupInputHtml,
            fileName: 'checkbox-form-group-example'
        },
        {
            language: 'typescript',
            code: formGroupInputTs,
            fileName: 'checkbox-form-group-example',
            component: 'CheckboxFormGroupExampleComponent'
        }
    ];

    ngOnInit() { }
}
