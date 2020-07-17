import { Component, FactoryProvider } from '@angular/core';

import { PlatformPanelConfig, PlatformConfig } from '@fundamental-ngx/platform';

/**
 * It's possible to change only some options extending existed config
 */
export const panelConfigProviderFactory = (platformConfig: PlatformConfig): PlatformPanelConfig => {
    return {
        ...new PlatformPanelConfig(platformConfig),
        expandLabel: 'New Default Expand Label'
    };
};
export const configProviderToOverrideSomeValues: FactoryProvider = {
    provide: PlatformPanelConfig,
    useFactory: panelConfigProviderFactory,
    deps: [PlatformConfig]
};

/**
 * Also there is ability to override all properties entirely
 * In this case we don't need "deps" option at all
 */
export const configProvider: FactoryProvider = {
    provide: PlatformPanelConfig,
    useFactory: (): PlatformPanelConfig => {
        const config: PlatformPanelConfig = {
            contentDensity: 'compact',
            collapseLabel: 'New Default Collapse Label',
            expandLabel: 'New Default Expand Label'
        };
        return config;
    }
};

@Component({
    selector: 'fdp-panel-config-example',
    templateUrl: './platform-panel-config-example.component.html',
    providers: [configProviderToOverrideSomeValues]
})
export class PlatformPanelConfigExampleComponent {}
