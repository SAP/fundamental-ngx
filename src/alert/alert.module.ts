import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon/icon.module';
import { UtilsModule } from '../utils/utils.module';

import { Alert } from './alert';

@NgModule({
    declarations: [Alert],
    imports: [CommonModule, IconModule, UtilsModule],
    exports: [Alert]
})
export class AlertModule {}
