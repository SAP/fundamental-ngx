import { ThemeDefinition, ThemeStyleLink } from './interfaces/theme.interface';
import { ThemingConfig } from './interfaces/theming-config.interface';

/**
 * Theming Configuration.
 */
export class BaseThemingConfig implements ThemingConfig {
    /**
     * Array of user-defined themes.
     */
    customThemes: ThemeDefinition[] = [];
    /**
     * Default theme.
     */
    defaultTheme = 'sap_horizon';
    /**
     * Whether to exclude default themes from the list of available options. By default, false.
     */
    excludeDefaultThemes = false;

    /**
     * URL Query parameter flag to change theme based on the provided parameter.
     */
    themeQueryParam = 'theme';
    /**
     * Whether to change theme if URL Query parameter flag has been found or changed. Default is true.
     */
    changeThemeOnQueryParamChange = true;
    /**
     * Identifiers of theme style links.
     */
    themeStyleLinkIdentifiers: Record<ThemeStyleLink, string> = {
        'base-theme': 'base-theme-styles',
        'custom-theme': 'custom-theme-styles'
    };
}
