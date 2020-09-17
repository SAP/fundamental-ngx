import { Component, OnInit, ChangeDetectionStrategy, ElementRef, Renderer2, Input } from '@angular/core';

import { CLASS_NAME } from '../../constants';

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
        this._addClassNameToHostElement(CLASS_NAME.dynamicPageKeyInfo);
    }

    /**@hidden */
    private _addClassNameToHostElement(className: string): void {
        this._renderer.addClass(this._elementRef.nativeElement, className);
    }
}
