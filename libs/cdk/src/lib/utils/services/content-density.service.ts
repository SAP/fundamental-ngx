import { Injectable, isDevMode } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { isCompactDensity } from '../functions/is-compact-density';
import { ContentDensity } from '../interfaces/content-density';
import { warnOnce } from '../helpers';

export const DEFAULT_CONTENT_DENSITY: ContentDensity = 'cozy';

/**
 * Service taking care of ContentDensity
 */
@Injectable()
export class ContentDensityService {
    /** Content Density BehaviourSubject */
    readonly contentDensity = new BehaviorSubject(DEFAULT_CONTENT_DENSITY);

    /** @hidden */
    constructor() {
        if (isDevMode()) {
            warnOnce(
                `[Deprecated] ContentDensityService is deprecated and will be removed in the next major version.
                 Please use ContentDensityControllerService instead, or use the ContentDensityModule forRoot method.`
            );
        }
    }

    /** @hidden */
    get _contentDensityListener(): Observable<ContentDensity> {
        return this.contentDensity.pipe(distinctUntilChanged(), startWith(this.contentDensity.getValue()));
    }

    /** @hidden */
    get _isCompactDensity(): Observable<boolean> {
        return this._contentDensityListener.pipe(map((density) => isCompactDensity(density)));
    }
}
