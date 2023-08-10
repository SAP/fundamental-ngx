import { ModuleWithProviders, NgModule } from '@angular/core';
import { mergeWith } from 'lodash-es';
import { FDP_MESSAGE_POPOVER_CONFIG, FDP_MESSAGE_POPOVER_DEFAULT_CONFIG, MessagePopoverConfig } from './default-config';
import { MessagePopoverComponent } from './message-popover.component';
import { MessagePopoverFormWrapperComponent } from './components/message-popover-form-wrapper/message-popover-form-wrapper.component';
import { MessageViewComponent } from './components/message-view/message-view.component';
import { MessagePopoverFormItemDirective } from './directives/message-popover-form-item.directive';

@NgModule({
    imports: [
        MessagePopoverComponent,
        MessagePopoverFormWrapperComponent,
        MessageViewComponent,
        MessagePopoverFormItemDirective
    ],
    exports: [
        MessagePopoverComponent,
        MessagePopoverFormWrapperComponent,
        MessageViewComponent,
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
