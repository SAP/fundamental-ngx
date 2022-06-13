import { Inject, Injectable, OnDestroy } from '@angular/core';
import { ContentDensityStorage } from '../classes/abstract-content-density-storage';
import { Observable, Subscription } from 'rxjs';
import { GlobalContentDensityMode } from '../content-density.types';
import { DEFAULT_CONTENT_DENSITY } from '../tokens/default-content-density.token';

@Injectable()
export class ContentDensityControllerService implements OnDestroy {
    currentContentDensity: GlobalContentDensityMode;
    private _subscription = new Subscription();

    constructor(
        @Inject(ContentDensityStorage) private _storage: ContentDensityStorage,
        @Inject(DEFAULT_CONTENT_DENSITY) private _defaultContentDensity: GlobalContentDensityMode
    ) {
        this._subscription.add(
            this.contentDensityListener().subscribe((density) => {
                this.currentContentDensity = density;
            })
        );
    }

    contentDensityListener(): Observable<GlobalContentDensityMode> {
        return this._storage.getContentDensity();
    }

    updateContentDensity(density: GlobalContentDensityMode): Observable<void> {
        return this._storage.setContentDensity(density);
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }
}
