import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ContentDensityStorage } from '../classes/abstract-content-density-storage';
import { ContentDensityMode } from '../types/content-density.mode';
import { DEFAULT_CONTENT_DENSITY } from '../tokens/default-content-density.token';

@Injectable()
export class MemoryContentDensityStorage implements ContentDensityStorage {
    /** @hidden */
    private _currentContentDensity$: BehaviorSubject<ContentDensityMode>;

    /** @hidden */
    constructor(@Inject(DEFAULT_CONTENT_DENSITY) defaultContentDensity: ContentDensityMode) {
        this._currentContentDensity$ = new BehaviorSubject(defaultContentDensity);
    }

    /** Content density observable */
    getContentDensity(): Observable<ContentDensityMode> {
        return this._currentContentDensity$.asObservable();
    }

    /** Change content density */
    setContentDensity(density: ContentDensityMode): Observable<void> {
        this._currentContentDensity$.next(density);
        return of(undefined);
    }
}
