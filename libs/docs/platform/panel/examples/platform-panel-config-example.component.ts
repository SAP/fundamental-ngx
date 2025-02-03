import { Component } from '@angular/core';

import { PanelConfig, PlatformPanelModule } from '@fundamental-ngx/platform/panel';
import { PlatformConfig } from '@fundamental-ngx/platform/shared';

export const panelConfigFactory = PanelConfig.createProviderFactory({
    collapseLabel: 'New Default Collapse Label',
    expandLabel: 'New Default Expand Label'
});

export const customPanelConfigProvider = {
    provide: PanelConfig,
    useFactory: panelConfigFactory,
    deps: [PlatformConfig]
};

@Component({
    selector: 'fdp-platform-panel-config-example',
    templateUrl: './platform-panel-config-example.component.html',
    providers: [customPanelConfigProvider],
    imports: [PlatformPanelModule]
})
export class PlatformPanelConfigExampleComponent {}
