import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MESSAGE_TOAST_CONFIG } from './constants';
import { MessageToastConfig } from './message-toast-utils/message-toast-config';

import { MessageToastComponent } from './message-toast.component';
import { MessageToastService } from './message-toast-service/message-toast.service';
import { MessageToastContainerComponent } from './message-toast-utils/message-toast-container.component';
import { DynamicComponentService } from '@fundamental-ngx/core/utils';

/**
 * Adds Message Toast functionality to your application.
 *
 * Can be imported in two ways:
 * * Plain MessageToastModule with default configuration
 * * With `withConfig()` method which allows passing custom default configuration.
 */
@NgModule({
    declarations: [MessageToastComponent, MessageToastContainerComponent],
    imports: [CommonModule],
    exports: [MessageToastComponent, MessageToastContainerComponent],
    providers: [
        MessageToastService,
        DynamicComponentService,
        // Provide default configuration which user can later override.
        {
            provide: MESSAGE_TOAST_CONFIG,
            useValue: new MessageToastConfig()
        }
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
