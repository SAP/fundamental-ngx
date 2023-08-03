import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert.component';
import { AlertService } from './alert-service/alert.service';
import { AlertContainerComponent } from './alert-utils/alert-container.component';
import { DynamicComponentService } from '@fundamental-ngx/cdk/utils';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { MessageStripComponent } from '@fundamental-ngx/core/message-strip';
import deprecated from 'deprecated-decorator';

/**
 * @deprecated
 * Alert component is deprecated since version 0.16.0
 * Message Strip component should be used instead.
 */
@deprecated({
    version: '0.16.0',
    alternative: 'Message Strip'
})
@NgModule({
    declarations: [AlertComponent, AlertContainerComponent],
    imports: [CommonModule, ButtonModule, MessageStripComponent],
    exports: [AlertComponent, AlertContainerComponent],
    providers: [AlertService, DynamicComponentService]
})
export class AlertModule {}
