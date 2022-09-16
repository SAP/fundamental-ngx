import { Inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentDensityStorage } from '../classes/abstract-content-density-storage';
import { DEFAULT_CONTENT_DENSITY } from '../tokens/default-content-density.token';
import { CONTENT_DENSITY_STORAGE_KEY } from '../tokens/content-density-storage-key.token';
import { ContentDensityMode } from '../types/content-density.mode';
import { BehaviorSubject, distinctUntilChanged, filter, Observable, of } from 'rxjs';

@Injectable()
export class UrlContentDensityStorage implements ContentDensityStorage {
    private _current$: BehaviorSubject<ContentDensityMode>;

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        @Inject(DEFAULT_CONTENT_DENSITY) private _defaultContentDensity: ContentDensityMode,
        @Inject(CONTENT_DENSITY_STORAGE_KEY) private _storageKey: string
    ) {
        this._initialize();
    }

    private _initialize(): void {
        this._current$ = new BehaviorSubject<ContentDensityMode>(this._defaultContentDensity);

        this._activatedRoute.queryParams
            .pipe(filter((queryParams) => !!queryParams[this._storageKey]))
            .subscribe((queryParams) => {
                this._current$.next(queryParams[this._storageKey]);
            });
    }

    private _setUrlQueryParam(density: ContentDensityMode): void {
        const url = new URL(`https://google.com${this._router.url}`);
        url.searchParams.delete(this._storageKey);
        url.searchParams.append(this._storageKey, density);
        const queryParams = {};
        url.searchParams.forEach((value, key) => (queryParams[key] = value));

        this._router.navigateByUrl(url.pathname + '?' + url.searchParams.toString());
    }

    getContentDensity(): Observable<ContentDensityMode> {
        return this._current$.asObservable().pipe(distinctUntilChanged());
    }

    setContentDensity(density: ContentDensityMode): Observable<void> {
        this._current$.next(density);
        this._setUrlQueryParam(density);
        return of(undefined);
    }
}
