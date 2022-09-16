import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ContentDensityStorage } from '../classes/abstract-content-density-storage';
import { ContentDensityMode } from '../types/content-density.mode';
import { DEFAULT_CONTENT_DENSITY } from '../tokens/default-content-density.token';

@Injectable()
export class MemoryContentDensityStorage implements ContentDensityStorage {
    private _currentContentDensity$: BehaviorSubject<ContentDensityMode>;

    constructor(@Inject(DEFAULT_CONTENT_DENSITY) defaultContentDensity: ContentDensityMode) {
        this._currentContentDensity$ = new BehaviorSubject(defaultContentDensity);
    }

    getContentDensity(): Observable<ContentDensityMode> {
        return this._currentContentDensity$.asObservable();
    }

    setContentDensity(density: ContentDensityMode): Observable<void> {
        this._currentContentDensity$.next(density);
        return of(undefined);
    }
}
