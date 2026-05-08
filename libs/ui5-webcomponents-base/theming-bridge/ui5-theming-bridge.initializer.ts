import { EnvironmentProviders, inject, provideEnvironmentInitializer } from '@angular/core';
import { Ui5ThemingBridgeService } from './ui5-theming-bridge.service';

export function provideUi5ThemingBridge(): EnvironmentProviders {
    return provideEnvironmentInitializer(() => inject(Ui5ThemingBridgeService));
}
