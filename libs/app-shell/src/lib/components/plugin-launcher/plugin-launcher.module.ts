import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PluginLauncherComponent } from './plugin-launcher.component';

@NgModule({
    imports: [
        CommonModule,

    ],
    declarations: [
        PluginLauncherComponent
    ],
    exports: [
        PluginLauncherComponent
    ]
})
export class PluginLauncherModule {
}
