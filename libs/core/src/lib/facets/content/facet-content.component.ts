import { Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Renderer2, OnInit } from '@angular/core';
import { FACET_CLASS_NAME } from '../constants';
import { addClassNameToFacetElement } from '../utils';

@Component({
    selector: 'fd-facet-content',
    template: ` <ng-content></ng-content> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class FacetContentComponent implements OnInit {
    /** @hidden */
    constructor(private _elementRef: ElementRef<HTMLElement>, public _renderer: Renderer2) {}

    /**@hidden */
    ngOnInit(): void {
        this._addClassNameToHostElement(FACET_CLASS_NAME.facetContainer);
    }
    /**@hidden */
    private _addClassNameToHostElement(className: string): void {
        addClassNameToFacetElement(this._renderer, this._elementRef.nativeElement, className);
    }
}
