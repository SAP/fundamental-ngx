import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon/icon.module';
import { UtilsModule } from '../utils/utils.module';

import { AlertComponent } from './alert.component';

@NgModule({
    declarations: [AlertComponent],
    imports: [CommonModule, IconModule, UtilsModule],
    exports: [AlertComponent]
})
export class AlertModule {}
