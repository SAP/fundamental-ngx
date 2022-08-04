import { NgModule } from '@angular/core';
import { ContentDensityMode, ContentDensityModule, ContentDensityStorage } from '@fundamental-ngx/core/content-density';
import { Observable, of } from 'rxjs';

@NgModule({
    imports: [
        /**
         * Usage with built-in storages
         */
        ContentDensityModule.forRoot({
            storage: 'localStorage', // can be 'url' or 'memory'
            storageKey: '__someStorage_name__',
            defaultGlobalContentDensity: ContentDensityMode.COMPACT
        })
    ]
})
export class RootModule {}

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

@NgModule({
    imports: [
        /**
         * Usage with built-in storages
         */
        ContentDensityModule.forRoot({
            storage: {
                provide: ContentDensityStorage,
                useClass: CustomContentDensityStorage
            }
        })
    ]
})
export class RootModuleWithCustomProvider {}
