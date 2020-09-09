import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppShellPageModule } from './components/app-shell-page/app-shell-page.module';
import { MessagingModule } from './api/events/messaging.module';
import { PluginLauncherModule } from './components/plugin-launcher/plugin-launcher.module';

@NgModule({
    imports: [
        CommonModule,
        AppShellPageModule,
        MessagingModule,
        PluginLauncherModule
    ],
    exports: [
        AppShellPageModule
    ]
})
export class AppShellModule {
}
