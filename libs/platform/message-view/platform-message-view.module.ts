import { ModuleWithProviders, NgModule } from '@angular/core';
import { mergeWith } from '@fundamental-ngx/cdk/utils';
import {
    FDP_MESSAGE_POPOVER_CONFIG,
    FDP_MESSAGE_POPOVER_DEFAULT_CONFIG,
    MessagePopoverConfig
} from '@fundamental-ngx/platform/messages-shared';
import { MessageViewComponent } from './message-view.component';

/**
 * @deprecated
 * Use direct imports of components.
 */
@NgModule({
    imports: [MessageViewComponent],
    exports: [MessageViewComponent],
    providers: [
        {
            provide: FDP_MESSAGE_POPOVER_CONFIG,
            useValue: FDP_MESSAGE_POPOVER_DEFAULT_CONFIG
        }
    ]
})
export class PlatformMessageViewModule {
    /**
     * Method allows users to apply custom configuration.
     * @param config Object containing error definitions.
     */
    static withConfig(config: MessagePopoverConfig): ModuleWithProviders<PlatformMessageViewModule> {
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
            ngModule: PlatformMessageViewModule,
            providers: [
                {
                    provide: FDP_MESSAGE_POPOVER_CONFIG,
                    useValue: customConfig
                }
            ]
        };
    }
}
