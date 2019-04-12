import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon/icon.module';
import { UtilsModule } from '../utils/utils.module';

import { AlertComponent } from './alert.component';
import { AlertService } from './alert-service/alert.service';
import { AlertContainerComponent } from './alert-utils/alert-container.component';

@NgModule({
    declarations: [AlertComponent, AlertContainerComponent],
    imports: [CommonModule, IconModule, UtilsModule],
    exports: [AlertComponent, AlertContainerComponent],
    entryComponents: [AlertContainerComponent, AlertComponent],
    providers: [AlertService]
})
export class AlertModule {}
