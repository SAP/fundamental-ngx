import { ChangeDetectorRef, OnDestroy, Optional, Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalContentDensityService } from '../services/local-content-density.service';

import { ContentDensity, DEFAULT_CONTENT_DENSITY } from './../services/content-density.service';

@Pipe({
    name: 'listenDensity',
    pure: false
})
export class ListenToDensityPipe implements PipeTransform, OnDestroy {
    /** @hidden */
    private _subscription = new Subscription();

    /** @hidden */
    constructor(private _cdr: ChangeDetectorRef, @Optional() private _localDensityService: LocalContentDensityService) {
        this._setupLocalDenistyListener();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    /** @hidden */
    transform(value: ContentDensity | null): ContentDensity {
        return value || this._localDensityService?.contentDensity.getValue() || DEFAULT_CONTENT_DENSITY;
    }

    /** @hidden */
    private _setupLocalDenistyListener(): void {
        this._subscription.add(
            this._localDensityService?._contentDensityListener.subscribe(() => this._cdr.markForCheck())
        );
    }
}
