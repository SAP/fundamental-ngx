import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsGeneratorComponent } from './settings-generator.component';
import { SettingsGeneratorSidebarLayoutComponent } from './layouts/settings-generator-sidebar-layout/settings-generator-sidebar-layout.component';
import { ListModule } from '@fundamental-ngx/core/list';
import { IconModule } from '@fundamental-ngx/core/icon';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { SplitterModule } from '@fundamental-ngx/core/splitter';
import { SettingsGeneratorTabsLayoutComponent } from './layouts/settings-generator-tabs-layout/settings-generator-tabs-layout.component';
import { SettingsGeneratorContentComponent } from './settings-generator-content/settings-generator-content.component';
import { PortalModule } from '@angular/cdk/portal';
import { TitleModule } from '@fundamental-ngx/core/title';
import { PlatformFormGeneratorModule } from '@fundamental-ngx/platform/form';
import { TabsModule } from '@fundamental-ngx/core/tabs';
import { SettingsGeneratorSectionComponent } from './settings-generator-content/settings-generator-section/settings-generator-section.component';
import {
    ThemeSelectorListComponent,
    ThemeSelectorListIconComponent
} from './controls/theme-selector-list/theme-selector-list.component';
import { ClickedBehaviorModule, PipeModule } from '@fundamental-ngx/cdk/utils';
import { SettingsGeneratorSectionDirective } from './directives/settings-generator-section.directive';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';

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
        ClickedBehaviorModule,
        PipeModule,
        SkeletonModule
    ],
    declarations: [
        SettingsGeneratorComponent,
        SettingsGeneratorSidebarLayoutComponent,
        SettingsGeneratorTabsLayoutComponent,
        SettingsGeneratorContentComponent,
        SettingsGeneratorSectionComponent,
        ThemeSelectorListComponent,
        ThemeSelectorListIconComponent,
        SettingsGeneratorSectionDirective
    ],
    exports: [
        SettingsGeneratorComponent,
        SettingsGeneratorSidebarLayoutComponent,
        SettingsGeneratorTabsLayoutComponent,
        SettingsGeneratorContentComponent,
        SettingsGeneratorSectionComponent,
        ThemeSelectorListIconComponent,
        SettingsGeneratorSectionDirective
    ]
})
export class SettingsGeneratorModule {}
