import { Component } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import timeSrc from '!./examples/time-example.component.html?raw';
import timeMeridianSrc from '!./examples/time-12-example.component.html?raw';
import timeSizesSrcTs from '!./examples/time-sizes-example.component.ts?raw';
import timeSizesSrcH from '!./examples/time-sizes-example.component.html?raw';
import timeNoSecondsSrc from '!./examples/time-no-seconds-example.component.html?raw';
import timeOnlyHoursSrc from '!./examples/time-only-hours-example.component.html?raw';

import timeProgramTs from '!./examples/time-programmatically-example.component.ts?raw';
import timeProgramH from '!./examples/time-programmatically-example.component.html?raw';

import timeSrcTs from '!./examples/time-example.component.ts?raw';
import timeMeridianSrcTs from '!./examples/time-12-example.component.ts?raw';
import timeNoSpinnersSrcTs from '!./examples/time-no-spinners-example/time-no-spinners-example.component.ts?raw';
import timeNoSpinnersSrcH from '!./examples/time-no-spinners-example/time-no-spinners-example.component.html?raw';
import timeNoSecondsSrcTs from '!./examples/time-no-seconds-example.component.ts?raw';
import timeOnlyHoursSrcTs from '!./examples/time-only-hours-example.component.ts?raw';
import timeTwoDigitsSrcTs from '!./examples/time-two-digits-example/time-two-digits-example.component.ts?raw';
import timeTwoDigitsSrcH from '!./examples/time-two-digits-example/time-two-digits-example.component.html?raw';

import timeFormHtmlSrc from '!./examples/time-form-example.component.html?raw';
import timeFormTsSrc from '!./examples/time-form-example.component.ts?raw';
import timeFormScssSrc from '!./examples/time-form-example.component.scss?raw';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-time',
    templateUrl: './time-docs.component.html'
})
export class TimeDocsComponent {
    static schema: Schema = {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    hour: {
                        type: 'integer'
                    },
                    minute: {
                        type: 'integer'
                    },
                    second: {
                        type: 'integer'
                    }
                }
            }
        },
        type: 'object'
    };

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
            code: timeSrc,
            typescriptFileCode: timeSrcTs,
            component: 'TimeExampleComponent'
        }
    ];

    timeMeridian: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'time-12-example',
            code: timeMeridianSrc,
            typescriptFileCode: timeMeridianSrcTs,
            component: 'Time12ExampleComponent'
        }
    ];

    timeSizes: ExampleFile[] = [
        {
            language: 'html',
            standalone: true,
            fileName: 'time-sizes-example',
            typescriptFileCode: timeSizesSrcTs,
            code: timeSizesSrcH,
            component: 'TimeSizesExampleComponent'
        }
    ];

    timeProgramaticalyChange: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'time-programmatically-example',
            code: timeProgramH,
            typescriptFileCode: timeProgramTs,
            component: 'TimeProgrammaticallyExampleComponent'
        }
    ];

    timeNoSeconds: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'time-no-seconds-example',
            code: timeNoSecondsSrc,
            typescriptFileCode: timeNoSecondsSrcTs,
            component: 'TimeNoSecondsExampleComponent'
        }
    ];

    timeNoSpinners: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'time-no-spinners-example',
            code: timeNoSpinnersSrcH,
            typescriptFileCode: timeNoSpinnersSrcTs,
            component: 'TimeNoSpinnersExampleComponent'
        }
    ];

    timeTwoDigits: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'time-two-digits-example',
            code: timeTwoDigitsSrcH,
            typescriptFileCode: timeTwoDigitsSrcTs,
            component: 'TimeTwoDigitsExampleComponent'
        }
    ];

    timeOnlyHours: ExampleFile[] = [
        {
            language: 'html',
            fileName: 'time-only-hours-example',
            code: timeOnlyHoursSrc,
            typescriptFileCode: timeOnlyHoursSrcTs,
            component: 'TimeOnlyHoursExampleComponent'
        }
    ];

    timeForm: ExampleFile[] = [
        {
            language: 'html',
            code: timeFormHtmlSrc,
            fileName: 'time-form-example',
            scssFileCode: timeFormScssSrc
        },
        {
            language: 'typescript',
            code: timeFormTsSrc,
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
