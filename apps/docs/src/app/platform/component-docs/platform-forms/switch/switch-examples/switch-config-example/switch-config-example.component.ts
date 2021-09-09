import { Component } from '@angular/core';

import { SwitchConfig } from '@fundamental-ngx/platform/form';

export const switchConfigFactory = SwitchConfig.createProviderFactory({
    contentDensity: 'compact'
});

export const customSwitchConfigProvider = {
    provide: SwitchConfig,
    useFactory: switchConfigFactory
};

@Component({
    selector: 'fdp-switch-config-example',
    templateUrl: './switch-config-example.component.html',
    providers: [customSwitchConfigProvider]
})
export class SwitchConfigExampleComponent {
    model: { switch: boolean } = {
        switch: true
    };
}
