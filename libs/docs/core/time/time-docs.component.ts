import { Component } from '@angular/core';
import { Schema, SchemaFactoryService } from '@fundamental-ngx/docs/schema';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

const timeFormScssSrc = 'time-form-example.component.scss';

const timeSrc = 'time-example.component.html';
const timeMeridianSrc = 'time-12-example.component.html';
const timeSizesSrcTs = 'time-sizes-example.component.ts';
const timeSizesSrcH = 'time-sizes-example.component.html';
const timeNoSecondsSrc = 'time-no-seconds-example.component.html';
const timeOnlyHoursSrc = 'time-only-hours-example.component.html';

const timeProgramTs = 'time-programmatically-example.component.ts';
const timeProgramH = 'time-programmatically-example.component.html';

const timeSrcTs = 'time-example.component.ts';
const timeMeridianSrcTs = 'time-12-example.component.ts';
const timeNoSpinnersSrcTs = 'time-no-spinners-example/time-no-spinners-example.component.ts';
const timeNoSpinnersSrcH = 'time-no-spinners-example/time-no-spinners-example.component.html';
const timeNoSecondsSrcTs = 'time-no-seconds-example.component.ts';
const timeOnlyHoursSrcTs = 'time-only-hours-example.component.ts';
const timeTwoDigitsSrcTs = 'time-two-digits-example/time-two-digits-example.component.ts';
const timeTwoDigitsSrcH = 'time-two-digits-example/time-two-digits-example.component.html';

const timeFormHtmlSrc = 'time-form-example.component.html';
const timeFormTsSrc = 'time-form-example.component.ts';

@Component({
    selector: 'app-time',
    templateUrl: './time-docs.component.html'
})
export class TimeDocsComponent {
    schema: Schema;
    data: any = {
        properties: {
            hour: 12,
            minute: 0,
            second: 0
        }
    };

    timeBasic: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'time-example',
            code: getAssetFromModuleAssets(timeSrc),
            typescriptFileCode: getAssetFromModuleAssets(timeSrcTs),
            component: 'TimeExampleComponent'
        }
    ];

    timeMeridian: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'time-12-example',
            code: getAssetFromModuleAssets(timeMeridianSrc),
            typescriptFileCode: getAssetFromModuleAssets(timeMeridianSrcTs),
            component: 'Time12ExampleComponent'
        }
    ];

    timeSizes: ExampleFile[] = [
        {
            language: 'html',
            standalone: true,
            fileName: 'time-sizes-example',
            typescriptFileCode: getAssetFromModuleAssets(timeSizesSrcTs),
            code: getAssetFromModuleAssets(timeSizesSrcH),
            component: 'TimeSizesExampleComponent'
        }
    ];

    timeProgramaticalyChange: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'time-programmatically-example',
            code: getAssetFromModuleAssets(timeProgramH),
            typescriptFileCode: getAssetFromModuleAssets(timeProgramTs),
            component: 'TimeProgrammaticallyExampleComponent'
        }
    ];

    timeNoSeconds: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'time-no-seconds-example',
            code: getAssetFromModuleAssets(timeNoSecondsSrc),
            typescriptFileCode: getAssetFromModuleAssets(timeNoSecondsSrcTs),
            component: 'TimeNoSecondsExampleComponent'
        }
    ];

    timeNoSpinners: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'time-no-spinners-example',
            code: getAssetFromModuleAssets(timeNoSpinnersSrcH),
            typescriptFileCode: getAssetFromModuleAssets(timeNoSpinnersSrcTs),
            component: 'TimeNoSpinnersExampleComponent'
        }
    ];

    timeTwoDigits: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'time-two-digits-example',
            code: getAssetFromModuleAssets(timeTwoDigitsSrcH),
            typescriptFileCode: getAssetFromModuleAssets(timeTwoDigitsSrcTs),
            component: 'TimeTwoDigitsExampleComponent'
        }
    ];

    timeOnlyHours: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'time-only-hours-example',
            code: getAssetFromModuleAssets(timeOnlyHoursSrc),
            typescriptFileCode: getAssetFromModuleAssets(timeOnlyHoursSrcTs),
            component: 'TimeOnlyHoursExampleComponent'
        }
    ];

    timeForm: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(timeFormHtmlSrc),
            fileName: 'time-form-example',
            scssFileCode: getAssetFromModuleAssets(timeFormScssSrc)
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(timeFormTsSrc),
            fileName: 'time-form-example',
            component: 'TimeFormExampleComponent'
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('time');
    }

    onSchemaValues(data): void {
        this.data = data;
    }
}
