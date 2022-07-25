import { ElementRef, Injectable } from '@angular/core';
import { getNativeElement } from '@fundamental-ngx/fn/utils';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { ReadonlyObserver } from '../readonly';
import { DisabledObserver } from '../disabled';
import { AttributeObserver } from '../observers/attribute.observer';
import { HasElementRef } from '../has-element-ref';
import { isElementFocusableByDefault } from './is-element-focusable-by-default';

@Injectable({
    providedIn: 'root'
})
export class FocusableObserver {
    constructor(private _attributeObserver: AttributeObserver) {}

    static isFocusable(element: Element): boolean {
        if (ReadonlyObserver.isReadonly(element)) {
            return false;
        }
        if (DisabledObserver.isDisabled(element)) {
            return false;
        }
        const tabIndex = parseInt(element.getAttribute('tabindex') + '', 10);
        if (isNaN(tabIndex)) {
            return isElementFocusableByDefault(element);
        }
        return tabIndex > -1;
    }

    observe(element: HasElementRef<Element> | Element | ElementRef<Element>): Observable<boolean> {
        const nativeElement = getNativeElement(element);
        return this._attributeObserver.observe(nativeElement).pipe(
            map(() => FocusableObserver.isFocusable(nativeElement)),
            distinctUntilChanged()
        );
    }

    unobserve(element: HasElementRef<Element> | Element | ElementRef<Element>): void {
        this._attributeObserver.unobserve(element);
    }
}
