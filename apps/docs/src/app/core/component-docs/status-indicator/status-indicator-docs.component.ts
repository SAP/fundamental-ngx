import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import StatusIndicatorDefaultComponent from '!./example/status-indicator-default.component.html?raw';
import StatusIndicatorSizeComponent from '!./example/status-indicator-size.component.html?raw';
import StatusIndicatorFillTypeComponent from '!./example/status-indicator-fill-type.component.html?raw';
import StatusIndicatorLabelComponent from '!./example/status-indicator-label.component.html?raw';
import StatusIndicatorAngledFillingComponent from '!./example/status-indicator-angled-filling.component.html?raw';
import StatusIndicatorCircularFillingClockComponent from '!./example/status-indicator-cirular-fill-clockwise.component.html?raw';
import StatusIndicatorCircularFillingAntiClockComponent from '!./example/status-indicator-cirular-fill-anti-clockwise.component.html?raw';
import StatusIndicatorlinearFillingComponent from '!./example/status-indicator-linear-fill-type.component.html?raw';
import StatusIndicatorDefaultComponentTs from '!./example/status-indicator-default.component.ts?raw';
import StatusIndicatorSizeComponentTs from '!./example/status-indicator-size.component.ts?raw';
import StatusIndicatorFillTypeComponentTs from '!./example/status-indicator-fill-type.component.ts?raw';
import StatusIndicatorLabelComponentTs from '!./example/status-indicator-label.component.ts?raw';
import StatusIndicatorAngledFillingComponentTs from '!./example/status-indicator-angled-filling.component.ts?raw';
import StatusIndicatorCircularFillingClockComponentTs from '!./example/status-indicator-cirular-fill-clockwise.component.ts?raw';
import StatusIndicatorCircularFillingAntiClockComponentTs from '!./example/status-indicator-cirular-fill-anti-clockwise.component.ts?raw';
import StatusIndicatorlinearFillingComponentTs from '!./example/status-indicator-linear-fill-type.component.ts?raw';
import StatusIndicatorClickAbleFillingComponent from '!./example/status-indicator-clickable-type.component.html?raw';
import StatusIndicatorClickAbleFillingComponentTs from '!./example/status-indicator-clickable-type.component.ts?raw';

@Component({
    selector: 'fd-status-indicator-docs',
    templateUrl: './status-indicator-docs.component.html',
    styleUrls: ['status-indicator-docs.component.scss']
})
export class StatusIndicatorDocsComponent {
    defaultStatusIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: StatusIndicatorDefaultComponent,
            fileName: 'status-indicator-default'
        },
        {
            language: 'typescript',
            code: StatusIndicatorDefaultComponentTs,
            fileName: 'status-indicator-default',
            component: 'StatusIndicatorDefaultComponent'
        }
    ];
    sizeStatusIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: StatusIndicatorSizeComponent,
            fileName: 'status-indicator-size'
        },
        {
            language: 'typescript',
            code: StatusIndicatorSizeComponentTs,
            fileName: 'status-indicator-size',
            component: 'StatusIndicatorSizeComponent'
        }
    ];
    fillTypeStatusIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: StatusIndicatorFillTypeComponent,
            fileName: 'status-indicator-fill-type'
        },
        {
            language: 'typescript',
            code: StatusIndicatorFillTypeComponentTs,
            fileName: 'status-indicator-fill-type',
            component: 'StatusIndicatorFillTypeComponent'
        }
    ];
    labelStatusIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: StatusIndicatorLabelComponent,
            fileName: 'status-indicator-label'
        },
        {
            language: 'typescript',
            code: StatusIndicatorLabelComponentTs,
            fileName: 'status-indicator-label',
            component: 'StatusIndicatorLabelComponent'
        }
    ];
    angeledFillingStatusIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: StatusIndicatorAngledFillingComponent,
            fileName: 'status-indicator-angeled-fillling'
        },
        {
            language: 'typescript',
            code: StatusIndicatorAngledFillingComponentTs,
            fileName: 'status-indicator-angeled-fillling',
            component: 'StatusIndicatorAngledFillingComponent'
        }
    ];
    circularClockFillingStatusIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: StatusIndicatorCircularFillingClockComponent,
            fileName: 'status-indicator-cirular-fill-clockwise'
        },
        {
            language: 'typescript',
            code: StatusIndicatorCircularFillingClockComponentTs,
            fileName: 'status-indicator-cirular-fill-clockwise',
            component: 'StatusIndicatorCircularFillingClockComponent'
        }
    ];
    circularAntiClockFillingStatusIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: StatusIndicatorCircularFillingAntiClockComponent,
            fileName: 'status-indicator-cirular-fill-anti-clockwise'
        },
        {
            language: 'typescript',
            code: StatusIndicatorCircularFillingAntiClockComponentTs,
            fileName: 'status-indicator-cirular-fill-anti-clockwise',
            component: 'StatusIndicatorCircularFillingAntiClockComponent'
        }
    ];
    linearFillingStatusIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: StatusIndicatorlinearFillingComponent,
            fileName: 'status-indicator-linear-fill-type'
        },
        {
            language: 'typescript',
            code: StatusIndicatorlinearFillingComponentTs,
            fileName: 'status-indicator-linear-fill-type',
            component: 'StatusIndicatorlinearFillingComponent'
        }
    ];
    clickAbleFillingStatusIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: StatusIndicatorClickAbleFillingComponent,
            fileName: 'status-indicator-clickable-type'
        },
        {
            language: 'typescript',
            code: StatusIndicatorClickAbleFillingComponentTs,
            fileName: 'status-indicator-clickable-type',
            component: 'StatusIndicatorlinearFillingComponent'
        }
    ];
}
