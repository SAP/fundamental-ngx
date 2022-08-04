import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '@fundamental-ngx/core/icon';
import { ButtonModule } from '@fundamental-ngx/fn/button';
import { MessageStripComponent } from './message-strip.component';

@NgModule({
    imports: [CommonModule, ButtonModule, IconModule],
    exports: [MessageStripComponent],
    declarations: [MessageStripComponent]
})
export class MessageStripModule {}
