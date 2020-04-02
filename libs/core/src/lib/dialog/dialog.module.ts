import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';

import { DialogComponent } from './dialog.component';
import { DialogHeaderComponent } from './dialog-header/dialog-header.component';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { DialogFooterComponent } from './dialog-footer/dialog-footer.component';

import { DialogService } from './dialog-service/dialog.service';
import { DialogContainerComponent } from './dialog-container/dialog-container.component';
import {
    DialogCloseButtonDirective,
    DialogDecisiveButtonDirective,
    DialogTitleDirective
} from './dialog-utils/dialog-directives';
import { DynamicComponentService } from '../utils/dynamic-component/dynamic-component.service';
import { BarModule } from '../bar/bar.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ResizeModule } from '../utils/directives/resize/resize.module';
import { TemplateModule } from '../utils/directives/template/template.module';
import { BusyIndicatorModule } from '../busy-indicator/busy-indicator.module';
import { DialogFooterButtonComponent } from './dialog-footer-button/dialog-footer-button.component';

@NgModule({
    declarations: [
        DialogComponent,
        DialogBodyComponent,
        DialogTitleDirective,
        DialogFooterComponent,
        DialogHeaderComponent,
        DialogContainerComponent,
        DialogCloseButtonDirective,
        DialogFooterButtonComponent,
        DialogDecisiveButtonDirective
    ],
    imports: [
        BarModule,
        IconModule,
        CommonModule,
        ButtonModule,
        ResizeModule,
        TemplateModule,
        DragDropModule,
        BusyIndicatorModule
    ],
    exports: [
        BarModule,
        TemplateModule,
        DialogComponent,
        DialogBodyComponent,
        DialogTitleDirective,
        DialogFooterComponent,
        DialogHeaderComponent,
        DialogContainerComponent,
        DialogCloseButtonDirective,
        DialogFooterButtonComponent,
        DialogDecisiveButtonDirective
    ],
    entryComponents: [
        DialogComponent,
        DialogContainerComponent
    ],
    providers: [DialogService, DynamicComponentService]
})
export class DialogModule {
}
