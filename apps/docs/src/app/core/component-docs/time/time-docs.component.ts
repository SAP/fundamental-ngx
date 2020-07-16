import { Component } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as timeSrc from '!raw-loader!./examples/time-example.component.html';
import * as timeMeridianSrc from '!raw-loader!./examples/time-12-example.component.html';
import * as timeSizesSrcTs from '!raw-loader!./examples/time-sizes-example.component.ts';
import * as timeSizesSrcH from '!raw-loader!./examples/time-sizes-example.component.html';
import * as timeNoSecondsSrc from '!raw-loader!./examples/time-no-seconds-example.component.html';
import * as timeOnlyHoursSrc from '!raw-loader!./examples/time-only-hours-example.component.html';

import * as timeProgramTs from '!raw-loader!./examples/time-programmatically-example.component.ts';
import * as timeProgramH from '!raw-loader!./examples/time-programmatically-example.component.html';

import * as timeSrcTs from '!raw-loader!./examples/time-example.component.ts';
import * as timeMeridianSrcTs from '!raw-loader!./examples/time-12-example.component.ts';
import * as timeNoSpinnersSrcTs from '!raw-loader!./examples/time-no-spinners-example/time-no-spinners-example.component.ts';
import * as timeNoSpinnersSrcH from '!raw-loader!./examples/time-no-spinners-example/time-no-spinners-example.component.html';
import * as timeNoSecondsSrcTs from '!raw-loader!./examples/time-no-seconds-example.component.ts';
import * as timeOnlyHoursSrcTs from '!raw-loader!./examples/time-only-hours-example.component.ts';
import * as timeTwoDigitsSrcTs from '!raw-loader!./examples/time-two-digits-example/time-two-digits-example.component.ts';
import * as timeTwoDigitsSrcH from '!raw-loader!./examples/time-two-digits-example/time-two-digits-example.component.html';

import * as timeI18nSrc from '!raw-loader!./examples/time-i18n-example.component.ts';
import * as timeFormHtmlSrc from '!raw-loader!./examples/time-form-example.component.html';
import * as timeFormTsSrc from '!raw-loader!./examples/time-form-example.component.ts';
import * as timeFormScssSrc from '!raw-loader!./examples/time-form-example.component.scss';
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

    timeI18n: ExampleFile[] = [
        {
            language: 'typescript',
            code: timeI18nSrc,
            fileName: 'time-i18n-example',
            component: 'TimeI18nExampleComponent'
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

    onSchemaValues(data) {
        this.data = data;
    }
}
