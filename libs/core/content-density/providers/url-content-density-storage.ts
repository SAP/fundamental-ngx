import { DestroyRef, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentDensityStorage } from '../classes/abstract-content-density-storage';
import { CONTENT_DENSITY_STORAGE_KEY } from '../tokens/content-density-storage-key.token';
import { DEFAULT_CONTENT_DENSITY } from '../tokens/default-content-density.token';
import { ContentDensityMode } from '../types/content-density.mode';

/**
 * Content density storage implementation using URL query parameters.
 * Persists the content density setting in the URL, allowing it to be
 * shared via links and bookmarked.
 */
@Injectable()
export class UrlContentDensityStorage implements ContentDensityStorage {
    /** Current content density as a readonly signal. */
    readonly contentDensity: ReturnType<WritableSignal<ContentDensityMode>['asReadonly']>;

    private readonly _contentDensity: WritableSignal<ContentDensityMode>;
    private readonly _router = inject(Router);
    private readonly _activatedRoute = inject(ActivatedRoute);
    private readonly _defaultContentDensity = inject(DEFAULT_CONTENT_DENSITY);
    private readonly _storageKey = inject(CONTENT_DENSITY_STORAGE_KEY);
    private readonly _destroyRef = inject(DestroyRef);

    constructor() {
        this._contentDensity = signal<ContentDensityMode>(this._defaultContentDensity);
        this.contentDensity = this._contentDensity.asReadonly();
        this._initialize();
    }

    /**
     * Updates the content density and reflects it in the URL query parameters.
     * @param density The new content density mode
     */
    setContentDensity(density: ContentDensityMode): void {
        this._contentDensity.set(density);
        this._setUrlQueryParam(density);
    }

    /** @hidden */
    private _initialize(): void {
        // Subscribe to query param changes and update signal.
        // Automatically unsubscribes when the service is destroyed.
        this._activatedRoute.queryParams.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((queryParams) => {
            const density = queryParams[this._storageKey];
            if (density && density !== this._contentDensity()) {
                this._contentDensity.set(density);
            }
        });
    }

    /** @hidden */
    private _setUrlQueryParam(density: ContentDensityMode): void {
        const currentUrl = this._router.url;
        const [pathname, search] = currentUrl.split('?');
        const params = new URLSearchParams(search || '');
        params.delete(this._storageKey);
        params.set(this._storageKey, density);

        this._router.navigateByUrl(`${pathname}?${params.toString()}`);
    }
}
