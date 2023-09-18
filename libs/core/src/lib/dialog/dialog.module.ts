import { A11yModule } from '@angular/cdk/a11y';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
    DynamicComponentService,
    DynamicPortalComponent,
    InitialFocusModule,
    ResizeModule,
    TemplateModule
} from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { IconModule } from '@fundamental-ngx/core/icon';
import { TitleModule } from '@fundamental-ngx/core/title';

import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollbarModule } from '@fundamental-ngx/core/scrollbar';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { DialogCloseButtonComponent } from './dialog-close-button/dialog-close-button.component';
import { DialogContainerComponent } from './dialog-container/dialog-container.component';
import { DialogDefaultComponent } from './dialog-default/dialog-default.component';
import { DialogFooterComponent } from './dialog-footer/dialog-footer.component';
import { DialogFullScreenTogglerButtonComponent } from './dialog-full-screen-toggler-button/dialog-full-screen-toggler-button.component';
import { DialogHeaderComponent } from './dialog-header/dialog-header.component';
import { DialogService } from './dialog-service/dialog.service';
import { DialogComponent } from './dialog.component';
import { DialogTitleDirective } from './directives/dialog-title.directive';

const declarations = [
    DialogComponent,
    DialogBodyComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    DialogDefaultComponent,
    DialogContainerComponent,
    DialogCloseButtonComponent,
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
        ScrollbarModule,
        PortalModule,
        OverlayModule,
        DynamicPortalComponent,
        DialogFullScreenTogglerButtonComponent
    ],
    exports: [
        declarations,
        BarModule,
        TitleModule,
        TemplateModule,
        InitialFocusModule,
        DialogFullScreenTogglerButtonComponent
    ],
    providers: [DialogService, DynamicComponentService]
})
export class DialogModule {}
