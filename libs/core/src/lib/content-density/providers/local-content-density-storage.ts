import { Inject, Injectable } from '@angular/core';
import { LocalStorageService } from '@fundamental-ngx/core/utils';
import { Observable, of, Subject } from 'rxjs';
import { ContentDensityStorage } from '../classes/abstract-content-density-storage';
import { DEFAULT_CONTENT_DENSITY } from '../tokens/default-content-density.token';
import { CONTENT_DENSITY_STORAGE_KEY } from '../tokens/content-density-storage-key.token';
import { ContentDensityMode } from '../content-density.types';

@Injectable()
export class LocalContentDensityStorage implements ContentDensityStorage {
    private _update$ = new Subject<void>();

    constructor(
        @Inject(DEFAULT_CONTENT_DENSITY) private _defaultContentDensity: ContentDensityMode,
        @Inject(CONTENT_DENSITY_STORAGE_KEY) private _storageKey: string,
        private _storage: LocalStorageService
    ) {
        console.log({ _defaultContentDensity, _storageKey });
        this._initialize();
    }

    getContentDensity(): Observable<ContentDensityMode> {
        return new Observable<ContentDensityMode>((subscriber) => {
            subscriber.next(this._storage.get(this._storageKey));
            const subscription = this._update$.subscribe(() => {
                subscriber.next(this._storage.get(this._storageKey));
            });
            return () => {
                subscription.unsubscribe();
            };
        });
    }

    setContentDensity(density: ContentDensityMode): Observable<void> {
        this._storage.set(this._storageKey, density);
        this._update$.next();
        return of(undefined);
    }

    private _initialize(): void {
        if (!this._storage.get(this._storageKey)) {
            this._storage.set(this._storageKey, this._defaultContentDensity);
        }
    }
}
