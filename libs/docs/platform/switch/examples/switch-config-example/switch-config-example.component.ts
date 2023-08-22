import { Component } from '@angular/core';

import { SwitchConfig } from '@fundamental-ngx/platform/form';
import { JsonPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlatformSwitchModule } from '@fundamental-ngx/platform/form';
import { FdpFormGroupModule } from '@fundamental-ngx/platform/form';

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
    providers: [customSwitchConfigProvider],
    standalone: true,
    imports: [FdpFormGroupModule, PlatformSwitchModule, FormsModule, ReactiveFormsModule, JsonPipe]
})
export class SwitchConfigExampleComponent {
    model: { switch: boolean } = {
        switch: true
    };
}
