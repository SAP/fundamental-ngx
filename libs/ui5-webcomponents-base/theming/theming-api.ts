import { Injectable } from "@angular/core";
import { WebcomponentsThemingProvider } from "./base-webcomponents-theming-provider";

/**
 * Theming service specifically for the ui5/webcomponents-ngx components.
 */
@Injectable({
  providedIn: 'root'
})
export class Ui5WebcomponentsThemingService extends WebcomponentsThemingProvider {
  name = 'ui5-webcomponents-theming-service';

  /** @hidden */
  constructor() {
    super(() => import('@ui5/webcomponents-theming/dist/generated/json-imports/Themes.js'));
  }
}
