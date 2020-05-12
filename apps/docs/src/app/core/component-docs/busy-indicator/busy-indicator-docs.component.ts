import { Component } from '@angular/core';

import * as BusyIndicatorHtml from '!raw-loader!./examples/busy-indicator-basic-example.component.html';
import * as BusyIndicatorSizeHtml from '!raw-loader!./examples/busy-indicator-size-example.component.html';
import * as BusyIndicatorWrapperHtml from '!raw-loader!./examples/busy-indicator-wrapper-example.component.html';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-busy-indicator-docs',
    templateUrl: './busy-indicator-docs.component.html'
})
export class BusyIndicatorDocsComponent {
    busyIndicatorBasicExample: ExampleFile[] = [
        {
            language: 'html',
            code: BusyIndicatorHtml,
            fileName: 'busy-indicator-basic-example'
        }
    ];
    busyIndicatorSizeExample: ExampleFile[] = [
        {
            language: 'html',
            code: BusyIndicatorSizeHtml,
            fileName: 'busy-indicator-size-example'
        }
    ];
    busyIndicatorWrapperExample: ExampleFile[] = [
        {
            language: 'html',
            code: BusyIndicatorWrapperHtml,
            fileName: 'busy-indicator-wrapper-example'
        }
    ];
}
