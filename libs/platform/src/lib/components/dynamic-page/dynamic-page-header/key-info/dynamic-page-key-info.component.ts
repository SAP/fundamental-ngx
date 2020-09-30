import { Component, OnInit, ChangeDetectionStrategy, ElementRef, Renderer2, Input } from '@angular/core';

import { CLASS_NAME } from '../../constants';
import { addClassNameToElement } from '../../utils';

@Component({
    selector: 'fdp-dynamic-page-key-info',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicPageKeyInfoComponent implements OnInit {
    /** @hidden */
    constructor(private _elementRef: ElementRef<HTMLElement>, private _renderer: Renderer2) {}

    /** @hidden */
    ngOnInit(): void {
        addClassNameToElement(this._renderer, this._elementRef.nativeElement, CLASS_NAME.dynamicPageKeyInfo);
    }
}
