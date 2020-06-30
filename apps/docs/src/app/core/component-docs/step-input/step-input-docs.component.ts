import { Component, ViewEncapsulation } from '@angular/core';

import * as stepInputDefaultSrc from '!raw-loader!./examples/step-inpt-default-example/step-input-default-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-select',
    templateUrl: './step-input-docs.component.html',
    styleUrls: ['./step-input-docs.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class StepInputDocsComponent {
    stepInput: ExampleFile[] = [
        {
            language: 'ts',
            code: stepInputDefaultSrc,
            fileName: 'step-input-default-example'
        }
    ];
}
