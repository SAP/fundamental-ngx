import { inject, Injectable, Injector, Signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { ContentDensityStorage } from '../classes/abstract-content-density-storage';
import { ContentDensityMode } from '../types/content-density.mode';

/**
 * Service for managing global content density state.
 * Provides a signal-based API for reactive content density tracking.
 */
@Injectable()
export class GlobalContentDensityService {
    /** Current content density as a readonly signal. */
    readonly currentDensitySignal: Signal<ContentDensityMode>;

    private readonly _storage = inject(ContentDensityStorage);
    private readonly _injector = inject(Injector);

    /**
     * Current content density value.
     *
     * @deprecated Use currentDensitySignal() instead
     * @returns The current content density mode
     */
    get currentContentDensity(): ContentDensityMode {
        return this.currentDensitySignal();
    }

    constructor() {
        this.currentDensitySignal = this._storage.contentDensity;
    }

    /**
     * Returns an observable that emits content density changes.
     *
     * @deprecated Use currentDensitySignal signal instead
     * @returns Observable of content density changes
     */
    contentDensityListener(): Observable<ContentDensityMode> {
        return toObservable(this._storage.contentDensity, { injector: this._injector });
    }

    /**
     * Updates the global content density.
     * @param density The new content density mode
     */
    updateContentDensity(density: ContentDensityMode): void {
        this._storage.setContentDensity(density);
    }
}
