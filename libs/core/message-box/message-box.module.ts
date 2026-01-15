import { NgModule } from '@angular/core';
import { DynamicComponentService, InitialFocusModule, TemplateModule } from '@fundamental-ngx/cdk/utils';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { MessageBoxTemplateDirective } from './directives/message-box-template.directive';
import { MessageBoxBodyComponent } from './message-box-body/message-box-body.component';
import { MessageBoxContainerComponent } from './message-box-container/message-box-container.component';
import { MessageBoxDefaultComponent } from './message-box-default/message-box-default.component';
import { MessageBoxFooterComponent } from './message-box-footer/message-box-footer.component';
import { MessageBoxHeaderComponent } from './message-box-header/message-box-header.component';
import { MessageBoxSemanticIconComponent } from './message-box-semantic-icon/message-box-semantic-icon.component';
import { MessageBoxComponent } from './message-box.component';
import { MessageBoxService } from './services/message-box.service';

const declarations = [
    MessageBoxSemanticIconComponent,
    MessageBoxContainerComponent,
    MessageBoxDefaultComponent,
    MessageBoxFooterComponent,
    MessageBoxHeaderComponent,
    MessageBoxBodyComponent,
    MessageBoxComponent,
    MessageBoxTemplateDirective
];

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [TemplateModule, InitialFocusModule, TitleComponent, declarations],
    exports: [declarations, TemplateModule, InitialFocusModule, TitleComponent],
    providers: [MessageBoxService, DynamicComponentService]
})
export class MessageBoxModule {}
