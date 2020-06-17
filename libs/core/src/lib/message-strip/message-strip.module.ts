import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageStripComponent } from './message-strip.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
    declarations: [MessageStripComponent],
    imports: [CommonModule, ButtonModule],
    exports: [MessageStripComponent]
})
export class MessageStripModule {}
