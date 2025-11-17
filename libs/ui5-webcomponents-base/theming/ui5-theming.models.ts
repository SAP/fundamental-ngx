import { InjectionToken } from '@angular/core';

export interface ThemingConfig {
  defaultTheme: string;
}

export const UI5_THEMING_CONFIGURATION = new InjectionToken<ThemingConfig>(
  'Ui5 global theming configuration.'
);

export interface Ui5ThemingProvider {
  name: string;
  getAvailableThemes(): string[] | Promise<string[]>;
  supportsTheme(themeName: string): boolean | Promise<boolean>;
  setTheme(themeName: string): Promise<boolean>;
}

export interface Ui5ThemingConsumer extends Omit<Ui5ThemingProvider, 'name'> {
  registerProvider(provider: Ui5ThemingProvider): void;
  unregisterProvider(provider: Ui5ThemingProvider): void;
}
