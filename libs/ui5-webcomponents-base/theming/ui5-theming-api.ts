// ui5-theming.service.ts
import { inject, Injectable, isDevMode, signal, computed, effect } from '@angular/core';
import {
  UI5_THEMING_CONFIGURATION,
  Ui5ThemingProvider,
  Ui5ThemingConsumer,
} from './ui5-theming.models';

@Injectable({
  providedIn: 'root'
})
export class Ui5ThemingService implements Ui5ThemingConsumer {

  readonly availableThemes = computed<string[]>(() => {
    const providers = this._providers();
    const uniqueThemes = new Set<string>();
    
    // Using a normal loop to handle synchronous and asynchronous results
    for (const provider of providers) {
      const themes = provider.getAvailableThemes();
      if (Array.isArray(themes)) {
        themes.forEach(theme => uniqueThemes.add(theme));
      } else {
        // TODO Since providers now return a promise, we'd need to handle this asynchronously
        // For simplicity, we'll assume a `Promise` is returned and handle it inside the effect
      }
    }
    return [...uniqueThemes.values()];
  });

  private readonly _config = inject(UI5_THEMING_CONFIGURATION, { optional: true });
  private readonly _providers = signal<Ui5ThemingProvider[]>([]);

  private readonly _currentTheme = signal(this._config?.defaultTheme || 'sap_fiori_3');

  constructor() {
    effect(async () => {
      const newTheme = this._currentTheme();
      const providers = this._providers();

      if (providers.length === 0) {
        return;
      }

      const results = await Promise.all(
        providers.map(async (provider) => {
          const isSupported = await provider.supportsTheme(newTheme);
          return { provider, isSupported };
        })
      );

      const unsupportedProviders = results.filter(r => !r.isSupported);
      if (unsupportedProviders.length > 0 && isDevMode()) {
        console.warn(
          `The following providers do not support the theme "${newTheme}":`,
          unsupportedProviders.map(({ provider }) => provider.name)
        );
      }

      await Promise.all(
        results.filter(r => r.isSupported).map(({ provider }) =>
          provider.setTheme(newTheme)
        )
      );
    });
  }


  getAvailableThemes(): string[] {
    return this.availableThemes();
  }

  supportsTheme(themeName: string): Promise<boolean> {
    return Promise.resolve(this.availableThemes().includes(themeName));
  }

  registerProvider(provider: Ui5ThemingProvider): void {
    const providers = this._providers();
    if (!providers.includes(provider)) {
      this._providers.update(currentProviders => [...currentProviders, provider]);
    }
  }

  unregisterProvider(provider: Ui5ThemingProvider): void {
    this._providers.update(currentProviders =>
      currentProviders.filter(p => p !== provider)
    );
  }

  setTheme(theme: string): Promise<boolean> {
    this._currentTheme.set(theme);
    return Promise.resolve(true);
  }
}
