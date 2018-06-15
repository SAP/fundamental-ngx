import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { ModalComponent } from './modal.component';
import { ModalHeaderComponent } from './modal-header.component';
import { ModalBodyComponent } from './modal-body.component';
import { ModalFooterComponent } from './modal-footer.component';

import { ModalService } from './modal.service';

@NgModule({
    declarations: [ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent],
    imports: [CommonModule, ButtonModule, IconModule, NgbModalModule.forRoot()],
    exports: [ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent],
    providers: [ModalService]
})
export class ModalModule {}
