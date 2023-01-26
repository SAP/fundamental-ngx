import { ElementRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { isElementFocusableByDefault } from './is-element-focusable-by-default';
import { getNativeElement } from '../../helpers/get-native-element';
import { HasElementRef } from '../../interfaces/has-element-ref.interface';
import { AttributeObserver } from '../../services/observers/attribute.observer';
import { DisabledObserver } from '../disabled/disabled.observer';

@Injectable({
    providedIn: 'root'
})
export class FocusableObserver {
    /** @hidden */
    constructor(private _attributeObserver: AttributeObserver) {}

    /** @Hidden */
    static isFocusable(element: Element, respectTabIndex: boolean): boolean {
        if (DisabledObserver.isDisabled(element)) {
            return false;
        }

        if (!respectTabIndex) {
            return true;
        }

        const tabIndex = parseInt(element.getAttribute('tabindex') + '', 10);
        if (isNaN(tabIndex)) {
            return isElementFocusableByDefault(element);
        }

        return tabIndex > -1;
    }

    /** @hidden */
    observe(
        element: HasElementRef<Element> | Element | ElementRef<Element>,
        respectTabIndex = true
    ): Observable<boolean> {
        const nativeElement = getNativeElement(element);
        return this._attributeObserver.observe(nativeElement).pipe(
            map(() => FocusableObserver.isFocusable(nativeElement, respectTabIndex)),
            distinctUntilChanged()
        );
    }

    /** @hidden */
    unobserve(element: HasElementRef<Element> | Element | ElementRef<Element>): void {
        this._attributeObserver.unobserve(element);
    }
}
