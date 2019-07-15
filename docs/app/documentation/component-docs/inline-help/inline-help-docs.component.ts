import { Component, OnInit } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as inlineHelpSrc from '!raw-loader!./examples/inline-help-example.component.html';
import * as inlineHelpTriggerHtml from '!raw-loader!./examples/inline-help-trigger-example.component.html';
import Popper from 'popper.js';

@Component({
    selector: 'app-inline-help',
    templateUrl: './inline-help-docs.component.html'
})
export class InlineHelpDocsComponent implements OnInit {
    static schema: any = {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    label: {
                        type: 'string'
                    },
                    helpText: {
                        type: 'string'
                    },
                    position: {
                        type: 'string',
                        enum: Array.from(Popper.placements)
                    }
                }
            }
        },
        type: 'object'
    };

    schema: Schema;

    data: any = {
        properties: {
            label: 'Inline Help',
            helpText: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
            position: 'bottom-start'
        }
    };

    inlineHelpHtml = inlineHelpSrc;
    inlineHelpTriggerHtml = inlineHelpTriggerHtml;

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('inlineHelp');
    }

    onSchemaValues(data) {
        this.data = data;
    }

    ngOnInit() {}
}
