import { Component, OnInit } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import { ModalService } from '../../../../../projects/fundamental-ngx/src/lib/modal/modal.service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal-docs.component.html',
    providers: [ModalService]
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

    confirmationReason: string;

    informationalModalHtml =`<ng-template #informationalModal>
    <fd-modal>
      <fd-modal-header>
        Modal Header/Title
      </fd-modal-header>
      <fd-modal-body>
        Modal Body
      </fd-modal-body>
    </fd-modal>
</ng-template>
<button fd-button (click)="openInfoModal(informationalModal)">Launch Demo</button>`;

    confirmationModalHtml =`<ng-template #confirmationModal let-c="close">
    <fd-modal>
      <fd-modal-header>
        Modal Header/Title
      </fd-modal-header>
      <fd-modal-body>
        Modal Body
      </fd-modal-body>
      <fd-modal-footer>
        <button fd-button (click)="c('No')" [fdType]="'secondary'">No</button>
        <button fd-button (click)="c('Yes')" [fdType]="'main'">Yes</button>
      </fd-modal-footer>
    </fd-modal>
</ng-template>
<button fd-button (click)="openConfirmationModal(confirmationModal)">Launch Demo</button>`;

    formModalHtml =``;

    informationalModalJs = `openInfoModal(modalType) {
    this.modalService.open(modalType);
}`;

    confirmationModalJs =`openConfirmationModal(modalType) {
    this.modalService.open(modalType).result.then(
        result => {
            if (result === 'Yes') {
                this.confirmationReason = 'Modal closed with "Yes" button';
            } else if (result === 'No') {
                this.confirmationReason = 'Modal closed with "No" button';
            }
        },
        () => {
            this.confirmationReason = 'Modal dismissed with the "X" button';
        }
    );
}`;

    constructor(private schemaFactory: SchemaFactoryService, private modalService: ModalService) {
        this.schema = this.schemaFactory.getComponent('modal');
    }

    onSchemaValues(data) {
        this.data = data;
    }

    ngOnInit() {}

    openInfoModal(modalType) {
        this.modalService.open(modalType);
    }

    openConfirmationModal(modalType) {
        this.modalService.open(modalType).result.then(
            result => {
                if (result === 'Yes') {
                    this.confirmationReason = 'Modal closed with "Yes" button';
                } else if (result === 'No') {
                    this.confirmationReason = 'Modal closed with "No" button';
                }
            },
            () => {
                this.confirmationReason = 'Modal dismissed with the "X" button';
            }
        );
    }
}
