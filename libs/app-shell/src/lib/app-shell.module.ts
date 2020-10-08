import {
    APP_INITIALIZER,
    ErrorHandler,
    Injector,
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
import {
    DefaultFormatter,
    ERROR_FORMATTER,
    ErrorFormatter
} from './api/error/error-formatter';
import {
    ConsoleErrorNotifier,
    ERROR_NOTIFIERS,
    ErrorNotifier
} from './api/error/error-notifier';
import { DefaultErrorHandlerService } from './api/error/default-error-handler.service';

export type Constructor<T> = new (...args: any[]) => T

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

    static forRoot(configUrl: string,
                   isStandalone: boolean = false,
                   notifiers: Constructor<ErrorFormatter>[] = []): ModuleWithProviders<AppShellModule> {

        return {
            ngModule: AppShellModule,
            providers: [
                MessagingConfig,
                LookupService,
                RtlService,
                MessagingTopics,
                ConsoleErrorNotifier,
                DefaultFormatter,
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
                    deps: [NgZone, PluginManagerService, MessagingTopics, ThemeManagerService,
                        ShellBarService]
                },
                {
                    provide: ERROR_FORMATTER,
                    useClass: DefaultFormatter
                },
                {
                    provide: ERROR_NOTIFIERS,
                    useFactory: createNotifiers,
                    deps: [Injector, [new Optional(), notifiers]]
                },
                {
                    provide: ErrorHandler,
                    useClass: DefaultErrorHandlerService,
                    deps: [MessagingService, MessagingTopics, ERROR_FORMATTER,
                        [new Optional(), ERROR_NOTIFIERS]]
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

export function createNotifiers(injector: Injector, notifiers?: Constructor<ErrorNotifier>[]): ErrorNotifier[] {
    if (!notifiers || notifiers.length === 0) {
        return [injector.get(ConsoleErrorNotifier)];
    }
    return notifiers.map(handler => injector.get(handler));
}


