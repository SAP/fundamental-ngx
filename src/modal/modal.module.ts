import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { Modal, ModalHeader, ModalBody, ModalFooter } from './modal';
import { ModalService } from './modal.service';

@NgModule({
    declarations: [Modal, ModalHeader, ModalBody, ModalFooter],
    imports: [CommonModule, ButtonModule, IconModule, NgbModalModule.forRoot()],
    exports: [Modal, ModalHeader, ModalBody, ModalFooter],
    providers: [ModalService]
})
export class ModalModule {}
