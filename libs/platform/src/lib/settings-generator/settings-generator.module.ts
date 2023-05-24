import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ListModule } from '@fundamental-ngx/core/list';
import { IconModule } from '@fundamental-ngx/core/icon';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { ScrollbarModule } from '@fundamental-ngx/core/scrollbar';
import { SplitterModule } from '@fundamental-ngx/core/splitter';
import { PortalModule } from '@angular/cdk/portal';
import { TitleModule } from '@fundamental-ngx/core/title';
import { PlatformFormGeneratorModule } from '@fundamental-ngx/platform/form';
import { TabsModule } from '@fundamental-ngx/core/tabs';
import { ClickedBehaviorModule, PipeModule } from '@fundamental-ngx/cdk/utils';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';

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
        CommonModule,
        ListModule,
        IconModule,
        AvatarModule,
        SplitterModule,
        PortalModule,
        TitleModule,
        PlatformFormGeneratorModule,
        TabsModule,
        ClickedBehaviorModule.forRoot(),
        PipeModule,
        SkeletonModule,
        ButtonModule,
        ScrollbarModule
    ],
    declarations: [
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
