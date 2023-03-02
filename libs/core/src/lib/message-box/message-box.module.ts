import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageBoxComponent } from './message-box.component';
import { MessageBoxContainerComponent } from './message-box-container/message-box-container.component';
import { DynamicComponentService } from '@fundamental-ngx/cdk/utils';
import { MessageBoxService } from './services/message-box.service';
import { MessageBoxBodyComponent } from './message-box-body/message-box-body.component';
import { MessageBoxFooterComponent } from './message-box-footer/message-box-footer.component';
import { MessageBoxHeaderComponent } from './message-box-header/message-box-header.component';
import { MessageBoxDecisiveButton } from './directives/message-box-decisive-button.directive';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { IconModule } from '@fundamental-ngx/core/icon';
import { TitleModule } from '@fundamental-ngx/core/title';
import { MessageBoxDefaultComponent } from './message-box-default/message-box-default.component';
import { TemplateModule } from '@fundamental-ngx/cdk/utils';
import { InitialFocusModule } from '@fundamental-ngx/cdk/utils';
import { MessageBoxFooterButtonComponent } from './message-box-footer-button/message-box-footer-button.component';
import { MessageBoxSemanticIconComponent } from './message-box-semantic-icon/message-box-semantic-icon.component';
import { PortalModule } from '@angular/cdk/portal';

const declarations = [
    MessageBoxFooterButtonComponent,
    MessageBoxSemanticIconComponent,
    MessageBoxContainerComponent,
    MessageBoxDefaultComponent,
    MessageBoxFooterComponent,
    MessageBoxHeaderComponent,
    MessageBoxDecisiveButton,
    MessageBoxBodyComponent,
    MessageBoxComponent
];

@NgModule({
    declarations: [declarations],
    imports: [
        CommonModule,
        IconModule,
        InitialFocusModule,
        TemplateModule,
        BarModule,
        TitleModule,
        ButtonModule,
        PortalModule
    ],
    exports: [declarations, TemplateModule, InitialFocusModule, TitleModule],
    providers: [MessageBoxService, DynamicComponentService]
})
export class MessageBoxModule {}
