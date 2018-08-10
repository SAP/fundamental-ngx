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
            hour: 12,
            minute: 0,
            second: 0
        }
    };

    timeHtml = `<fd-time [time]="timeObject"></fd-time>`;

    timeMeridianHtml = `<fd-time [meridian]="true" [time]="timeMeridianObject"></fd-time>`;

    timeDisabledHtml = `<fd-time [disabled]="true" [time]="{hour: 0, minute: 0, second: 0}"></fd-time>`;

    timeNoSpinnersHtml = `<fd-time [spinners]="false" [time]="timeNoSpinnersObject"></fd-time>`;

    timeNoSecondsHtml = `<fd-time [displaySeconds]="false" [time]="timeNoSecondsObject"></fd-time>`;

    timeObject = { hour: 12, minute: 0, second: 0 };

    timeMeridianObject = { hour: 12, minute: 0, second: 0 };

    timeNoSpinnersObject = { hour: 12, minute: 0, second: 0 };

    timeNoSecondsObject = { hour: 12, minute: 0, second: null };

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('time');
    }

    onSchemaValues(data) {
        this.data = data;
    }
}
