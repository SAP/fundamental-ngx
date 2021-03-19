import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluginLauncherComponent } from './plugin-launcher.component';
import { PluginPageLauncherComponent } from './plugin-page-launcher.component';
import { IframeErrorDirective } from './iframe-error.directive';

@NgModule({
    imports: [
        CommonModule

    ],
    declarations: [
        PluginLauncherComponent,
        PluginPageLauncherComponent,
        IframeErrorDirective
    ],
    exports: [
        PluginLauncherComponent,
        PluginPageLauncherComponent
    ]
})
export class PluginLauncherModule {
}
