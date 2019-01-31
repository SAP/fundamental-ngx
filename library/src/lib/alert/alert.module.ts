import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon/icon.module';
import { UtilsModule } from '../utils/utils.module';

import { AlertComponent } from './alert.component';
import { AlertService } from './alert.service';

@NgModule({
    declarations: [AlertComponent],
    imports: [CommonModule, IconModule, UtilsModule],
    exports: [AlertComponent],
    providers: [AlertService]
})
export class AlertModule {}
