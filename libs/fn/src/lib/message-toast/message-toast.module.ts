import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseToastOverlayContainer } from '@fundamental-ngx/fn/cdk';
import { MessageToastComponent } from './message-toast.component';
import { MessageToastService } from './message-toast.service';
import { SimpleMessageToastComponent } from './components/simple-message-toast/simple-message-toast.component';

@NgModule({
    imports: [CommonModule, PortalModule, OverlayModule],
    exports: [MessageToastComponent],
    declarations: [MessageToastComponent, SimpleMessageToastComponent],
    providers: [MessageToastService, { provide: OverlayContainer, useClass: BaseToastOverlayContainer }]
})
export class MessageToastModule {}
