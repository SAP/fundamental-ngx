import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';

import { DialogComponent } from './dialog.component';
import { DialogHeaderComponent } from './dialog-header/dialog-header.component';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { DialogFooterComponent } from './dialog-footer/dialog-footer.component';

import { DialogService } from './dialog-service/dialog.service';
import { DialogContainerComponent } from './dialog-container/dialog-container.component';
import { DynamicComponentService } from '../utils/dynamic-component/dynamic-component.service';
import { BarModule } from '../bar/bar.module';
import { ResizeModule } from '../utils/directives/resize/resize.module';
import { TemplateModule } from '../utils/directives/template/template.module';
import { BusyIndicatorModule } from '../busy-indicator/busy-indicator.module';
import { DialogFooterButtonComponent } from './dialog-footer-button/dialog-footer-button.component';
import { InitialFocusModule } from '../utils/directives/initial-focus/initial-focus.module';
import { DialogDefaultComponent } from './dialog-default/dialog-default.component';
import { DialogCloseButtonComponent } from './dialog-close-button/dialog-close-button.component';
import { DialogDecisiveButtonDirective } from './directives/dialog-decisive-button.directive';
import { TitleModule } from '../title/title.module';

const declarations = [
    DialogComponent,
    DialogBodyComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    DialogDefaultComponent,
    DialogContainerComponent,
    DialogCloseButtonComponent,
    DialogFooterButtonComponent,
    DialogDecisiveButtonDirective
];

@NgModule({
    declarations: [declarations],
    imports: [
        BarModule,
        IconModule,
        TitleModule,
        CommonModule,
        ButtonModule,
        ResizeModule,
        TemplateModule,
        DragDropModule,
        InitialFocusModule,
        BusyIndicatorModule,
        A11yModule
    ],
    exports: [
        declarations,
        BarModule,
        TitleModule,
        TemplateModule,
        InitialFocusModule
    ],
    entryComponents: [DialogContainerComponent, DialogDefaultComponent],
    providers: [DialogService, DynamicComponentService]
})
export class DialogModule { }
