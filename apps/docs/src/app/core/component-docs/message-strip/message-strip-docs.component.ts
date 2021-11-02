import { Component } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';
import * as messageStripExampleHtml from '!raw-loader!./examples/message-strip-example.component.html';
import * as messageStripExampleScs from '!raw-loader!./examples/message-strip-example.component.scss';
import * as messageStripNoIconExampleHtml from '!raw-loader!./examples/message-strip-noicon-example.component.html';
import * as messageStripWidthExampleHtml from '!raw-loader!./examples/message-strip-width-example.component.html';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-message-strip',
    templateUrl: './message-strip-docs.component.html'
})
export class MessageStripDocsComponent {
    static schema: any = {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    dismissible: {
                        type: 'boolean'
                    },
                    noIcon: {
                        type: 'boolean'
                    },
                    width: {
                        type: 'string'
                    },
                    message: {
                        type: 'string'
                    }
                }
            },
            modifier: {
                type: 'object',
                properties: {
                    type: {
                        type: 'string',
                        enum: ['default', 'warning', 'error', 'success', 'information']
                    }
                }
            }
        },
        type: 'object'
    };

    data: any = {
        properties: {
            dismissible: true,
            noIcon: false,
            width: '100%',
            message: 'This is a message strip message.'
        },
        modifier: {
            type: 'default'
        }
    };

    messageStripBasicExample: ExampleFile[] = [
        {
            language: 'html',
            scssFileCode: messageStripExampleScs,
            fileName: 'message-strip-example',
            code: messageStripExampleHtml
        }
    ];

    messageStripNoIconExample: ExampleFile[] = [
        {
            language: 'html',
            scssFileCode: messageStripExampleScs,
            fileName: 'message-strip-noicon-example',
            code: messageStripNoIconExampleHtml
        }
    ];

    messageStripWidthExample: ExampleFile[] = [
        {
            language: 'html',
            scssFileCode: messageStripExampleScs,
            fileName: 'message-strip-width-example',
            code: messageStripWidthExampleHtml
        }
    ];

    schema: Schema;

    /**
     * Should show message strip component in playground.
     */
    shouldShow = true;

    /**
     * @hidden
     */
    private _originalSchemaValues = Object.assign({}, this.data);

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('messageStrip');
    }

    onSchemaValues(data): void {
        this.data = data;
    }

    /**
     * Resets message strip playground component and it's configuration
     */
    reset(): void {
        this.shouldShow = false;
        setTimeout(() => {
            this.data = Object.assign({}, this._originalSchemaValues);
            this.shouldShow = true;
        });
    }
}
