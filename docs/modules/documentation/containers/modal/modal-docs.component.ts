import { Component } from '@angular/core';

import * as templateTs from '!raw-loader!./examples/template-as-content/modal-open-template-example.component.ts';
import * as templateHtml from '!raw-loader!./examples/template-as-content/modal-open-template-example.component.html';
import * as componentAsContentSrc from '!raw-loader!./examples/component-as-content/modal-component-as-content-example.component.ts';
import * as contentSrc from '!raw-loader!./examples/component-as-content/modal-content.component.ts';
import * as modalInModalExample from '!raw-loader!./examples/stackable-modals/modal-in-modal-example.component.ts';
import * as modalInModalComponent from '!raw-loader!./examples/stackable-modals/modal-in-modal.component.ts';
import * as modalInModalSecondComponent from '!raw-loader!./examples/stackable-modals/modal-in-modal-second.component.ts';
import * as fsModalSource from '!raw-loader!./examples/fullscreen-modal/modal-fullscreen-example.component.html';
import * as fsModalSourceT from '!raw-loader!./examples/fullscreen-modal/modal-fullscreen-example.component.ts';
import * as backdropT from '!raw-loader!./examples/backdrop-examples/backdrop-examples.component.ts';
import * as backdropH from '!raw-loader!./examples/backdrop-examples/backdrop-examples.component.html';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';
import { ModalService } from '../../../../../library/src/lib/modal/modal-service/modal.service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal-docs.component.html'
})
export class ModalDocsComponent {

    static schema: any = {
        properties: {
            properties: {
                type: 'object',
                properties: {
                    hasBackdrop: {
                        type: 'boolean'
                    },
                    backdropClickCloseable: {
                        type: 'boolean'
                    },
                    escKeyCloseable: {
                        type: 'boolean'
                    },
                    focusTrapped: {
                        type: 'boolean'
                    },
                    width: {
                        type: 'string'
                    },
                    height: {
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
            hasBackdrop: true,
            backdropClickCloseable: true,
            escKeyCloseable: true,
            focusTrapped: true,
            width: '40%',
            height: '40%',
        }
    };

    templateModalTs = templateTs;
    templateModalHtml = templateHtml;

    componentAsContentSource = componentAsContentSrc;
    contentSource = contentSrc;

    modalInModalExample = modalInModalExample;
    modalInModal = modalInModalComponent;
    modalInModalSecond = modalInModalSecondComponent;

    fullScreenSource = fsModalSource;
    fullScreenSourceTs = fsModalSourceT;

    backdropHtml = backdropH;
    backdropTs = backdropT;

    constructor(private schemaFactory: SchemaFactoryService, private modalService: ModalService) {
        this.schema = this.schemaFactory.getComponent('modal');
    }

    onSchemaValues(data) {
        this.data = data;
    }

    openModal(template): void {
        this.modalService.open(template, this.data.properties);
    }
}
