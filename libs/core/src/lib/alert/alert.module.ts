import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert.component';
import { AlertService } from './alert-service/alert.service';
import { AlertContainerComponent } from './alert-utils/alert-container.component';
import { DynamicComponentService } from '@fundamental-ngx/core/utils';
import { ButtonModule } from '@fundamental-ngx/core/button';

/**
 * @deprecated
 * Alert component is depricated since version 0.16.0
 * Message Strip component should be used instead.
 */
@NgModule({
    declarations: [AlertComponent, AlertContainerComponent],
    imports: [CommonModule, ButtonModule],
    exports: [AlertComponent, AlertContainerComponent],
    providers: [AlertService, DynamicComponentService]
})
export class AlertModule {}
