import { Directive, ElementRef, OnChanges, Optional, Renderer2, SimpleChanges } from '@angular/core';

@Directive()
export abstract class LayoutGridColBase implements OnChanges {

    /** @hidden */
    abstract numberOfColumns: number;

    /** @hidden */
    constructor(
        protected _renderer: Renderer2,
        protected _elementRef: ElementRef<HTMLElement>,
        @Optional() private _colSizeClassPrefix?: string
    ) {}

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        this._addColSizeModifierClass(changes);
    }

    /** @hidden */
    private _addClassToHost(cssClass: string): void {
        this._renderer.addClass(this._elementRef.nativeElement, cssClass);
    }

    /** @hidden */
    private _removeClassFromHost(cssClass: string): void {
        this._renderer.removeClass(this._elementRef.nativeElement, cssClass);
    }

    /** @hidden Adds grid column modifier class */
    private _addColSizeModifierClass(changes: SimpleChanges): void {
        const gridColChange = changes.numberOfColumns;

        if (this._colSizeClassPrefix && gridColChange) {
            if (!gridColChange.firstChange) {
                this._removeClassFromHost(this._colSizeClassPrefix + gridColChange.previousValue);
            }
            if (gridColChange.currentValue) {
                this._addClassToHost(this._colSizeClassPrefix + gridColChange.currentValue);
            }
        }
    }
}
