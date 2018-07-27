import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeComponent } from './time.component';

import { UtilsModule } from '../utils/utils.module';

@NgModule({
    declarations: [TimeComponent],
    imports: [CommonModule, UtilsModule],
    exports: [TimeComponent]
})
export class TimeModule {}
