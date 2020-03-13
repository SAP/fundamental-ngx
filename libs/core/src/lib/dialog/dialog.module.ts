import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';

import { DialogComponent } from './dialog.component';
import { DialogHeaderComponent } from './dialog-header/dialog-header.component';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { DialogFooterComponent } from './dialog-footer/dialog-footer.component';

import { DialogService } from './dialog-service/dialog.service';
import { DialogContainerComponent } from './dialog-utils/dialog-container.component';
import {
    DialogCloseButtonDirective,
    DialogDecisiveButtonDirective,
    DialogTitleDirective
} from './dialog-utils/dialog-directives';
import { DynamicComponentService } from '../utils/dynamic-component/dynamic-component.service';
import { TemplateDirective } from '../utils/directives';
import { BarModule } from '../bar/bar.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [
        TemplateDirective,
        DialogComponent,
        DialogHeaderComponent,
        DialogBodyComponent,
        DialogFooterComponent,
        DialogContainerComponent,
        DialogCloseButtonDirective,
        DialogTitleDirective,
        DialogDecisiveButtonDirective
    ],
    imports: [
        DragDropModule,
        BarModule,
        CommonModule,
        ButtonModule,
        IconModule
    ],
    exports: [
        BarModule,
        DialogComponent,
        TemplateDirective,
        DialogHeaderComponent,
        DialogBodyComponent,
        DialogFooterComponent,
        DialogContainerComponent,
        DialogCloseButtonDirective,
        DialogTitleDirective,
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
