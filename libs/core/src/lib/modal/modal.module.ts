import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';

import { ModalComponent } from './modal.component';
import { ModalHeaderComponent } from './modal-header/modal-header.component';
import { ModalBodyComponent } from './modal-body/modal-body.component';
import { ModalFooterComponent } from './modal-footer/modal-footer.component';

import { ModalService } from './modal-service/modal.service';
import { ModalBackdrop } from './modal-utils/modal-backdrop';
import { ModalContainer } from './modal-utils/modal-container';
import { ModalCloseButtonDirective, ModalTitleDirective } from './modal-utils/modal-directives';
import { DynamicComponentService } from '../utils/dynamic-component/dynamic-component.service';

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
    providers: [ModalService, DynamicComponentService]
})
export class ModalModule {}
