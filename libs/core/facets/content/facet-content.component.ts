import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FACET_CLASS_NAME } from '../constants';
import { addClassNameToFacetElement } from '../utils';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fd-facet-content',
    standalone: true
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class FacetContentComponent implements OnInit {
    /** @hidden */
    constructor(
        public readonly elementRef: ElementRef<HTMLElement>,
        private _renderer: Renderer2
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._addClassNameToHostElement(FACET_CLASS_NAME.facetContainer);
    }

    /** @hidden */
    private _addClassNameToHostElement(className: string): void {
        addClassNameToFacetElement(this._renderer, this.elementRef.nativeElement, className);
    }
}
