import { OverlayContainer, OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageToastConfig } from './config/message-toast.config';
import { MessageToastComponent } from './message-toast.component';
import { MessageToastService } from './message-toast.service';
import { MessageToastTextComponent } from './components/message-toast-text.component';
import { ToastOverlayContainer } from './toast-overlay-container.class';
import { MESSAGE_TOAST_CONFIG } from './constants/message-toast.token';

@NgModule({
    imports: [CommonModule, PortalModule, OverlayModule],
    exports: [MessageToastComponent],
    declarations: [MessageToastComponent, MessageToastTextComponent],
    providers: [
        MessageToastService,
        { provide: OverlayContainer, useClass: ToastOverlayContainer },
        { provide: MESSAGE_TOAST_CONFIG, useValue: new MessageToastConfig() }
    ]
})
export class MessageToastModule {
    /**
     * Allows configuring module on a global level with custom configuration.
     * @param config User's custom configuration.
     */
    static withConfig(config: MessageToastConfig): ModuleWithProviders<MessageToastModule> {
        return {
            ngModule: MessageToastModule,
            providers: [
                {
                    provide: MESSAGE_TOAST_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
