import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppShellPageModule } from './components/app-shell-page/app-shell-page.module';
import { MessagingModule } from './api/events/messaging.module';
import { PluginLauncherModule } from './components/plugin-launcher/plugin-launcher.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

/**
 * xxx@@
 */
@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        HttpClientModule,
        AppShellPageModule,
        MessagingModule,
        PluginLauncherModule
    ],
    exports: [
        AppShellPageModule,
        PluginLauncherModule
    ]
})
export class AppShellModule {
}
