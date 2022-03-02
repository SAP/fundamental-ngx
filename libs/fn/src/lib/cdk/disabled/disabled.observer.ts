import { ElementRef, Injectable } from '@angular/core';
import { AttributeObserver } from '../observers/attribute.observer';
import { Observable } from 'rxjs';
import { HasElementRef } from '../HasElementRef';
import { map, tap } from 'rxjs/operators';
import { getNativeElement } from '@fundamental-ngx/fn/utils';

@Injectable({
    providedIn: 'root'
})
export class DisabledObserver {
    constructor(private _attributeObserver: AttributeObserver) {}

    static isDisabled(el: Element): boolean {
        return (
            el.hasAttribute('disabled') ||
            el.getAttribute('aria-disabled') === 'true' ||
            el.classList.contains('is-disabled')
        );
    }

    observe(element: HasElementRef<Element> | Element | ElementRef<Element>): Observable<boolean> {
        return this._attributeObserver.observe(element).pipe(
            tap((observations) => console.log(observations, element)),
            map(() => DisabledObserver.isDisabled(getNativeElement(element)))
        );
    }
}
