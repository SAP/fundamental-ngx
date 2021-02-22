import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import * as StatusIndicatorDefaultComponent from '!raw-loader!./example/status-indicator-default.component.html';
import * as StatusIndicatorSizeComponent from '!raw-loader!./example/status-indicator-size.component.html';
import * as StatusIndicatorFillTypeComponent from '!raw-loader!./example/status-indicator-fill-type.component.html';
import * as StatusIndicatorLabelComponent from '!raw-loader!./example/status-indicator-label.component.html';
import * as StatusIndicatorAngledFillingComponent from '!raw-loader!./example/status-indicator-angled-filling.component.html';
import * as StatusIndicatorCircularFillingClockComponent from '!raw-loader!./example/status-indicator-cirular-fill-clockwise.component.html';
import * as StatusIndicatorCircularFillingAntiClockComponent from '!raw-loader!./example/status-indicator-cirular-fill-anti-clockwise.component.html';
import * as StatusIndicatorlinearFillingComponent from '!raw-loader!./example/status-indicator-linear-fill-type.component.html';
import * as StatusIndicatorDefaultComponentTs from '!raw-loader!./example/status-indicator-default.component.ts';
import * as StatusIndicatorSizeComponentTs from '!raw-loader!./example/status-indicator-size.component.ts';
import * as StatusIndicatorFillTypeComponentTs from '!raw-loader!./example/status-indicator-fill-type.component.ts';
import * as StatusIndicatorLabelComponentTs from '!raw-loader!./example/status-indicator-label.component.ts';
import * as StatusIndicatorAngledFillingComponentTs from '!raw-loader!./example/status-indicator-angled-filling.component.ts';
import * as StatusIndicatorCircularFillingClockComponentTs from '!raw-loader!./example/status-indicator-cirular-fill-clockwise.component.ts';
import * as StatusIndicatorCircularFillingAntiClockComponentTs from '!raw-loader!./example/status-indicator-cirular-fill-anti-clockwise.component.ts';
import * as StatusIndicatorlinearFillingComponentTs from '!raw-loader!./example/status-indicator-linear-fill-type.component.ts';
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
}
