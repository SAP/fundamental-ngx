import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';

import { ModalComponent } from './modal.component';
import { ModalHeaderComponent } from './modal-header/modal-header.component';
import { ModalBodyComponent } from './modal-body/modal-body.component';
import { ModalFooterComponent } from './modal-footer/modal-footer.component';

import { ModalService } from './modal.service';
import { ModalBackdrop } from './modal-backdrop';
import { ModalContainer } from './modal-container';
import { ModalCloseButtonDirective, ModalTitleDirective } from './modal-directives';

@NgModule({
    declarations: [
        ModalComponent,
        ModalHeaderComponent,
        ModalBodyComponent,
        ModalFooterComponent,
        ModalBackdrop,
        ModalContainer,
        ModalCloseButtonDirective,
        ModalTitleDirective
    ],
    imports: [
        CommonModule,
        ButtonModule,
        IconModule
    ],
    exports: [
        ModalComponent,
        ModalHeaderComponent,
        ModalBodyComponent,
        ModalFooterComponent,
        ModalBackdrop,
        ModalContainer,
        ModalCloseButtonDirective,
        ModalTitleDirective
    ],
    entryComponents: [
        ModalComponent,
        ModalBackdrop,
        ModalContainer
    ],
    providers: [ModalService]
})
export class ModalModule {}
