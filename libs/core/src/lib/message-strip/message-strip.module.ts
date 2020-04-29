import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon/icon.module';

import { MessageStripComponent } from './message-strip.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
    declarations: [MessageStripComponent],
    imports: [CommonModule, IconModule, ButtonModule],
    exports: [MessageStripComponent]
})
export class MessageStripModule {}
