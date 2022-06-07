import { Component, ViewEncapsulation } from '@angular/core';

import BusyIndicatorHtml from '!./examples/busy-indicator-basic-example.component.html?raw';
import BusyIndicatorSizeHtml from '!./examples/busy-indicator-size-example.component.html?raw';
import BusyIndicatorSizeTs from '!./examples/busy-indicator-size-example.component.ts?raw';
import BusyIndicatorLabelHtml from '!./examples/busy-indicator-label-example.component.html?raw';
import BusyIndicatorExtendedHtml from '!./examples/busy-indicator-extended-example.component.html?raw';
import BusyIndicatorExtendedTs from '!./examples/busy-indicator-extended-example.component.ts?raw';
import BusyIndicatorWrapperTs from '!./examples/busy-indicator-wrapper-example.component.ts?raw';
import BusyIndicatorWrapperHtml from '!./examples/busy-indicator-wrapper-example.component.html?raw';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-busy-indicator-docs',
    templateUrl: './busy-indicator-docs.component.html',
    styles: [
        `
            app-busy-indicator-docs .fd-button {
                margin-right: 8px;
            }
        `
    ],
    encapsulation: ViewEncapsulation.None
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
        },
        {
            language: 'typescript',
            code: BusyIndicatorSizeTs,
            fileName: 'busy-indicator-size-example',
            component: 'BusyIndicatorSizeExampleComponent'
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
