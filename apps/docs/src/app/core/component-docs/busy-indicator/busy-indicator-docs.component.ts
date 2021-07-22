import { Component } from '@angular/core';

import * as BusyIndicatorHtml from '!raw-loader!./examples/busy-indicator-basic-example.component.html';
import * as BusyIndicatorSizeHtml from '!raw-loader!./examples/busy-indicator-size-example.component.html';
import * as BusyIndicatorLabelHtml from '!raw-loader!./examples/busy-indicator-label-example.component.html';
import * as BusyIndicatorExtendedHtml from '!raw-loader!./examples/busy-indicator-extended-example.component.html';
import * as BusyIndicatorExtendedTs from '!raw-loader!./examples/busy-indicator-extended-example.component.ts';
import * as BusyIndicatorWrapperTs from '!raw-loader!./examples/busy-indicator-wrapper-example.component.ts';
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
    busyIndicatorLabelExample: ExampleFile[] = [
        {
            language: 'html',
            code: BusyIndicatorLabelHtml,
            fileName: 'busy-indicator-label-example'
        }
    ];
    busyIndicatorExtendedExample: ExampleFile[] = [
        {
            language: 'html',
            code: BusyIndicatorExtendedHtml,
            fileName: 'busy-indicator-extended-example'
        },
        {
            language: 'typescript',
            code: BusyIndicatorExtendedTs,
            fileName: 'busy-indicator-extended-example',
            component: 'BusyIndicatorExtendedExampleComponent'
        }
    ];
    busyIndicatorWrapperExample: ExampleFile[] = [
        {
            language: 'html',
            code: BusyIndicatorWrapperHtml,
            fileName: 'busy-indicator-wrapper-example'
        },
        {
            language: 'typescript',
            code: BusyIndicatorWrapperTs,
            fileName: 'busy-indicator-wrapper-example',
            component: 'BusyIndicatorWrapperExampleComponent'
        }
    ];
}
