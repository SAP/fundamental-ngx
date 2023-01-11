import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { IconModule } from '@fundamental-ngx/core/icon';
import { TitleModule } from '@fundamental-ngx/core/title';
import { BarModule } from '@fundamental-ngx/core/bar';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import { DynamicComponentService, InitialFocusModule, ResizeModule, TemplateModule } from '@fundamental-ngx/cdk/utils';

import { DialogComponent } from './dialog.component';
import { DialogHeaderComponent } from './dialog-header/dialog-header.component';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { DialogFooterComponent } from './dialog-footer/dialog-footer.component';
import { DialogService } from './dialog-service/dialog.service';
import { DialogContainerComponent } from './dialog-container/dialog-container.component';
import { DialogFooterButtonComponent } from './dialog-footer-button/dialog-footer-button.component';
import { DialogDefaultComponent } from './dialog-default/dialog-default.component';
import { DialogCloseButtonComponent } from './dialog-close-button/dialog-close-button.component';
import { DialogDecisiveButtonDirective } from './directives/dialog-decisive-button.directive';
import { DialogTitleDirective } from './directives/dialog-title.directive';
import { ScrollbarModule } from '@fundamental-ngx/core/scrollbar';

const declarations = [
    DialogComponent,
    DialogBodyComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    DialogDefaultComponent,
    DialogContainerComponent,
    DialogCloseButtonComponent,
    DialogFooterButtonComponent,
    DialogDecisiveButtonDirective,
    DialogTitleDirective
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
        A11yModule,
        ScrollbarModule
    ],
    exports: [declarations, BarModule, TitleModule, TemplateModule, InitialFocusModule],
    providers: [DialogService, DynamicComponentService]
})
export class DialogModule {}
