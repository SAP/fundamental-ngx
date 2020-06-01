import { Component } from '@angular/core';
import * as datepickerHtml from '!raw-loader!./platform-date-picker-examples/platform-date-picker-example.component.html';
import * as datepickerts from '!raw-loader!./platform-date-picker-examples/platform-date-picker-examples.component.ts';
import * as datepickertInts from '!raw-loader!./platform-date-picker-examples/platform-date-picker-international.component.ts';
import * as datepickeri18n from '!raw-loader!./platform-date-picker-examples/platform-date-picker-complexi18n.component.ts';
import * as datepickerDisabledFn from '!raw-loader!./platform-date-picker-examples/platform-date-picker-disablesfunc.component.ts';
import * as datepickerPlacement from '!raw-loader!./platform-date-picker-examples/platform-date-picker-placement.component.ts';

import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-date-picker',
    templateUrl: './platform-date-picker-docs.component.html'
})
export class PlatformDatePickerDocsComponent {
    datePickerExample: ExampleFile[] = [
        {
            language: 'html',
            code: datepickerHtml,
            fileName: 'platform-date-picker-example'
        },
        {
            language: 'typescript',
            code: datepickerts,
            fileName: 'platform-date-picker-example',
            component: 'PlatformDatePickerExampleComponent'
        }
    ];

    datePickerIntExample: ExampleFile[] = [
        {
            language: 'typescript',
            code: datepickertInts,
            fileName: 'platform-date-picker-international',
            component: 'PlatformDatePickerIntExampleComponent'
        }
    ];

    datePickeri18nExample: ExampleFile[] = [
        {
            language: 'typescript',
            code: datepickeri18n,
            fileName: 'platform-date-picker-complexi18n',
            component: 'PlatformDatePickerIntExampleComponent'
        }
    ];

    datePickerDisableFunction: ExampleFile[] = [
        {
            language: 'typescript',
            code: datepickerDisabledFn,
            fileName: 'platform-date-picker-disablesfunc',
            component: 'PlatformDisabledFuncDatePickerComponent'
        }
    ];

    datePickerPlacement: ExampleFile[] = [
        {
            language: 'typescript',
            code: datepickerPlacement,
            fileName: 'platform-date-picker-placement',
            component: 'PlatformDatePickerPlacementComponent'
        }
    ];

    constructor() {}
}
