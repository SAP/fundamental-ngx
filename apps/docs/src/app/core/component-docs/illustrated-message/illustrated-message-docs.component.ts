import { Component } from '@angular/core';


import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import * as illustratedMessageSrc from '!raw-loader!./examples/illustrated-message-example.component.html';
import * as illustratedMessageTsCode from '!raw-loader!./examples/illustrated-message-example.component.ts';

import * as illustratedMessageDialogSrc from '!raw-loader!./examples/illustrated-message-dialog-example.component.html';
import * as illustratedMessageDialogTsCode from '!raw-loader!./examples/illustrated-message-dialog-example.component.ts';

import * as illustratedMessageSpotSrc from '!raw-loader!./examples/illustrated-message-spot-example.component.html';
import * as illustratedMessageSpotTsCode from '!raw-loader!./examples/illustrated-message-spot-example.component.ts';

@Component({
    selector: 'app-illustrated-message',
    templateUrl: './illustrated-message-docs.component.html'
})
export class IllustratedMessageDocsComponent {

    illustratedMessageExample: ExampleFile[] = [
        {
            language: 'html',
            code: illustratedMessageSrc,
            fileName: 'illustrated-message-example'
        },
        {
            language: 'typescript',
            code: illustratedMessageTsCode,
            fileName: 'illustrated-message-example',
            component: 'IllustratedMessageExampleComponent'
        }
    ];

    illustratedMessageDialogExample: ExampleFile[] = [
        {
            language: 'html',
            code: illustratedMessageDialogSrc,
            fileName: 'illustrated-message-dialog-example'
        },
        {
            language: 'typescript',
            code: illustratedMessageDialogTsCode,
            fileName: 'illustrated-message-dialog-example',
            component: 'IllustratedMessageDialogExampleComponent'
        }
    ];

    illustratedMessageSpotExample: ExampleFile[] = [
        {
            language: 'html',
            code: illustratedMessageSpotSrc,
            fileName: 'illustrated-message-spot-example'
        },
        {
            language: 'typescript',
            code: illustratedMessageSpotTsCode,
            fileName: 'illustrated-message-spot-example',
            component: 'IllustratedMessageSpotExampleComponent'
        }
    ];
}
