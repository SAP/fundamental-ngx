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
    defaultTheme = 'sap_fiori_3';
    /**
     * Default theme font file. Used as a fallback for themes which do not have own font file.
     */
    defaultFontFile = 'sap_fiori_3';
    /**
     * Whether to exclude default themes from the list of available options. By default, false.
     */
    excludeDefaultThemes = false;
    /**
     * Whether to exclude theme font file from inserting it onto the page. By default, false.
     */
    excludeThemingFonts = false;
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
        'custom-theme': 'custom-theme-styles',
        fonts: 'theme-font-styles'
    };
}
