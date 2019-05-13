import { Component } from '@angular/core';
import * as toggleSizeExample from '!raw-loader!./examples/toggle-sizes-example/toggle-sizes-example.component.html';
import * as toggleDisableExample from '!raw-loader!./examples/disabled-toggle-example/disabled-toggle-example.component.html';
import * as toggleBindingExampleHtml from '!raw-loader!./examples/toggle-binding-example/toggle-binding-example.component.html';
import * as toggleBindingExampleTs from '!raw-loader!./examples/toggle-binding-example/toggle-binding-example.component.ts';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

@Component({
    selector: 'app-toggle',
    templateUrl: './toggle-docs.component.html'
})
export class ToggleDocsComponent {

    static schema: any = {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    disabled: {
                        type: 'boolean'
                    },
                    checked: {
                        type: 'boolean'
                    }
                }
            },
            modifier: {
                type: 'object',
                properties: {
                    size: {
                        type: 'string',
                        enum: ['default', 'xs', 's', 'l']
                    }
                }
            }
        },
        type: 'object'
    };

    schema: Schema;

    data: any = {
        properties: {
            disabled: false,
            checked: false
        },
        modifier: {
            size: 'default'
        }
    };

    toggleSizeHtml = toggleSizeExample;
    toggleDisableHtml = toggleDisableExample;
    toggleBindingHtml = toggleBindingExampleHtml;
    toggleBindingTs = toggleBindingExampleTs;

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('toggle');
    }

    onSchemaValues(data) {
        this.data = data;
    }
}
