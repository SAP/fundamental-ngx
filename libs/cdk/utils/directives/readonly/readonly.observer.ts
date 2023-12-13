import { ElementRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { getNativeElement } from '../../helpers/get-native-element';
import { HasElementRef } from '../../interfaces/has-element-ref.interface';
import { AttributeObserver } from '../../services/observers/attribute.observer';

@Injectable({
    providedIn: 'root'
})
export class ReadonlyObserver {
    /** @ignore */
    constructor(private _attributeObserver: AttributeObserver) {}

    /** @ignore */
    static isReadonly(element: Element): boolean {
        return element.classList.contains('is-readonly') || element.hasAttribute('readonly');
    }

    /** @ignore */
    observe(element: HasElementRef<Element> | Element | ElementRef<Element>): Observable<boolean> {
        return this._attributeObserver.observe(element).pipe(
            map(() => ReadonlyObserver.isReadonly(getNativeElement(element))),
            distinctUntilChanged()
        );
    }

    /** @ignore */
    unobserve(element: HasElementRef<Element> | Element | ElementRef<Element>): void {
        this._attributeObserver.unobserve(element);
    }
}
