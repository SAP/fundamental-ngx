import { Component, OnInit } from '@angular/core';
import { Schema } from '../../../schema/models/schema.model';
import { SchemaFactoryService } from '../../../schema/services/schema-factory/schema-factory.service';

import { ModalService } from '../../../../../src/modal/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {


  static schema: Schema = {
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
          body:{
            type: 'string'
          },
          primaryButton:{
            type: 'string'
          },
          secondaryButton:{
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

  informationalModalHtml = '<ng-template #informationalModal>\n' +
    '  <fd-modal>\n' +
    '    <fd-modal-header>\n' +
    '      Modal Header/Title\n' +
    '    </fd-modal-header>\n' +
    '    <fd-modal-body>\n' +
    '      Modal Body\n' +
    '    </fd-modal-body>\n' +
    '  </fd-modal>\n' +
    '</ng-template>\n' +
    '<button fd-button (click)="openModal(informationalModal)">Launch Demo</button>';

  confirmationModalHtml = '<ng-template #confirmationModal>\n' +
    '  <fd-modal>\n' +
    '    <fd-modal-header>\n' +
    '      Modal Header/Title\n' +
    '    </fd-modal-header>\n' +
    '    <fd-modal-body>\n' +
    '      Modal Body\n' +
    '    </fd-modal-body>\n' +
    '    <fd-modal-footer>\n' +
    '      <button fd-button type="secondary">No</button>\n' +
    '      <button fd-button type="main">Yes</button>\n' +
    '    </fd-modal-footer>\n' +
    '  </fd-modal>\n' +
    '</ng-template>\n' +
    '<button fd-button (click)="openModal(confirmationModal)">Launch Demo</button>';

  formModalHtml = '<ng-template #formModal>\n' +
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
    '      <button fd-button type="secondary">Cancel</button>\n' +
    '      <button fd-button type="main">Invite</button>\n' +
    '    </fd-modal-footer>\n' +
    '  </fd-modal>\n' +
    '</ng-template>';

  constructor(private schemaFactory: SchemaFactoryService, private modalService: ModalService) {
    this.schema = this.schemaFactory.getComponent('modal');
  }

  onSchemaValues(data) {
    this.data = data;
  }

  ngOnInit() {

  }

  openModal(modalType) {
    this.modalService.open(modalType);
  }


}


