/**
 * @file Defines the abstract base class for theming providers in Angular,
 * designed to integrate with UI5 Web Components' theme management.
 *
 * This provider registers itself with a global theming service (if available) and
 * manages a list of supported themes, allowing other parts of the application
 * to query theme support and apply themes to the underlying UI5 Web Components.
 */

// base-webcomponents-theming-provider.ts
import { inject, Injectable, OnDestroy, signal } from "@angular/core";
import { Ui5ThemingService } from "./ui5-theming-api";
import { Ui5ThemingProvider } from "./ui5-theming.models";
import supportedThemes from './supported-themes';
import { setTheme } from '@ui5/webcomponents-base/dist/config/Theme.js';

/**
 * @description
 * Abstract base class for UI5 Web Components theming providers.
 *
 * Components extending this class are responsible for providing the necessary theme resources
 * (via the `registerThemes` callback) and exposing the supported themes. It integrates
 * with the global {@link Ui5ThemingService} to make its themes available application-wide.
 *
 * @implements {Ui5ThemingProvider}
 * @implements {OnDestroy}
 */
@Injectable()
export abstract class WebcomponentsThemingProvider implements Ui5ThemingProvider, OnDestroy {
  /**
   * @description
   * The unique name for this theming provider, which must be implemented by subclasses.
   * This is used by the global {@link Ui5ThemingService} for registration and identification.
   */
  abstract name: string;

  /**
   * @description
   * A signal containing the list of themes supported by this provider.
   * It is initialized with the themes loaded from the `supported-themes` file.
   */
  protected availableThemes = signal<string[]>(supportedThemes);
  
  /**
   * @description
   * Reference to the global {@link Ui5ThemingService}, injected optionally.
   * The provider registers itself here if the global service is available.
   */
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

  /**
   * @description
   * Checks if a specific theme name is supported by this provider.
   * @param theme The name of the theme to check (e.g., 'sap_horizon').
   * @returns `true` if the theme is supported, `false` otherwise.
   */
  supportsTheme(theme: string): boolean | Promise<boolean> {
    return this.availableThemes().includes(theme);
  }

  /**
   * @description
   * Retrieves the list of theme names supported by this provider.
   * @returns An array of supported theme names.
   */
  getAvailableThemes(): string[] | Promise<string[]> {
    return this.availableThemes();
  }

  /**
   * @description
   * Attempts to set the given theme globally for all UI5 Web Components.
   *
   * The theme is only applied if it is included in the list of available themes
   * managed by this provider.
   *
   * @param theme The name of the theme to apply.
   * @returns A promise that resolves to `true` if the theme was applied, or `false` if the theme is not supported.
   */
  async setTheme(theme: string): Promise<boolean> {
    const supported = this.availableThemes().includes(theme);
    if (supported) {
      setTheme(theme);
    }
    return supported;
  }
}
