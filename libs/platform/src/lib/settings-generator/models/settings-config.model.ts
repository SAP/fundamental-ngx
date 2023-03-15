import { SidebarWidthConfiguration } from './settings.model';

export interface SettingsConfig<TAdditionalLayouts extends string = string> {
    defaultLayout?: 'sidebar' | TAdditionalLayouts;
    sidebarWidth: string | SidebarWidthConfiguration;
}
