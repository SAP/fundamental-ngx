import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { IconModule } from '@fundamental-ngx/core/icon';
import { LinkModule } from '@fundamental-ngx/core/link';
import { ListModule } from '@fundamental-ngx/core/list';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { ScrollbarModule } from '@fundamental-ngx/core/scrollbar';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { InitialFocusModule } from '@fundamental-ngx/cdk/utils';
import { I18nModule } from '@fundamental-ngx/i18n';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformObjectStatusModule } from '@fundamental-ngx/platform/object-status';
import { mergeWith } from 'lodash-es';
import { FDP_MESSAGE_POPOVER_CONFIG, FDP_MESSAGE_POPOVER_DEFAULT_CONFIG, MessagePopoverConfig } from './default-config';
import { MessagePopoverComponent } from './message-popover.component';
import { MessagePopoverFormWrapperComponent } from './components/message-popover-form-wrapper/message-popover-form-wrapper.component';
import { MessageViewComponent } from './components/message-view/message-view.component';
import { MessagePopoverFormItemDirective } from './directives/message-popover-form-item.directive';

@NgModule({
    imports: [
        CommonModule,
        IconModule,
        PopoverModule,
        BarModule,
        ListModule,
        SegmentedButtonModule,
        FormsModule,
        ButtonModule,
        ObjectStatusModule,
        ScrollbarModule,
        LinkModule,
        PlatformObjectStatusModule,
        PlatformButtonModule,
        I18nModule,
        InitialFocusModule
    ],
    exports: [
        MessagePopoverComponent,
        MessagePopoverFormWrapperComponent,
        MessageViewComponent,
        MessagePopoverFormItemDirective
    ],
    declarations: [
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
