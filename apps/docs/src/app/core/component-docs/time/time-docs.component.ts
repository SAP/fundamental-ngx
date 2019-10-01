import { Component, OnInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as timeSrc from '!raw-loader!./examples/time-example.component.html';
import * as timeMeridianSrc from '!raw-loader!./examples/time-12-example.component.html';
import * as timeDisabledSrc from '!raw-loader!./examples/time-disabled-example.component.html';
import * as timeNoSpinnersSrc from '!raw-loader!./examples/time-no-spinners-example.component.html';
import * as timeNoSecondsSrc from '!raw-loader!./examples/time-no-seconds-example.component.html';
import * as timeOnlyHoursSrc from '!raw-loader!./examples/time-only-hours-example.component.html';
import * as timeI18nSrc from '!raw-loader!./examples/time-i18n-example.component.ts';
import * as timeFormHtmlSrc from '!raw-loader!./examples/time-form-example.component.html';
import * as timeFormTsSrc from '!raw-loader!./examples/time-form-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import { DocsSectionTitleComponent } from '../../../documentation/core-helpers/docs-section-title/docs-section-title.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-time',
    templateUrl: './time-docs.component.html'
})
export class TimeDocsComponent implements OnInit {
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
            code: timeSrc
        }
    ];

    timeMeridian: ExampleFile[] = [
        {
            language: 'html',
            code: timeMeridianSrc
        }
    ];

    timeDisabled: ExampleFile[] = [
        {
            language: 'html',
            code: timeDisabledSrc
        }
    ];

    timeNoSpinners: ExampleFile[] = [
        {
            language: 'html',
            code: timeNoSpinnersSrc
        }
    ];

    timeNoSeconds: ExampleFile[] = [
        {
            language: 'html',
            code: timeNoSecondsSrc
        }
    ];

    timeOnlyHours: ExampleFile[] = [
        {
            language: 'html',
            code: timeOnlyHoursSrc
        }
    ];

    timeI18n: ExampleFile[] = [
        {
            language: 'typescript',
            code: timeI18nSrc
        }
    ];

    timeForm: ExampleFile[] = [
        {
            language: 'html',
            code: timeFormHtmlSrc
        },
        {
            language: 'typescript',
            code: timeFormTsSrc
        }
    ];

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('time');
    }

    ngOnInit() {}
    onSchemaValues(data) {
        this.data = data;
    }
}
