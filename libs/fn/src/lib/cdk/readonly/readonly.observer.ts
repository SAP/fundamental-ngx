import { ElementRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { getNativeElement } from '@fundamental-ngx/fn/utils';
import { AttributeObserver } from '../observers/attribute.observer';
import { HasElementRef } from '../has-element-ref';

@Injectable({
    providedIn: 'root'
})
export class ReadonlyObserver {
    constructor(private _attributeObserver: AttributeObserver) {}

    static isReadonly(element: Element): boolean {
        return element.classList.contains('is-readonly') || element.hasAttribute('readonly');
    }

    observe(element: HasElementRef<Element> | Element | ElementRef<Element>): Observable<boolean> {
        return this._attributeObserver.observe(element).pipe(
            map(() => ReadonlyObserver.isReadonly(getNativeElement(element))),
            distinctUntilChanged()
        );
    }

    unobserve(element: HasElementRef<Element> | Element | ElementRef<Element>): void {
        this._attributeObserver.unobserve(element);
    }
}
