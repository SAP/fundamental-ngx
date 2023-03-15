import { SidebarWidthConfiguration } from './settings.model';

export interface SettingsConfigInterface<TAdditionalLayouts extends string = string> {
    defaultLayout?: 'sidebar' | TAdditionalLayouts;
    sidebarWidth: string | SidebarWidthConfiguration;
}

export type SettingsConfig<
    TAdditionalLayouts extends string = string,
    TAdditionalProperties extends Record<string, unknown> = Record<string, unknown>
> = SettingsConfigInterface<TAdditionalLayouts> & TAdditionalProperties;
