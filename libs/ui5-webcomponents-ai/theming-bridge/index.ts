import { EnvironmentProviders, inject, provideEnvironmentInitializer } from '@angular/core';
import { Ui5WebcomponentsAiThemingService } from '@fundamental-ngx/ui5-webcomponents-ai/theming';

export { Ui5WebcomponentsAiThemingService };

export function provideUi5WebcomponentsAi(): EnvironmentProviders {
    return provideEnvironmentInitializer(() => {
        inject(Ui5WebcomponentsAiThemingService);
    });
}
