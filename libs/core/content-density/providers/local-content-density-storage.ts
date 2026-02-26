import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { LocalStorageService } from '@fundamental-ngx/cdk/utils';
import { ContentDensityStorage } from '../classes/abstract-content-density-storage';
import { CONTENT_DENSITY_STORAGE_KEY } from '../tokens/content-density-storage-key.token';
import { DEFAULT_CONTENT_DENSITY } from '../tokens/default-content-density.token';
import { ContentDensityMode } from '../types/content-density.mode';

/**
 * Content density storage implementation using browser localStorage.
 * Persists the content density setting across browser sessions.
 */
@Injectable()
export class LocalContentDensityStorage implements ContentDensityStorage {
    /** Current content density as a readonly signal. */
    readonly contentDensity: ReturnType<WritableSignal<ContentDensityMode>['asReadonly']>;

    private readonly _contentDensity: WritableSignal<ContentDensityMode>;
    private readonly _defaultContentDensity = inject(DEFAULT_CONTENT_DENSITY);
    private readonly _storageKey = inject(CONTENT_DENSITY_STORAGE_KEY);
    private readonly _storage = inject(LocalStorageService);

    constructor() {
        this._initialize();
        const storedDensity = this._storage.get(this._storageKey) || this._defaultContentDensity;
        this._contentDensity = signal<ContentDensityMode>(storedDensity);
        this.contentDensity = this._contentDensity.asReadonly();
    }

    /**
     * Updates the content density and persists it to localStorage.
     * @param density The new content density mode
     */
    setContentDensity(density: ContentDensityMode): void {
        this._storage.set(this._storageKey, density);
        this._contentDensity.set(density);
    }

    /** @hidden */
    private _initialize(): void {
        if (!this._storage.get(this._storageKey)) {
            this._storage.set(this._storageKey, this._defaultContentDensity);
        }
    }
}
