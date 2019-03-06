import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';

import { ModalComponent } from './modal.component';
import { ModalHeaderComponent } from './modal-header/modal-header.component';
import { ModalBodyComponent } from './modal-body/modal-body.component';
import { ModalFooterComponent } from './modal-footer/modal-footer.component';

import { ModalService } from './modal.service';
import { ModalOverlayComponent } from './modal-overlay.component';
import { ModalContainerComponent } from './modal-container.component';

@NgModule({
    declarations: [
        ModalComponent,
        ModalHeaderComponent,
        ModalBodyComponent,
        ModalFooterComponent,
        ModalOverlayComponent,
        ModalContainerComponent
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
        ModalOverlayComponent,
        ModalContainerComponent
    ],
    entryComponents: [
        ModalOverlayComponent,
        ModalContainerComponent
    ],
    providers: [ModalService]
})
export class ModalModule {}
