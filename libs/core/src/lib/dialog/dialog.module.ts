import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';

import { DialogComponent } from './dialog.component';
import { DialogHeaderComponent } from './dialog-header/dialog-header.component';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { DialogFooterComponent } from './dialog-footer/dialog-footer.component';

import { DialogService } from './dialog-service/dialog.service';
import { DialogBackdrop } from './dialog-utils/dialog-backdrop';
import { DialogContainer } from './dialog-utils/dialog-container';
import { DialogCloseButtonDirective, DialogTitleDirective } from './dialog-utils/dialog-directives';
import { DynamicComponentService } from '../utils/dynamic-component/dynamic-component.service';

@NgModule({
    declarations: [
        DialogComponent,
        DialogHeaderComponent,
        DialogBodyComponent,
        DialogFooterComponent,
        DialogBackdrop,
        DialogContainer,
        DialogCloseButtonDirective,
        DialogTitleDirective
    ],
    imports: [
        CommonModule,
        ButtonModule,
        IconModule
    ],
    exports: [
        DialogHeaderComponent,
        DialogBodyComponent,
        DialogFooterComponent,
        DialogBackdrop,
        DialogContainer,
        DialogCloseButtonDirective,
        DialogTitleDirective
    ],
    entryComponents: [
        DialogComponent,
        DialogBackdrop,
        DialogContainer
    ],
    providers: [DialogService, DynamicComponentService]
})
export class DialogModule {
}
