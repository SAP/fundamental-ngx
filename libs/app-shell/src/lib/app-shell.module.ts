import {
    APP_INITIALIZER,
    ErrorHandler,
    Injector,
    ModuleWithProviders,
    NgModule,
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
import { PluginManagerService } from './api/plugins/plugin-manager.service';
import { PluginDescriptor } from './api/plugins/lookup/plugin-descriptor.model';
import { ShellBarService } from './api/plugins/shell-bar.service';
import { MessagingService } from './api/events/messaging.service';

import {
    CONFIG_URL,
    IS_APPSHELL_STANDALONE
} from './tokens';
import { MessagingTopics } from './api/events/topics.service';
import {
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
                { provide: CONFIG_URL, useValue: configUrl },
                { provide: IS_APPSHELL_STANDALONE, useValue: isStandalone },
                {
                    provide: ShellBarService,
                    useFactory: shellBarSrv,
                    deps: [IS_APPSHELL_STANDALONE]
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
                    provide: APP_INITIALIZER,
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

export function loadConfiguration(http: HttpClient, plugins: PluginManagerService, url: string): () => Promise<boolean|void> {
    if (!url) {
        // todo_valorkin throw new Error('Plugins configuration error, `url` is a mandatory parameter')
        return () => Promise.resolve(true);
    }

    return () => http.get<Array<Partial<PluginDescriptor>>>(url).toPromise()
        .then(conf => plugins.loadConfiguration(conf));
}


export function createNotifiers(injector: Injector, notifiers?: Constructor<ErrorNotifier>[]): ErrorNotifier[] {
    if (!notifiers || notifiers.length === 0) {
        return [injector.get(ConsoleErrorNotifier)];
    }
    return notifiers.map(handler => injector.get(handler));
}


