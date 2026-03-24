import { EnvironmentProviders, inject, provideEnvironmentInitializer } from '@angular/core';
import { Ui5LanguageService } from './ui5-language.service';

export function provideUi5LanguageBridge(): EnvironmentProviders {
    return provideEnvironmentInitializer(() => inject(Ui5LanguageService));
}
