import { NgModule } from '@angular/core';
import { DialogModule } from '@angular/cdk-experimental/dialog';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';

import { ModalComponent } from './modal.component';
import { ModalHeaderComponent } from './modal-header.component';
import { ModalBodyComponent } from './modal-body.component';
import { ModalFooterComponent } from './modal-footer.component';
import { ModalClose } from './modal.directives';

import { ModalService } from './modal.service';

@NgModule({
    declarations: [ModalComponent, ModalClose, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent],
    imports: [CommonModule, ButtonModule, DialogModule, IconModule],
    exports: [ModalComponent, ModalClose, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent],
    providers: [ModalService]
})
export class ModalModule {}
