import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { isPromise, isSubscribable } from '../typecheck';

@Pipe({
    name: 'fdkMakeAsync',
    pure: true,
    standalone: true
})
export class MakeAsyncPipe implements PipeTransform {
    /**
     * Transforms raw value into observable.
     * @param value raw value. Can be either a static value, or Promise-like, or Observable-like.
     */
    transform<T>(value: T | Promise<T> | Observable<T>): Observable<T> | Promise<T> {
        return isPromise(value) || isSubscribable(value) ? value : of(value);
    }
}
