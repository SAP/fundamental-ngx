import { Component } from '@angular/core';

import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { StatusIndicatorAngeledFillingComponent } from './examples/status-indicator-angled-filling.component';
import { StatusIndicatorCircularFillAntiClockwiseComponent } from './examples/status-indicator-circular-fill-anti-clockwise.component';
import { StatusIndicatorCircularFillClockwiseComponent } from './examples/status-indicator-circular-fill-clockwise.component';
import { StatusIndicatorClickableTypeComponent } from './examples/status-indicator-clickable-type.component';
import { StatusIndicatorDefaultComponent as StatusIndicatorDefaultComponent_1 } from './examples/status-indicator-default.component';
import { StatusIndicatorFillTypeComponent as StatusIndicatorFillTypeComponent_1 } from './examples/status-indicator-fill-type.component';
import { StatusIndicatorLabelComponent as StatusIndicatorLabelComponent_1 } from './examples/status-indicator-label.component';
import { StatusIndicatorLinearFillTypeComponent } from './examples/status-indicator-linear-fill-type.component';
import { StatusIndicatorSizeComponent as StatusIndicatorSizeComponent_1 } from './examples/status-indicator-size.component';

const StatusIndicatorDefaultComponent = 'status-indicator-default.component.html';
const StatusIndicatorSizeComponent = 'status-indicator-size.component.html';
const StatusIndicatorFillTypeComponent = 'status-indicator-fill-type.component.html';
const StatusIndicatorLabelComponent = 'status-indicator-label.component.html';
const StatusIndicatorAngledFillingComponent = 'status-indicator-angled-filling.component.html';
const StatusIndicatorCircularFillingClockComponent = 'status-indicator-circular-fill-clockwise.component.html';
const StatusIndicatorCircularFillingAntiClockComponent = 'status-indicator-circular-fill-anti-clockwise.component.html';
const StatusIndicatorlinearFillingComponent = 'status-indicator-linear-fill-type.component.html';
const StatusIndicatorDefaultComponentTs = 'status-indicator-default.component.ts';
const StatusIndicatorSizeComponentTs = 'status-indicator-size.component.ts';
const StatusIndicatorFillTypeComponentTs = 'status-indicator-fill-type.component.ts';
const StatusIndicatorLabelComponentTs = 'status-indicator-label.component.ts';
const StatusIndicatorAngledFillingComponentTs = 'status-indicator-angled-filling.component.ts';
const StatusIndicatorCircularFillingClockComponentTs = 'status-indicator-circular-fill-clockwise.component.ts';
const StatusIndicatorCircularFillingAntiClockComponentTs = 'status-indicator-circular-fill-anti-clockwise.component.ts';
const StatusIndicatorlinearFillingComponentTs = 'status-indicator-linear-fill-type.component.ts';
const StatusIndicatorClickAbleFillingComponent = 'status-indicator-clickable-type.component.html';
const StatusIndicatorClickAbleFillingComponentTs = 'status-indicator-clickable-type.component.ts';

@Component({
    selector: 'fd-status-indicator-docs',
    templateUrl: './status-indicator-docs.component.html',
    styleUrls: ['status-indicator-docs.component.scss'],
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        StatusIndicatorDefaultComponent_1,
        CodeExampleComponent,
        SeparatorComponent,
        StatusIndicatorSizeComponent_1,
        StatusIndicatorFillTypeComponent_1,
        StatusIndicatorLabelComponent_1,
        StatusIndicatorLinearFillTypeComponent,
        StatusIndicatorAngeledFillingComponent,
        StatusIndicatorCircularFillClockwiseComponent,
        StatusIndicatorCircularFillAntiClockwiseComponent,
        StatusIndicatorClickableTypeComponent
    ]
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
            fileName: 'status-indicator-angled-filling'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(StatusIndicatorAngledFillingComponentTs),
            fileName: 'status-indicator-angled-filling',
            component: 'StatusIndicatorAngeledFillingComponent'
        }
    ];
    circularClockFillingStatusIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(StatusIndicatorCircularFillingClockComponent),
            fileName: 'status-indicator-circular-fill-clockwise'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(StatusIndicatorCircularFillingClockComponentTs),
            fileName: 'status-indicator-circular-fill-clockwise',
            component: 'StatusIndicatorCircularFillClockwiseComponent'
        }
    ];
    circularAntiClockFillingStatusIndicatorHtmlType: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(StatusIndicatorCircularFillingAntiClockComponent),
            fileName: 'status-indicator-circular-fill-anti-clockwise'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(StatusIndicatorCircularFillingAntiClockComponentTs),
            fileName: 'status-indicator-circular-fill-anti-clockwise',
            component: 'StatusIndicatorCircularFillAntiClockwiseComponent'
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
            code: getAssetFromModuleAssets(StatusIndicatorClickAbleFillingComponentTs),
            fileName: 'status-indicator-clickable-type',
            component: 'StatusIndicatorClickableTypeComponent'
        }
    ];
}
