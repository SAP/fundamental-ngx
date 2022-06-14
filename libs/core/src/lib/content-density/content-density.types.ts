import { Provider } from '@angular/core';

export const ContentDensityGlobalKeyword = 'global';

export enum ContentDensityMode {
    COZY = 'cozy',
    CONDENSED = 'condensed',
    COMPACT = 'compact'
}

export type LocalContentDensityMode = ContentDensityMode | typeof ContentDensityGlobalKeyword;

interface BaseContentDensityModuleConfig {
    defaultGlobalContentDensity?: ContentDensityMode;
}

interface LocalStorageConfig {
    storage: 'localStorage';
    storageKey?: string;
}

interface UrlStorageConfig {
    storage: 'url';
    storageKey?: string;
}

interface CustomStorageConfig {
    storage: Provider;
}

interface MemoryStorageConfig {
    storage: 'memory';
}

export type ContentDensityModuleConfig = (
    | LocalStorageConfig
    | MemoryStorageConfig
    | UrlStorageConfig
    | CustomStorageConfig
) &
    BaseContentDensityModuleConfig;
