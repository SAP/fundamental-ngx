import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { isPromise, isSubscribable } from '../typecheck';
import { Observable } from 'rxjs';

@Pipe({
    name: 'fdkAsyncOrSync',
    standalone: true,
    pure: false
})
export class AsyncOrSyncPipe implements OnDestroy, PipeTransform {
    /** @hidden */
    private _cdr: ChangeDetectorRef | null;
    /** @hidden */
    private _asyncPipe: AsyncPipe | null;

    /** @hidden */
    constructor(ref: ChangeDetectorRef) {
        this._cdr = ref;
        this._asyncPipe = new AsyncPipe(this._cdr);
    }

    /**
     * Transforms raw async-like value into static one.
     * @param value raw value. Can be either a static value, or Promise-like, or Observable-like.
     */
    transform<T>(value: T | Promise<T> | Observable<T>): T | null {
        return !isPromise(value) && !isSubscribable(value) ? value : this._asyncPipe?.transform(value) ?? null;
    }

    /** @Hidden */
    ngOnDestroy(): void {
        this._asyncPipe?.ngOnDestroy();
        this._asyncPipe = null;
        this._cdr = null;
    }
}
