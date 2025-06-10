import { DOCUMENT, Provider } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentDensityService } from '@fundamental-ngx/cdk/utils';
import { ContentDensityStorage } from './classes/abstract-content-density-storage';
import { ContentDensityModuleConfig } from './content-density.types';
import { LocalContentDensityStorage } from './providers/local-content-density-storage';
import { MemoryContentDensityStorage } from './providers/memory-content-density-storage';
import { UrlContentDensityStorage } from './providers/url-content-density-storage';
import { DeprecatedContentDensityService } from './services/deprecated-content-density.service';
import { GlobalContentDensityService } from './services/global-content-density.service';
import { CONTENT_DENSITY_STORAGE_KEY } from './tokens/content-density-storage-key.token';
import { DEFAULT_CONTENT_DENSITY } from './tokens/default-content-density.token';
import { ContentDensityMode } from './types/content-density.mode';

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

/**
 * Provides content density services and configurations
 * @param config
 */
export function provideContentDensity(config?: ContentDensityModuleConfig): Provider[] {
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
    return [
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
        GlobalContentDensityService,
        storage
    ];
}
