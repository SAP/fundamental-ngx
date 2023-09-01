import { Component } from '@angular/core';

const datepickerHtml = 'platform-date-picker-example.component.html';
const datepickerts = 'platform-date-picker-example.component.ts';
const datepickeri18nHtml = 'platform-date-picker-i18n-example.component.html';
const datepickeri18nTs = 'platform-date-picker-i18n-example.component.ts';
const datepickerDisabledFnCodeTs = 'platform-date-picker-disable-func-example.component.ts';
const datepickerDisabledFnHtml = 'platform-date-picker-disable-func-example.component.html';
const datepickerFormatTs = 'platform-date-picker-format-example.component.ts';
const datepickerFormatHtml = 'platform-date-picker-format-example.component.html';
const datePickerUpdateOnBlurSrcTs = 'platform-date-picker-update-on-blur-example.component.ts';

const datepickerMobileTs = 'mobile/platform-date-picker-mobile-example.component.ts';
const datepickerMobileHtml = 'mobile/platform-date-picker-mobile-example.component.html';

import { RouterLink } from '@angular/router';
import { FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { PlatformDatePickerMobileExampleComponent } from './examples/mobile/platform-date-picker-mobile-example.component';
import { PlatformDatePickerDisableFuncExampleComponent } from './examples/platform-date-picker-disable-func-example.component';
import { PlatformDatePickerExampleComponent } from './examples/platform-date-picker-example.component';
import { PlatformDatePickerFormatExampleComponent } from './examples/platform-date-picker-format-example.component';
import { PlatformDatePickeri18nExampleComponent } from './examples/platform-date-picker-i18n-example.component';
import { PlatformDatePickerUpdateOnBlurExampleComponent } from './examples/platform-date-picker-update-on-blur-example.component';

@Component({
    selector: 'app-datepicker',
    templateUrl: './platform-date-picker-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformDatePickerExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        PlatformDatePickerDisableFuncExampleComponent,
        PlatformDatePickerFormatExampleComponent,
        RouterLink,
        PlatformDatePickeri18nExampleComponent,
        PlatformDatePickerUpdateOnBlurExampleComponent,
        PlatformDatePickerMobileExampleComponent,
        FdDatetimeModule
    ]
})
export class PlatformDatePickerDocsComponent {
    datePickerExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(datepickerHtml),
            fileName: 'platform-date-picker-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(datepickerts),
            fileName: 'platform-date-picker-example',
            component: 'PlatformDatePickerExampleComponent'
        }
    ];

    datePickeri18nExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(datepickeri18nHtml),
            fileName: 'platform-date-picker-i18n-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(datepickeri18nTs),
            fileName: 'platform-date-picker-i18n-example',
            component: 'PlatformDatePickeri18nExampleComponent'
        }
    ];

    datePickerDisableFunction: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(datepickerDisabledFnHtml),
            fileName: 'platform-date-picker-disable-func-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(datepickerDisabledFnCodeTs),
            fileName: 'platform-date-picker-disable-func-example',
            component: 'PlatformDatePickerDisableFuncExampleComponent'
        }
    ];

    datePickerFormat: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(datepickerFormatTs),
            fileName: 'platform-date-picker-format-example',
            component: 'PlatformDatePickerFormatExampleComponent'
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(datepickerFormatHtml),
            fileName: 'platform-date-picker-format-example',
            component: 'PlatformDatePickerFormatExampleComponent'
        }
    ];

    datePickerUpdateOnBlur: ExampleFile[] = [
        {
            language: 'typescript',
            component: 'DatePickerUpdateOnBlurExampleComponent',
            code: getAssetFromModuleAssets(datePickerUpdateOnBlurSrcTs),
            fileName: 'date-picker-update-on-blur-example'
        }
    ];

    datePickerMobile: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(datepickerMobileTs),
            fileName: 'platform-date-picker-mobile-example',
            component: 'PlatformDatePickerMobileExampleComponent'
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(datepickerMobileHtml),
            fileName: 'platform-date-picker-mobile-example',
            component: 'PlatformDatePickerMobileExampleComponent'
        }
    ];
}
