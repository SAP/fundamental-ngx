import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { isPromise, isSubscribable } from '../typecheck';

export type FdkAsyncProperty<T> = T | Observable<T> | Promise<T>;

@Pipe({
    name: 'fdkAsyncOrSync',
    standalone: true,
    pure: false
})
export class AsyncOrSyncPipe implements OnDestroy, PipeTransform {
    /** @hidden */
    private _cdr: ChangeDetectorRef | null;
    /** @hidden */
    private _asyncPipe: AsyncPipe;

    /** @hidden */
    constructor(ref: ChangeDetectorRef) {
        this._cdr = ref;
        this._asyncPipe = new AsyncPipe(this._cdr);
    }

    /**
     * Transforms raw async-like value into static one.
     * @param value raw value. Can be either a static value, or Promise-like, or Observable-like.
     */
    transform<T>(value: FdkAsyncProperty<T>): T | null {
        if (isPromise(value) || isSubscribable(value)) {
            return this._asyncPipe.transform(value);
        }
        return value;
    }

    /** @Hidden */
    ngOnDestroy(): void {
        this._asyncPipe.ngOnDestroy();
        this._cdr = null;
    }
}
