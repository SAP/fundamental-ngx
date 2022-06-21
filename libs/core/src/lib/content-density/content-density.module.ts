import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentDensityDirective } from './directives/content-density.directive';
import { DEFAULT_CONTENT_DENSITY } from './tokens/default-content-density.token';
import { ContentDensityMode, ContentDensityModuleConfig } from './content-density.types';
import { ContentDensityStorage } from './classes/abstract-content-density-storage';
import { MemoryContentDensityStorage } from './providers/memory-content-density-storage';
import { ContentDensityControllerService } from './services/content-density-controller.service';
import { LocalContentDensityStorage } from './providers/local-content-density-storage';
import { CONTENT_DENSITY_STORAGE_KEY } from './tokens/content-density-storage-key.token';
import { UrlContentDensityStorage } from './providers/url-content-density-storage';
import { ContentDensityService } from '@fundamental-ngx/core/utils';
import { DeprecatedContentDensityService } from './services/deprecated-content-density.service';

function generateContentDensityStorage(config: ContentDensityModuleConfig): Provider {
    if (config.storage === 'localStorage') {
        return {
            provide: ContentDensityStorage,
            useClass: LocalContentDensityStorage
        };
    }
    if (config.storage === 'memory') {
        return {
            provide: ContentDensityStorage,
            useClass: MemoryContentDensityStorage
        };
    }
    if (config.storage === 'url') {
        return {
            provide: ContentDensityStorage,
            useClass: UrlContentDensityStorage,
            deps: [Router, ActivatedRoute, DEFAULT_CONTENT_DENSITY, CONTENT_DENSITY_STORAGE_KEY, DOCUMENT]
        };
    }
    return [];
}

@NgModule({
    imports: [CommonModule],
    exports: [ContentDensityDirective],
    declarations: [ContentDensityDirective]
})
export class ContentDensityModule {
    static forRoot(config?: ContentDensityModuleConfig): ModuleWithProviders<ContentDensityModule> {
        let storage: Provider;
        const conf: ContentDensityModuleConfig = config || { storage: 'memory' };

        if (typeof conf.storage === 'string') {
            storage = generateContentDensityStorage(conf);
        } else if (typeof conf.storage === 'object') {
            storage = conf.storage;
        } else {
            storage = {
                provide: ContentDensityStorage,
                useClass: MemoryContentDensityStorage
            };
        }

        return {
            ngModule: ContentDensityModule,
            providers: [
                {
                    provide: DEFAULT_CONTENT_DENSITY,
                    useValue: conf.defaultGlobalContentDensity || ContentDensityMode.COZY
                },
                {
                    provide: CONTENT_DENSITY_STORAGE_KEY,
                    useValue: (conf as any).storageKey || '__ContentDensity__'
                },
                {
                    provide: ContentDensityService,
                    useClass: DeprecatedContentDensityService
                },
                ContentDensityControllerService,
                storage
            ]
        };
    }
}
