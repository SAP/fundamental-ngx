import { ModuleWithProviders, NgModule } from '@angular/core';
import { PlatformFormGeneratorModule } from '@fundamental-ngx/platform/form';
import { ClickedBehaviorModule } from '@fundamental-ngx/cdk/utils';

import { FDP_SETTINGS_GENERATOR_DEFAULT_CONFIG } from './default-config';
import { SettingsConfig } from './models/settings-config.model';
import { SettingsGeneratorComponent } from './settings-generator.component';
import { SettingsGeneratorSidebarLayoutComponent } from './layouts/settings-generator-sidebar-layout/settings-generator-sidebar-layout.component';
import { SettingsGeneratorContentComponent } from './settings-generator-content/settings-generator-content.component';
import { SettingsGeneratorSectionComponent } from './settings-generator-content/settings-generator-section/settings-generator-section.component';
import {
    ThemeSelectorListComponent,
    ThemeSelectorListIconComponent
} from './controls/theme-selector-list/theme-selector-list.component';
import { SettingsGeneratorSidebarIconComponent } from './layouts/settings-generator-sidebar-layout/settings-generator-sidebar-icon/settings-generator-sidebar-icon.component';
import { SettingsGeneratorLayoutAccessorService } from './settings-generator-layout-accessor.service';
import { FDP_SETTINGS_GENERATOR_CONFIG } from './tokens';

@NgModule({
    imports: [
        ClickedBehaviorModule.forRoot(),
        PlatformFormGeneratorModule,
        SettingsGeneratorComponent,
        SettingsGeneratorSidebarLayoutComponent,
        SettingsGeneratorContentComponent,
        SettingsGeneratorSectionComponent,
        ThemeSelectorListComponent,
        ThemeSelectorListIconComponent,
        SettingsGeneratorSidebarIconComponent
    ],
    exports: [
        SettingsGeneratorComponent,
        SettingsGeneratorSidebarLayoutComponent,
        SettingsGeneratorContentComponent,
        SettingsGeneratorSectionComponent,
        ThemeSelectorListIconComponent
    ],
    providers: [
        SettingsGeneratorLayoutAccessorService,
        {
            provide: FDP_SETTINGS_GENERATOR_CONFIG,
            useValue: FDP_SETTINGS_GENERATOR_DEFAULT_CONFIG
        }
    ]
})
export class SettingsGeneratorModule {
    /**
     * Allows configuring module on a global level with custom configuration.
     * @param config User's custom configuration.
     */
    static withConfig(config: Partial<SettingsConfig>): ModuleWithProviders<SettingsGeneratorModule> {
        return {
            ngModule: SettingsGeneratorModule,
            providers: [
                {
                    provide: FDP_SETTINGS_GENERATOR_CONFIG,
                    useValue: { ...FDP_SETTINGS_GENERATOR_DEFAULT_CONFIG, ...config }
                }
            ]
        };
    }
}
