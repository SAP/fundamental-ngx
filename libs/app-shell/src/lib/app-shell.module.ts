import {
    APP_INITIALIZER,
    ModuleWithProviders,
    NgModule,
    NgZone,
    Optional
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
import { ShellBarService } from './api/extensions/shell-bar.service';
import { AppShellProviderService } from './api/app-shell-provider.service';
import { ThemeManagerService } from './api/theming/theme-manager.service';
import { MessagingService } from './api/events/messaging.service';
import { MessagingConfig } from './api/events/messaging.config';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';
import { LookupService } from './api/extensions/lookup/lookup.service';
import {
    CONFIG_URL,
    IS_APPSHELL_STANDALONE
} from './tokens';
import { RtlService } from '@fundamental-ngx/core';
import { MessagingTopics } from './api/events/topics.service';


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

    static forRoot(configUrl: string, isStandalone: boolean = false): ModuleWithProviders<AppShellModule> {

        return {
            ngModule: AppShellModule,
            providers: [
                MessagingConfig,
                LookupService,
                RtlService,
                MessagingTopics,
                { provide: CONFIG_URL, useValue: configUrl },
                { provide: IS_APPSHELL_STANDALONE, useValue: isStandalone },
                {
                    provide: ShellBarService,
                    useFactory: shellBarSrv,
                    deps: [IS_APPSHELL_STANDALONE]
                },
                {
                    provide: ThemeManagerService,
                    useClass: ThemeManagerService,
                    deps: [MessagingService, MessagingTopics]
                },
                {
                    provide: MessagingService,
                    useClass: MessagingService,
                    deps: [MessagingConfig, NgxPubSubService, MessagingTopics]
                },
                {
                    provide: PluginManagerService,
                    useClass: PluginManagerService,
                    deps: [LookupService, MessagingService, MessagingTopics]
                },
                {
                    provide: AppShellProviderService,
                    useClass: AppShellProviderService,
                    deps: [NgZone, MessagingTopics, ThemeManagerService, [new Optional(), ShellBarService]]
                },
                {
                    'provide': APP_INITIALIZER,
                    useFactory: loadConfiguration,
                    multi: true,
                    deps: [HttpClient, PluginManagerService, CONFIG_URL]
                }
            ]
        };
    }
}

export function shellBarSrv(isStandalone: boolean): ShellBarService | null {
    return isStandalone ? new ShellBarService() : null;
}

export function loadConfiguration(http: HttpClient, plugins: PluginManagerService, url: string): Promise<void> {
    const cFnc = function config(h: HttpClient, p: PluginManagerService, u: string): Promise<void> {

        if (url) {
            return new Promise((resolve: any) => {
                http.get(url).toPromise().then((conf: Partial<PluginDescriptor[]>) => {
                    plugins.loadConfiguration(conf);
                    resolve(true);
                });
            });
        } else {
            return new Promise<void>((resolve: any) => {
                resolve(true);
            });
        }
    };
    return cFnc.bind(http, plugins, url);
}




