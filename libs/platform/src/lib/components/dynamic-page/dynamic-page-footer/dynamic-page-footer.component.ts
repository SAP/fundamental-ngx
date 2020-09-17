import { Component, OnInit, ChangeDetectionStrategy, ElementRef, Renderer2, forwardRef } from '@angular/core';

import { CLASS_NAME, DYNAMIC_PAGE_CHILD_TOKEN } from '../constants';

@Component({
    selector: 'fdp-dynamic-page-footer',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: DYNAMIC_PAGE_CHILD_TOKEN,
            useExisting: forwardRef(() => DynamicPageFooterComponent)
        }
    ]
})
export class DynamicPageFooterComponent implements OnInit {
    constructor(private _elementRef: ElementRef<HTMLElement>, private _renderer: Renderer2) {}

    ngOnInit(): void {
        // this._addClassNameToHostElement(CLASS_NAME.dynamicPageContent);
    }

    /**@hidden */
    private _addClassNameToHostElement(className: string): void {
        this._renderer.addClass(this._elementRef.nativeElement, className);
    }
}
