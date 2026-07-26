import { EnvironmentProviders, inject, provideEnvironmentInitializer } from '@angular/core';
import { Ui5WebcomponentsThemingService } from '@fundamental-ngx/ui5-webcomponents-base/theming';
import { Ui5ThemingBridgeService } from './ui5-theming-bridge.service';

export function provideUi5ThemingBridge(): EnvironmentProviders {
    return provideEnvironmentInitializer(() => {
        // Force-construct so both services self-register with Ui5ThemingService on bootstrap.
        inject(Ui5WebcomponentsThemingService);
        inject(Ui5ThemingBridgeService);
    });
}
