import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { ModalComponent, ModalHeader, ModalBody, ModalFooter } from './modal.component';
import { ModalService } from './modal.service';

@NgModule({
    declarations: [ModalComponent, ModalHeader, ModalBody, ModalFooter],
    imports: [CommonModule, ButtonModule, IconModule, NgbModalModule.forRoot()],
    exports: [ModalComponent, ModalHeader, ModalBody, ModalFooter],
    providers: [ModalService]
})
export class ModalModule {}
