import { Component, OnInit } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as modalSrc from '!raw-loader!./examples/modal-example.component.ts';
import * as modalConfirmationSrc from '!raw-loader!./examples/modal-confirmation-example.component.ts';

@Component({
    selector: 'app-modal',
    templateUrl: './modal-docs.component.html'
})
export class ModalDocsComponent implements OnInit {
    static schema: any = {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    type: {
                        type: 'string',
                        enum: ['informational', 'confirmation', 'form']
                    },
                    header: {
                        type: 'string'
                    },
                    body: {
                        type: 'string'
                    },
                    primaryButton: {
                        type: 'string'
                    },
                    secondaryButton: {
                        type: 'string'
                    }
                }
            }
        },
        type: 'object'
    };

    schema: Schema;
    data: any = {
        properties: {
            type: 'confirmation',
            header: 'Delete',
            body: 'Do you want to delete item X?',
            primaryButton: 'Yes',
            secondaryButton: 'No'
        }
    };

    informationalModalSource = modalSrc;

    confirmationModalSource = modalConfirmationSrc;

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('modal');
    }

    onSchemaValues(data) {
        this.data = data;
    }

    ngOnInit() {}




}
