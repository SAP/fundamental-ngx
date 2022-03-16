import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseToastOverlayContainer } from '@fundamental-ngx/fn/cdk';
import { MessageToastComponent } from './message-toast.component';
import { MessageToastService } from './message-toast.service';
import { MessageToastTextComponent } from './components/message-toast-text.component';

@NgModule({
    imports: [CommonModule, PortalModule, OverlayModule],
    exports: [MessageToastComponent],
    declarations: [MessageToastComponent, MessageToastTextComponent],
    providers: [MessageToastService, { provide: OverlayContainer, useClass: BaseToastOverlayContainer }]
})
export class MessageToastModule {}
