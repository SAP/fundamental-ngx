import { ApplicationConfig } from '@angular/core';
import {
    ContentDensityMode,
    ContentDensityStorage,
    provideContentDensity
} from '@fundamental-ngx/core/content-density';
import { Observable, of } from 'rxjs';

/**
 * Usage with built-in storages in standalone application config
 */
export const appConfig: ApplicationConfig = {
    providers: [
        provideContentDensity({
            storage: 'localStorage', // can be 'url' or 'memory'
            storageKey: '__someStorage_name__',
            defaultGlobalContentDensity: ContentDensityMode.COMPACT
        })
    ]
};

/**
 * This is a very simple example of providing your own ContentDensityStorage.
 * You are free to do anything you want with it, store it somewhere in cloud
 * for example
 */
class CustomContentDensityStorage implements ContentDensityStorage {
    getContentDensity(): Observable<ContentDensityMode> {
        return of(ContentDensityMode.COMPACT);
    }

    setContentDensity(density: ContentDensityMode): Observable<void> {
        console.log({ density });
        return of(undefined);
    }
}

/**
 * Usage with custom storage provider
 */
export const appConfigWithCustomStorage: ApplicationConfig = {
    providers: [
        provideContentDensity({
            storage: {
                provide: ContentDensityStorage,
                useClass: CustomContentDensityStorage
            }
        })
    ]
};
