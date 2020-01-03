import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon/icon.module';

import { AlertComponent } from './alert.component';
import { AlertService } from './alert-service/alert.service';
import { AlertContainerComponent } from './alert-utils/alert-container.component';
import { DynamicComponentService } from '../utils/dynamic-component/dynamic-component.service';
import { ButtonModule } from '../button/button.module';

@NgModule({
    declarations: [AlertComponent, AlertContainerComponent],
    imports: [CommonModule, IconModule, ButtonModule],
    exports: [AlertComponent, AlertContainerComponent],
    entryComponents: [AlertContainerComponent, AlertComponent],
    providers: [AlertService, DynamicComponentService]
})
export class AlertModule {}
