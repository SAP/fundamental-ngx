import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageToastComponent } from './message-toast.component';
import { MessageToastService } from './message-toast-service/message-toast.service';
import { MessageToastContainerComponent } from './message-toast-utils/message-toast-container.component';
import { DynamicComponentService } from '@fundamental-ngx/core/utils';

@NgModule({
    declarations: [MessageToastComponent, MessageToastContainerComponent],
    imports: [CommonModule],
    exports: [MessageToastComponent, MessageToastContainerComponent],
    entryComponents: [MessageToastContainerComponent, MessageToastComponent],
    providers: [MessageToastService, DynamicComponentService]
})
export class MessageToastModule {}
