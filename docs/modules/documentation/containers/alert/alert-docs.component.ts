import { Component } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as alertExampleHtml from '!raw-loader!./examples/alert-example.component.html';
import * as alertExampleTs from '!raw-loader!./examples/alert-example.component.ts';
import * as alertContent from '!raw-loader!./examples/alert-content.component.ts';
import * as alertComponentAsContentExample from '!raw-loader!./examples/alert-component-as-content-example.component.ts';
import * as alertInlineExampleHtml from '!raw-loader!./examples/alert-inline-example.component.html';

@Component({
    selector: 'app-alert',
    templateUrl: './alert-docs.component.html'
})
export class AlertDocsComponent {
    static schema: any = {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    dismissible: {
                        type: 'boolean'
                    }
                }
            },
            modifier: {
                type: 'object',
                properties: {
                    block: {
                        type: 'string',
                        enum: ['default', 'warning', 'error', 'success', 'information']
                    }
                }
            }
        },
        type: 'object'
    };

    schema: Schema;

    data: any = {
        properties: {
            dismissible: true
        },
        modifier: {
            block: 'default'
        }
    };

    messagePart1: String = 'This is the ';
    messagePart2: String = ' alert style.';

    alertHtml = alertExampleHtml;
    alertTs = alertExampleTs;
    alertContentTs = alertContent;
    alertComponentAsContentTs = alertComponentAsContentExample;
    alertInlineHtml = alertInlineExampleHtml;

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('alert');
    }

    onSchemaValues(data) {
        this.data = data;
    }

    closeAlert(id: string) {
        alert(`Alert with id ${id} has triggered a close event!`);
    }
}
