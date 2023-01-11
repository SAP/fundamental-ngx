import { ElementRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { isElementFocusableByDefault } from './is-element-focusable-by-default';
import { getNativeElement } from '../../helpers/get-native-element';
import { HasElementRef } from '../../interfaces/has-element-ref.interface';
import { AttributeObserver } from '../../services/observers/attribute.observer';
import { ReadonlyObserver } from '../readonly/readonly.observer';
import { DisabledObserver } from '../disabled/disabled.observer';

@Injectable({
    providedIn: 'root'
})
export class FocusableObserver {
    /** @hidden */
    constructor(private _attributeObserver: AttributeObserver) {}

    /** @Hidden */
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

    /** @hidden */
    observe(element: HasElementRef<Element> | Element | ElementRef<Element>): Observable<boolean> {
        const nativeElement = getNativeElement(element);
        return this._attributeObserver.observe(nativeElement).pipe(
            map(() => FocusableObserver.isFocusable(nativeElement)),
            distinctUntilChanged()
        );
    }

    /** @hidden */
    unobserve(element: HasElementRef<Element> | Element | ElementRef<Element>): void {
        this._attributeObserver.unobserve(element);
    }
}
