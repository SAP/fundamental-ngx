import { inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { ContentDensityStorage } from '../classes/abstract-content-density-storage';
import { ContentDensityMode } from '../types/content-density.mode';

/**
 * Service for managing global content density state.
 *
 * Provides a signal-based API for reactive content density tracking.
 */
@Injectable()
export class GlobalContentDensityService {
    /** Current content density as a signal */
    readonly currentDensitySignal: Signal<ContentDensityMode>;

    private readonly _storage = inject(ContentDensityStorage);

    /**
     * Current content density.
     * @deprecated Use currentDensitySignal() instead
     */
    get currentContentDensity(): ContentDensityMode {
        return this.currentDensitySignal();
    }

    constructor() {
        this.currentDensitySignal = toSignal(this._storage.getContentDensity(), {
            initialValue: ContentDensityMode.COZY
        });
    }

    /** Listen to current content density changes */
    contentDensityListener(): Observable<ContentDensityMode> {
        return this._storage.getContentDensity();
    }

    /** Update content density */
    updateContentDensity(density: ContentDensityMode): Observable<void> {
        return this._storage.setContentDensity(density);
    }
}
