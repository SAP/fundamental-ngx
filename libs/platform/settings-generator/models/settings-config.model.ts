import { SidebarWidthConfiguration } from './settings.model';

export interface BaseSettingsGeneratorConfig<TAdditionalLayouts extends string = string> {
    defaultLayout?: TAdditionalLayouts;
}

export interface SidebarSettingsGeneratorConfig extends BaseSettingsGeneratorConfig<'sidebar'> {
    /**
     * Sidebar configuration.
     */
    sidebar: {
        /**
         * Maximum width in pixels of Settings Generator Component, when sidebar should be rendered as toggleable with absolute positioning.
         */
        mobileBreakpoint: number;
        /**
         * Sidebar width configuration.
         */
        width: string | SidebarWidthConfiguration;
    };
}

export type SettingsConfig<
    TAdditionalLayouts extends string = string,
    TAdditionalProperties extends Record<string, unknown> = Record<string, unknown>
> = SidebarSettingsGeneratorConfig | (BaseSettingsGeneratorConfig<TAdditionalLayouts> & TAdditionalProperties);
