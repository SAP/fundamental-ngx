import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageBoxComponent } from './message-box.component';
import { MessageBoxContainerComponent } from './message-box-container/message-box-container.component';
import { DynamicComponentService } from '../utils/dynamic-component';
import { MessageBoxService } from './services/message-box.service';
import { MessageBoxBodyComponent } from './message-box-body/message-box-body.component';
import { MessageBoxFooterComponent } from './message-box-footer/message-box-footer.component';
import { MessageBoxHeaderComponent } from './message-box-header/message-box-header.component';
import { MessageBoxDecisiveButton } from './directives/message-box-decisive-button.directive';
import { MessageBoxTitle } from './directives/message-box-title.directive';
import { BarModule } from '../bar/bar.module';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { TitleModule } from '../title/title.module';
import { MessageBoxDefaultComponent } from './message-box-default/message-box-default.component';
import { TemplateModule } from '../utils/directives/template/template.module';
import { InitialFocusModule } from '../utils/directives/initial-focus/initial-focus.module';
import { MessageBoxFooterButtonComponent } from './message-box-footer-button/message-box-footer-button.component';
import { MessageBoxCloseIconComponent } from './message-box-close-icon/message-box-close-icon.component';

const declarations = [
    MessageBoxFooterButtonComponent,
    MessageBoxCloseIconComponent,
    MessageBoxContainerComponent,
    MessageBoxDefaultComponent,
    MessageBoxFooterComponent,
    MessageBoxHeaderComponent,
    MessageBoxDecisiveButton,
    MessageBoxBodyComponent,
    MessageBoxComponent,
    MessageBoxTitle
];

@NgModule({
    declarations: [declarations],
    imports: [CommonModule, IconModule, InitialFocusModule, TemplateModule, BarModule, TitleModule, ButtonModule],
    exports: [declarations, IconModule, TemplateModule, InitialFocusModule, BarModule, TitleModule, ButtonModule],
    providers: [MessageBoxService, DynamicComponentService],
    entryComponents: [MessageBoxContainerComponent, MessageBoxDefaultComponent]
})
export class MessageBoxModule {
}
