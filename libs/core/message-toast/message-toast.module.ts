import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MessageToastTextComponent } from './components/message-toast-text.component';
import { MessageToastConfig } from './config/message-toast.config';
import { MESSAGE_TOAST_CONFIG } from './constants/message-toast.token';
import { MessageToastComponent } from './message-toast.component';
import { MessageToastService } from './message-toast.service';
import { provideMessageToastConfig } from './provide-config';

@NgModule({
    imports: [PortalModule, OverlayModule, MessageToastComponent, MessageToastTextComponent],
    exports: [MessageToastComponent],
    providers: [MessageToastService, { provide: MESSAGE_TOAST_CONFIG, useValue: new MessageToastConfig() }]
})
export class MessageToastModule {
    /**
     * Allows configuring module on a global level with custom configuration.
     * @param config User's custom configuration.
     */
    static withConfig(config: MessageToastConfig): ModuleWithProviders<MessageToastModule> {
        return {
            ngModule: MessageToastModule,
            providers: [provideMessageToastConfig(config)]
        };
    }
}
