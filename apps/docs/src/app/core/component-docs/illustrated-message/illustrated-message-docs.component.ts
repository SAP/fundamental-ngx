import { Component } from '@angular/core';

import * as illustratedMessageSrc from '!raw-loader!./examples/illustrated-message-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import * as illustratedMessageTsCode from '!raw-loader!./examples/illustrated-message-example.component.ts';
import * as illustratedMessageScssCode from '!raw-loader!./examples/illustrated-message-example.component.scss';

@Component({
    selector: 'app-illustrated-message',
    templateUrl: './illustrated-message-docs.component.html'
})
export class IllustratedMessageDocsComponent {

    data: any = {
        properties: {
            glyphs: 'accelerated'
        },
        modifier: {
            block: 'default'
        }
    };

    illustratedMessageExample: ExampleFile[] = [
        {
            language: 'html',
            code: illustratedMessageSrc,
            fileName: 'illustrated-message-example',
            typescriptFileCode: illustratedMessageTsCode,
            component: 'illustrated-messageExampleComponent',
            scssFileCode: illustratedMessageScssCode
        }
    ];
}
