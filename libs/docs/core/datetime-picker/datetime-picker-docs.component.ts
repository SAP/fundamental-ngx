import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DatetimeImportantComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { DatetimePickerAllowNullExampleComponent } from './examples/datetime-allow-null-example/datetime-allow-null-example.component';
import { DatetimeDisabledExampleComponent } from './examples/datetime-disabled-example/datetime-disabled-example.component';
import { DatetimeExampleComponent } from './examples/datetime-example/datetime-example.component';
import { DatetimeFormExampleComponent } from './examples/datetime-form-example/datetime-form-example.component';
import { DatetimeFormatExampleComponent } from './examples/datetime-format-example/datetime-format-example.component';
import { DatetimeMobileExampleComponent } from './examples/datetime-mobile/datetime-mobile-example.component';
import { DatetimePickerComplexI18nExampleComponent } from './examples/datetime-picker-complex-i18n-example/datetime-picker-complex-i18n-example.component';
import { DateTimePickerUpdateOnBlurExampleComponent } from './examples/datetime-picker-update-on-blur-example/datetime-picker-update-on-blur-example.component';
import { DatetimeProgramExampleComponent } from './examples/datetime-program-example/datetime-program-example.component';

const datetimeUpdateOnBlurSrcTs =
    'datetime-picker-update-on-blur-example/datetime-picker-update-on-blur-example.component.ts';

const dateTimeSimpleHtml = 'datetime-example/datetime-example.component.html';
const dateTimeSimpleTs = 'datetime-example/datetime-example.component.ts';

const dateTimeProgHtml = 'datetime-program-example/datetime-program-example.component.html';
const dateTimeProgTs = 'datetime-program-example/datetime-program-example.component.ts';

const dateTimePickerAllowNullTs = 'datetime-allow-null-example/datetime-allow-null-example.component.ts';

const dateTimeFormatHtml = 'datetime-format-example/datetime-format-example.component.html';
const dateTimeFormatTs = 'datetime-format-example/datetime-format-example.component.ts';

const datetimeI18nComplexTs = 'datetime-picker-complex-i18n-example/datetime-picker-complex-i18n-example.component.ts';
const datetimeI18nComplexH = 'datetime-picker-complex-i18n-example/datetime-picker-complex-i18n-example.component.html';

const dateTimeDisabledHtml = 'datetime-disabled-example/datetime-disabled-example.component.html';
const dateTimeDisabledTs = 'datetime-disabled-example/datetime-disabled-example.component.ts';
const dateTimeFormHtml = 'datetime-form-example/datetime-form-example.component.html';
const dateTimeFormTs = 'datetime-form-example/datetime-form-example.component.ts';

const dateTimeMobileHtml = 'datetime-mobile/datetime-mobile-example.component.html';
const dateTimeMobileTs = 'datetime-mobile/datetime-mobile-example.component.ts';

@Component({
    selector: 'app-datetime-picker-docs',
    templateUrl: './datetime-picker-docs.component.html',
    styleUrls: ['./datetime-picker-docs.component.scss'],
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        DatetimeExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        DatetimeProgramExampleComponent,
        DatetimePickerAllowNullExampleComponent,
        DatetimeFormatExampleComponent,
        DatetimeDisabledExampleComponent,
        DatetimeFormExampleComponent,
        DatetimeImportantComponent,
        DatetimePickerComplexI18nExampleComponent,
        DateTimePickerUpdateOnBlurExampleComponent,
        RouterLink,
        DatetimeMobileExampleComponent
    ]
})
export class DatetimePickerDocsComponent {
    datetimePickerSingle: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dateTimeSimpleHtml),
            fileName: 'datetime-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(dateTimeSimpleTs),
            fileName: 'datetime-example',
            component: 'DatetimeExampleComponent'
        }
    ];

    datetimeProgram: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dateTimeProgHtml),
            fileName: 'datetime-program-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(dateTimeProgTs),
            fileName: 'datetime-program-example',
            component: 'DatetimeProgramExampleComponent'
        }
    ];

    datetimeFormat: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dateTimeFormatHtml),
            fileName: 'datetime-format-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(dateTimeFormatTs),
            fileName: 'datetime-format-example',
            component: 'DatetimeFormatExampleComponent'
        }
    ];

    datetimeDisabled: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dateTimeDisabledHtml),
            fileName: 'datetime-disabled-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(dateTimeDisabledTs),
            fileName: 'datetime-disabled-example',
            component: 'DatetimeDisabledExampleComponent'
        }
    ];

    datetimeForm: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(dateTimeFormHtml),
            fileName: 'datetime-form-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(dateTimeFormTs),
            fileName: 'datetime-form-example',
            component: 'DatetimeFormExampleComponent'
        }
    ];

    datetimePickerAllowNull: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(dateTimePickerAllowNullTs),
            fileName: 'date-time-picker-allow-null-example',
            component: 'DatetimePickerAllowNullExampleComponent'
        }
    ];

    datetimeI18nComplex: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(datetimeI18nComplexTs),
            fileName: 'datetime-picker-complex-i18n-example',
            component: 'DatetimePickerComplexI18nExampleComponent'
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(datetimeI18nComplexH),
            fileName: 'datetime-picker-complex-i18n-example',
            component: 'DatetimePickerComplexI18nExampleComponent'
        }
    ];

    dateTimePickerUpdateOnBlur: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(datetimeUpdateOnBlurSrcTs),
            fileName: 'datetime-picker-update-on-blur-example',
            component: 'DateTimePickerUpdateOnBlurExampleComponent'
        }
    ];

    datetimeMobile: ExampleFile[] = [
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(dateTimeMobileTs),
            fileName: 'datetime-mobile-example',
            component: 'DatetimeMobileExampleComponent'
        },
        {
            language: 'html',
            code: getAssetFromModuleAssets(dateTimeMobileHtml),
            fileName: 'datetime-mobile-example',
            component: 'DatetimeMobileExampleComponent'
        }
    ];
}
