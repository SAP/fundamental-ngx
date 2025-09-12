// base-webcomponents-theming-provider.ts
import { inject, Injectable, OnDestroy, signal } from "@angular/core";
import { Ui5ThemingService } from "./ui5-theming-api";
import { Ui5ThemingProvider } from "./ui5-theming.models";
import supportedThemes from './supported-themes';
import { setTheme } from '@ui5/webcomponents-base/dist/config/Theme.js';

@Injectable()
export abstract class WebcomponentsThemingProvider implements Ui5ThemingProvider, OnDestroy {
  abstract name: string;

  protected availableThemes = signal<string[]>(supportedThemes);

  protected _globalThemingService: Ui5ThemingService | null = inject(Ui5ThemingService, { optional: true });

  /** @hidden */
  protected constructor(
    protected registerThemes: () => Promise<any>
  ) {
    this.registerThemes().then(() => {
      this._globalThemingService?.registerProvider(this);
    });
  }

  /** @hidden */
  ngOnDestroy(): void {
    this._globalThemingService?.unregisterProvider(this);
  }

  supportsTheme(theme: string): boolean | Promise<boolean> {
    return this.availableThemes().includes(theme);
  }

  getAvailableThemes(): string[] | Promise<string[]> {
    return this.availableThemes();
  }

  async setTheme(theme: string): Promise<boolean> {
    const supported = this.availableThemes().includes(theme);
    if (supported) {
      setTheme(theme);
    }
    return supported;
  }
}
