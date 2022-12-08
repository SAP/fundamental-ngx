import { NgModule } from '@angular/core';
import { ThemingConfig, ThemingModule } from '@fundamental-ngx/core/theming';

const config: Partial<ThemingConfig> = {
    // Removes built-in themes from the list of available themes.
    excludeDefaultThemes: false,
    // Defines custom theme to be applied to the application.
    defaultTheme: 'sap_horizon',
    // Disables runtime theme change based on URL query parameter.
    changeThemeOnQueryParamChange: false,
    // Default theme fonts file.
    defaultFontFile: 'sap_horizon',
    // Whether to exclude theming font file.
    excludeThemingFonts: false
};

@NgModule({
    imports: [ThemingModule.withConfig(config)]
})
export class ExampleAppModule {}
