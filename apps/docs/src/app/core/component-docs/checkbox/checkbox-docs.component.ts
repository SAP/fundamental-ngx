import {Component, OnInit} from '@angular/core';

import * as formHtml from '!raw-loader!./examples/checkbox-example.component.html';
import * as formHtmlTsCode from '!raw-loader!./examples/checkbox-examples.component.ts';
import {ExampleFile} from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-input',
    templateUrl: './checkbox-docs.component.html'
})
export class CheckboxDocsComponent {
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

    // checkboxFormGroup: ExampleFile[] = [
    //     {
    //         language: 'html',
    //         code: formGroupInputHtml,
    //         fileName: 'checkbox-form-group-example'
    //     },
    //     {
    //         language: 'typescript',
    //         code: formGroupInputTs,
    //         fileName: 'checkbox-form-group-example',
    //         component: 'CheckboxFormGroupExampleComponent'
    //     }
    // ];

    // ngOnInit() {
    // }
}
