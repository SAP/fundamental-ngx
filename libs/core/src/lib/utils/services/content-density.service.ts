import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

export type ContentDensity = 'cozy' | 'condensed' | 'compact';
export const DEFAULT_CONTENT_DENSITY: ContentDensity = 'cozy';

/**
 * Service taking care of ContentDensity
 */
@Injectable()
export class ContentDensityService {
    /** 
     * @hidden 
     * Content Density behavior subject
     */
    private _contentDensity: BehaviorSubject<ContentDensity> = new BehaviorSubject(DEFAULT_CONTENT_DENSITY);
    /** 
     * @hidden 
     * Content Density changes stream
     */
    private _contentDensityChanges = this._contentDensity.asObservable().pipe(distinctUntilChanged());

    // TODO: Why it is hidden and named following private name convention? 
    // It is used widely in the lib
    /**
     * @hidden
     * Content Density changes stream
     */
    get _contentDensityListener(): Observable<ContentDensity> {
        return this._contentDensityChanges;
    }

    // TODO: We should hide BehaviorSubject from the public api 
    // and expose only observable and set method instead
    /** Content Density BehaviorSubject */
    get contentDensity(): BehaviorSubject<ContentDensity> {
        return this._contentDensity;
    }
}
