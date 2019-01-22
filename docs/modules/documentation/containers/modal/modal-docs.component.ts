import { Component, OnInit } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import * as modalSrc from '!raw-loader!./examples/modal-example.component.ts';
import * as modalConfirmationSrc from '!raw-loader!./examples/modal-confirmation-example.component.ts';
import * as componentAsContentSrc from '!raw-loader!./examples/modal-component-as-content-example.component.ts';
import * as contentSrc from '!raw-loader!./examples/modal-content.component.ts';
import * as modalInModalExample from '!raw-loader!./examples/modal-in-modal-example.component.ts';
import * as modalInModalComponent from '!raw-loader!./examples/modal-in-modal.component.ts';
import * as modalInModalSecondComponent from '!raw-loader!./examples/modal-in-modal-second.component.ts';

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

    componentAsContentSource = componentAsContentSrc;

    contentSource = contentSrc;

    modalInModalExample = modalInModalExample;

    modalInModal = modalInModalComponent;

    modalInModalSecond = modalInModalSecondComponent;

    constructor(private schemaFactory: SchemaFactoryService) {
        this.schema = this.schemaFactory.getComponent('modal');
    }

    onSchemaValues(data) {
        this.data = data;
    }

    ngOnInit() {}




}
