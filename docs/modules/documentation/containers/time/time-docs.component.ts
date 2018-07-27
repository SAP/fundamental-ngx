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
                    time: {
                        type: 'string'
                    }
                }
            },
            state: {
                type: 'object',
                properties: {
                    disabled: {
                        type: 'boolean'
                    }
                }
            }
        },
        type: 'object'
    };

    schema: Schema;
    data: any = {
        properties: {
            time: ''
        },
        state: {
            disabled: false
        }
    };

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('time');
    }

    onSchemaValues(data) {
        this.data = data;
    }
}
