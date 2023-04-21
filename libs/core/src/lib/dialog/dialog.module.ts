import { NgModule } from '@angular/core';
import { TitleModule } from '@fundamental-ngx/core/title';
import { BarModule } from '@fundamental-ngx/core/bar';
import { DynamicComponentService, InitialFocusModule, TemplateModule } from '@fundamental-ngx/cdk/utils';

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
    imports: [BarModule, TitleModule, TemplateModule, InitialFocusModule, declarations],
    exports: [declarations, BarModule, TitleModule, TemplateModule, InitialFocusModule],
    providers: [DialogService, DynamicComponentService]
})
export class DialogModule {}
