import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { ContentDensityStorage } from '../classes/abstract-content-density-storage';
import { DEFAULT_CONTENT_DENSITY } from '../tokens/default-content-density.token';
import { ContentDensityMode } from '../types/content-density.mode';

/**
 * Content density storage implementation using in-memory state.
 * The setting is lost when the application is refreshed.
 * This is the default storage implementation.
 */
@Injectable()
export class MemoryContentDensityStorage implements ContentDensityStorage {
    /** Current content density as a readonly signal. */
    readonly contentDensity: ReturnType<WritableSignal<ContentDensityMode>['asReadonly']>;

    private readonly _contentDensity: WritableSignal<ContentDensityMode>;

    constructor() {
        const defaultDensity = inject(DEFAULT_CONTENT_DENSITY);
        this._contentDensity = signal<ContentDensityMode>(defaultDensity);
        this.contentDensity = this._contentDensity.asReadonly();
    }

    /**
     * Updates the content density in memory.
     * @param density The new content density mode
     */
    setContentDensity(density: ContentDensityMode): void {
        this._contentDensity.set(density);
    }
}
