import { Component, FactoryProvider } from '@angular/core';

import { PlatformPanelConfig } from '@fundamental-ngx/platform';

export const panelConfigProviderFactory = (): PlatformPanelConfig => {
    const config: PlatformPanelConfig = {
        contentDensity: 'compact',
        collapseLabel: 'New Default Collapse Label',
        expandLabel: 'New Default Expand Label'
    };
    return config;
};
export const panelConfigProvider: FactoryProvider = {
    provide: PlatformPanelConfig,
    useFactory: panelConfigProviderFactory
};

@Component({
    selector: 'fdp-panel-config-example',
    templateUrl: './platform-panel-config-example.component.html',
    providers: [panelConfigProvider]
})
export class PlatformPanelConfigExampleComponent {}
