import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const StatusIndicatorDefaultComponent = 'status-indicator-default.component.html';
const StatusIndicatorSizeComponent = 'status-indicator-size.component.html';
const StatusIndicatorFillTypeComponent = 'status-indicator-fill-type.component.html';
const StatusIndicatorLabelComponent = 'status-indicator-label.component.html';
const StatusIndicatorAngledFillingComponent = 'status-indicator-angled-filling.component.html';
const StatusIndicatorCircularFillingClockComponent = 'status-indicator-cirular-fill-clockwise.component.html';
const StatusIndicatorCircularFillingAntiClockComponent = 'status-indicator-cirular-fill-anti-clockwise.component.html';
const StatusIndicatorlinearFillingComponent = 'status-indicator-linear-fill-type.component.html';
const StatusIndicatorDefaultComponentTs = 'status-indicator-default.component.ts';
const StatusIndicatorSizeComponentTs = 'status-indicator-size.component.ts';
const StatusIndicatorFillTypeComponentTs = 'status-indicator-fill-type.component.ts';
const StatusIndicatorLabelComponentTs = 'status-indicator-label.component.ts';
const StatusIndicatorAngledFillingComponentTs = 'status-indicator-angled-filling.component.ts';
const StatusIndicatorCircularFillingClockComponentTs = 'status-indicator-cirular-fill-clockwise.component.ts';
const StatusIndicatorCircularFillingAntiClockComponentTs = 'status-indicator-cirular-fill-anti-clockwise.component.ts';
const StatusIndicatorlinearFillingComponentTs = 'status-indicator-linear-fill-type.component.ts';
const StatusIndicatorClickAbleFillingComponent = 'status-indicator-clickable-type.component.html';
const StatusIndicatorClickAbleFillingComponentTs = 'status-indicator-clickable-type.component.ts';

@Component({
    selector: 'fd-status-indicator-docs',
    templateUrl: './status-indicator-docs.component.html',
    styleUrls: ['status-indicator-docs.component.scss']
})
export class StatusIndicatorDocsComponent {
    defaultStatusIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(StatusIndicatorDefaultComponent),
            fileName: 'status-indicator-default'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(StatusIndicatorDefaultComponentTs),
            fileName: 'status-indicator-default',
            component: 'StatusIndicatorDefaultComponent'
        }
    ];
    sizeStatusIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(StatusIndicatorSizeComponent),
            fileName: 'status-indicator-size'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(StatusIndicatorSizeComponentTs),
            fileName: 'status-indicator-size',
            component: 'StatusIndicatorSizeComponent'
        }
    ];
    fillTypeStatusIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(StatusIndicatorFillTypeComponent),
            fileName: 'status-indicator-fill-type'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(StatusIndicatorFillTypeComponentTs),
            fileName: 'status-indicator-fill-type',
            component: 'StatusIndicatorFillTypeComponent'
        }
    ];
    labelStatusIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(StatusIndicatorLabelComponent),
            fileName: 'status-indicator-label'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(StatusIndicatorLabelComponentTs),
            fileName: 'status-indicator-label',
            component: 'StatusIndicatorLabelComponent'
        }
    ];
    angeledFillingStatusIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(StatusIndicatorAngledFillingComponent),
            fileName: 'status-indicator-angeled-fillling'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(StatusIndicatorAngledFillingComponentTs),
            fileName: 'status-indicator-angeled-fillling',
            component: 'StatusIndicatorAngledFillingComponent'
        }
    ];
    circularClockFillingStatusIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(StatusIndicatorCircularFillingClockComponent),
            fileName: 'status-indicator-cirular-fill-clockwise'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(StatusIndicatorCircularFillingClockComponentTs),
            fileName: 'status-indicator-cirular-fill-clockwise',
            component: 'StatusIndicatorCircularFillingClockComponent'
        }
    ];
    circularAntiClockFillingStatusIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(StatusIndicatorCircularFillingAntiClockComponent),
            fileName: 'status-indicator-cirular-fill-anti-clockwise'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(StatusIndicatorCircularFillingAntiClockComponentTs),
            fileName: 'status-indicator-cirular-fill-anti-clockwise',
            component: 'StatusIndicatorCircularFillingAntiClockComponent'
        }
    ];
    linearFillingStatusIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(StatusIndicatorlinearFillingComponent),
            fileName: 'status-indicator-linear-fill-type'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(StatusIndicatorlinearFillingComponentTs),
            fileName: 'status-indicator-linear-fill-type',
            component: 'StatusIndicatorlinearFillingComponent'
        }
    ];
    clickAbleFillingStatusIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(StatusIndicatorClickAbleFillingComponent),
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
