/**
 * Type of theme styling resource.
 */
export type ThemeStyleLink = 'base-theme' | 'custom-theme' | 'fonts';

/**
 * Base theme interface.
 */
export interface BaseTheme {
    /**
     * Unique ID of a theme.
     */
    id: string;
    /**
     * Theme name.
     */
    name: string;
    /**
     * Theme description.
     */
    description?: string;
}

/**
 * User provided theme interface.
 */
export interface ThemeDefinition extends BaseTheme {
    /**
     * Theming resource files.
     */
    theming?: ThemingResource;
}

/**
 * Complete theme interface with all provided properties.
 */
export interface CompleteThemeDefinition extends BaseTheme {
    /**
     * Theming resource files.
     */
    theming: CompleteThemingResource;
}

/**
 * User provided theming resource.
 */
export type ThemingResource = Partial<CompleteThemingResource>;

/**
 * Complete theming resource interface with all provided properties.
 */
export interface CompleteThemingResource {
    /**
     * Base theming css file path. Usually a path for the @sap-theming css variables file.
     */
    themingBasePath: string;
    /**
     * Theming css file path. Usually a path for the fundamental-styles css variables file.
     */
    themePath: string;
    /**
     * Theme icons css file path.
     */
    themeFontPath: string;
}
