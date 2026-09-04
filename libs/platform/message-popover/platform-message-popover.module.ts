import { ModuleWithProviders, NgModule } from '@angular/core';
import { mergeWith } from '@fundamental-ngx/cdk/utils';
import {
    FDP_MESSAGE_POPOVER_CONFIG,
    FDP_MESSAGE_POPOVER_DEFAULT_CONFIG,
    MessagePopoverConfig,
    MessagePopoverFormItemDirective,
    MessagePopoverFormWrapperComponent,
    MessagesListComponent
} from '@fundamental-ngx/platform/messages-shared';
import { MessagePopoverComponent } from './message-popover.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [
        MessagePopoverComponent,
        MessagePopoverFormWrapperComponent,
        MessagesListComponent,
        MessagePopoverFormItemDirective
    ],
    exports: [
        MessagePopoverComponent,
        MessagePopoverFormWrapperComponent,
        MessagesListComponent,
        MessagePopoverFormItemDirective
    ],
    providers: [
        {
            provide: FDP_MESSAGE_POPOVER_CONFIG,
            useValue: FDP_MESSAGE_POPOVER_DEFAULT_CONFIG
        }
    ]
})
export class PlatformMessagePopoverModule {
    /**
     * Method allows users to apply custom configuration.
     * @param config Object containing error definitions.
     */
    static withConfig(config: MessagePopoverConfig): ModuleWithProviders<PlatformMessagePopoverModule> {
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
            ngModule: PlatformMessagePopoverModule,
            providers: [
                {
                    provide: FDP_MESSAGE_POPOVER_CONFIG,
                    useValue: customConfig
                }
            ]
        };
    }
}
