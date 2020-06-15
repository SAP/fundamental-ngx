import { Component } from '@angular/core';

import * as stepInputHtml from '!raw-loader!./examples/step-input-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-select',
    templateUrl: './step-input-docs.component.html'
})
export class StepInputDocsComponent {
    stepInput: ExampleFile[] = [
        {
            language: 'html',
            code: stepInputHtml,
            fileName: 'step-input-example'
        }
    ];
}
