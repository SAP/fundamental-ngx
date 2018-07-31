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

    informationalModalHtml =
        '<ng-template #informationalModal>\n' +
        '  <fd-modal>\n' +
        '    <fd-modal-header>\n' +
        '      Modal Header/Title\n' +
        '    </fd-modal-header>\n' +
        '    <fd-modal-body>\n' +
        '      Modal Body\n' +
        '    </fd-modal-body>\n' +
        '  </fd-modal>\n' +
        '</ng-template>\n' +
        '<button fd-button (click)="openInfoModal(informationalModal)">Launch Demo</button>';

    confirmationModalHtml =
        '<ng-template #confirmationModal let-c="close">\n' +
        '  <fd-modal>\n' +
        '    <fd-modal-header>\n' +
        '      Modal Header/Title\n' +
        '    </fd-modal-header>\n' +
        '    <fd-modal-body>\n' +
        '      Modal Body\n' +
        '    </fd-modal-body>\n' +
        '    <fd-modal-footer>\n' +
        '      <button fd-button (click)="c(\'No\')" fdType="secondary">No</button>\n' +
        '      <button fd-button (click)="c(\'Yes\')" fdType="main">Yes</button>\n' +
        '    </fd-modal-footer>\n' +
        '  </fd-modal>\n' +
        '</ng-template>\n' +
        '<button fd-button (click)="openConfirmationModal(confirmationModal)">Launch Demo</button>\n' +
        '<span>{{confirmationReason}}</span>';

    formModalHtml =
        '<ng-template #formModal>\n' +
        '  <fd-modal>\n' +
        '    <fd-modal-header>\n' +
        '      Modal Header/Title\n' +
        '    </fd-modal-header>\n' +
        '    <fd-modal-body>\n' +
        '      <div class="fd-form__group">\n' +
        '        <div class="fd-form__item">\n' +
        '          <label class="fd-form__label is-required" for="input-2">Email*</label>\n' +
        '          <input class="fd-form__control" type="text" id="input-2">\n' +
        '        </div>\n' +
        '      </div>\n' +
        '    </fd-modal-body>\n' +
        '    <fd-modal-footer>\n' +
        '      <button fd-button fdType="secondary">Cancel</button>\n' +
        '      <button fd-button fdType="main">Invite</button>\n' +
        '    </fd-modal-footer>\n' +
        '  </fd-modal>\n' +
        '</ng-template>';

    informationalModalJs = 'openModal(modalType) {\n' + '    this.modalService.open(modalType);\n' + '}';

    confirmationModalJs =
        'openConfirmationModal(modalType) {\n' +
        '    this.modalService.open(modalType).result.then(\n' +
        '        result => {\n' +
        '            if (result === "Yes") {\n' +
        '                this.confirmationReason = \'Modal closed with "Yes" button\';\n' +
        '            } else if (result === "No") {\n' +
        '                this.confirmationReason = \'Modal closed with "No" button\';\n' +
        '            }\n' +
        '        },\n' +
        '        () => {\n' +
        '            this.confirmationReason = \'Modal dismissed with the "X" button\';\n' +
        '        }\n' +
        '    );\n' +
        '}';

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
