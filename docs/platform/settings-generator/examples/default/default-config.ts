import { NgModule } from '@angular/core';
import { SettingsConfig, SettingsGeneratorModule } from '@fundamental-ngx/platform/settings-generator';

// First generic argument corresponds to additional layouts. Useful for autocompletion and typechecks purposes.
// Second generic argument corresponds to additional settings options. Useful for autocompletion and typechecks purposes.
const SETTINGS_GENERATOR_CONFIG: Partial<SettingsConfig<'tabs' | 'flat', { additionalProperty: string }>> = {
    // Default layout to apply to all settings generator components
    defaultLayout: 'tabs',
    additionalProperty: 'somePropertyValue'
};

@NgModule({
    imports: [SettingsGeneratorModule.withConfig(SETTINGS_GENERATOR_CONFIG)]
})
export class ExampleAppModule {}
