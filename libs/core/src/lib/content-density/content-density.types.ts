import { Provider } from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/core/utils';

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

export interface ContentDensityObserverSettings {
    modifiers?: Partial<Record<ContentDensityMode, string>>;
    supportedContentDensity?: ContentDensityMode[];
    defaultContentDensity?: ContentDensityMode;
}

export interface ContentDensityObserverTarget extends HasElementRef {
    contentDensitySettings: ContentDensityObserverSettings;
}

export type ContentDensityCallbackFn = (target: ContentDensityMode) => void;
