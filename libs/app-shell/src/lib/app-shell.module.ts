import {
    APP_INITIALIZER,
    InjectionToken,
    ModuleWithProviders,
    NgModule
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppShellPageModule } from './components/app-shell-page/app-shell-page.module';
import { MessagingModule } from './api/events/messaging.module';
import { PluginLauncherModule } from './components/plugin-launcher/plugin-launcher.module';
import {
    HttpClient,
    HttpClientModule
} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { PluginManagerService } from './api/extensions/plugin-manager.service';
import { PluginDescriptor } from './api/extensions/lookup/plugin-descriptor.model';

export const ConfigUrl = new InjectionToken<string>('appShell.configUrl');


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

    static forRoot(configUrl: string): ModuleWithProviders<AppShellModule> {

        return {
            ngModule: AppShellModule,
            providers: [
                { provide: ConfigUrl, useValue: configUrl },
                {
                    'provide': APP_INITIALIZER,
                    useFactory: loadConfiguration,
                    multi: true,
                    deps: [HttpClient, PluginManagerService, ConfigUrl]
                }
            ]
        };
    }
}


export function loadConfiguration(http: HttpClient, plugins: PluginManagerService, url: string): Promise<void> {
    const cFnc = function config(h: HttpClient, p: PluginManagerService, u: string): Promise<void> {

        const promise: Promise<void> = new Promise((resolve: any) => {
            http.get(url).toPromise().then((conf: Partial<PluginDescriptor[]>) => {
                plugins.loadConfiguration(conf);
                resolve(true);
            });
        });
        return promise;
    };
    return cFnc.bind(http, plugins, url);
}




