import { ModuleWithProviders, NgModule } from '@angular/core';
import { mergeWith } from '@fundamental-ngx/cdk/utils';
import { MessagePopoverFormWrapperComponent } from './components/message-popover-form-wrapper/message-popover-form-wrapper.component';
import { MessagesListComponent } from './components/messages-list/messages-list.component';
import { FDP_MESSAGE_POPOVER_CONFIG, FDP_MESSAGE_POPOVER_DEFAULT_CONFIG, MessagePopoverConfig } from './default-config';
import { MessagePopoverFormItemDirective } from './directives/message-popover-form-item.directive';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [MessagePopoverFormWrapperComponent, MessagesListComponent, MessagePopoverFormItemDirective],
    exports: [MessagePopoverFormWrapperComponent, MessagesListComponent, MessagePopoverFormItemDirective],
    providers: [
        {
            provide: FDP_MESSAGE_POPOVER_CONFIG,
            useValue: FDP_MESSAGE_POPOVER_DEFAULT_CONFIG
        }
    ]
})
export class PlatformMessagesSharedModule {
    /**
     * Method allows users to apply custom configuration.
     * @param config Object containing error definitions.
     */
    static withConfig(config: MessagePopoverConfig): ModuleWithProviders<PlatformMessagesSharedModule> {
        const customConfig = mergeWith(FDP_MESSAGE_POPOVER_DEFAULT_CONFIG, config, (obj, src) => {
            if (typeof obj === 'object' && !Array.isArray(obj)) {
                return Object.assign(obj, src);
            } else if (Array.isArray(obj)) {
                return obj.concat(src);
            } else {
                return src;
            }
        });

        return {
            ngModule: PlatformMessagesSharedModule,
            providers: [
                {
                    provide: FDP_MESSAGE_POPOVER_CONFIG,
                    useValue: customConfig
                }
            ]
        };
    }
}
