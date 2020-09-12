import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluginLauncherComponent } from './plugin-launcher.component';
import { PluginPageLauncherComponent } from './plugin-page-launcher.component';

@NgModule({
    imports: [
        CommonModule

    ],
    declarations: [
        PluginLauncherComponent,
        PluginPageLauncherComponent
    ],
    exports: [
        PluginLauncherComponent,
        PluginPageLauncherComponent
    ]
})
export class PluginLauncherModule {
}
