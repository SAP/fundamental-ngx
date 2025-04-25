import { ThemeDefinition, ThemeStyleLink } from './theme.interface';

export interface ThemingConfig {
    /**
     * Array of user-defined themes.
     */
    customThemes: ThemeDefinition[];
    /**
     * Default theme.
     */
    defaultTheme: string;
    /**
     * Whether to exclude default themes from the list of available options.
     */
    excludeDefaultThemes: boolean;
    /**
     * URL Query parameter flag to change theme based on the provided parameter.
     */
    themeQueryParam: string;
    /**
     * Whether to change theme if URL Query parameter flag has been found or changed.
     */
    changeThemeOnQueryParamChange: boolean;
    /**
     * Identifiers of theme style links.
     */
    themeStyleLinkIdentifiers: Record<ThemeStyleLink, string>;
}
