import { Component } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

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
            hour: 13,
            minute: 55,
            second: 59
        }
    };

    timeHtml = `<fd-time [time]="timeObject"></fd-time>`;

    timeTwentyFourHtml = `<fd-time [displayTwentyFour]="true" [time]="timeTwentyFourObject"></fd-time>`;

    timeNoValidateHtml = `<fd-time [validate]="false" [time]="timeNoValidateObject"></fd-time>`;

    timeDisabledHtml = `<fd-time [disabled]="true" [time]="{hour: 0, minute: 0, second: 0}"></fd-time>`;

    timeObject = { hour: 13, minute: 55, second: 59 };

    timeTwentyFourObject = { hour: 13, minute: 55, second: 59 };

    timeNoValidateObject = { hour: 99, minute: 7.4, second: -5 };

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('time');
    }

    onSchemaValues(data) {
        this.data = data;
    }
}
