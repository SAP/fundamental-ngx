import { Component } from '@angular/core';

import { PlatformPanelConfig, PlatformConfig } from '@fundamental-ngx/platform';

export const panelConfigFactory = PlatformPanelConfig.createProviderFactory({
    collapseLabel: 'New Default Collapse Label',
    expandLabel: 'New Default Expand Label'
});

export const customPanelConfigProvider = {
    provide: PlatformPanelConfig,
    useFactory: panelConfigFactory,
    deps: [PlatformConfig]
};

@Component({
    selector: 'fdp-panel-config-example',
    templateUrl: './platform-panel-config-example.component.html',
    providers: [customPanelConfigProvider]
})
export class PlatformPanelConfigExampleComponent {}
