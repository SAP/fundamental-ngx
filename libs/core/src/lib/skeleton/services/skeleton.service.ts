import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DEFAULT_SKELETON_STATE } from '../tokens/default-skeleton-state.token';

@Injectable()
export class SkeletonService {
    /** @hidden */
    private _skeletonState: BehaviorSubject<boolean>;

    /** Actual global skeleton state. */
    get skeletonState(): boolean {
        return this._skeletonState.getValue();
    }

    /** Observable with global skeleton state. */
    get skeletonStateObservable(): Observable<boolean> {
        return this._skeletonState.asObservable();
    }

    /** @hidden */
    constructor(@Inject(DEFAULT_SKELETON_STATE) private _defaultSkeletonState: boolean) {
        this._skeletonState = new BehaviorSubject<boolean>(this._defaultSkeletonState);
    }

    /** Method to update global skeleton state. */
    setSkeletonState(state: boolean): void {
        return this._skeletonState.next(state);
    }
}
