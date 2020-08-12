import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SwitchConfig } from '@fundamental-ngx/platform';

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
    customForm = new FormGroup({
        switch: new FormControl(false)
    });
}
