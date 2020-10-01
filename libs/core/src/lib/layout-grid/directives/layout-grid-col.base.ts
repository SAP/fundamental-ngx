import { Directive, ElementRef, OnChanges, OnInit, Optional, Renderer2, SimpleChanges } from '@angular/core';
import { CSS_CLASS_NAME } from '../constants';

@Directive()
export abstract class LayoutGridColBase implements OnInit, OnChanges {

    /** @hidden */
    abstract _numberOfColumns: number;

    /** @hidden */
    constructor(
        private _renderer: Renderer2,
        private _elementRef: ElementRef<HTMLElement>,
        @Optional() private _colSizeClassPrefix?: string
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._addColClass();
    }

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

    /** @hidden Adds base grid column class */
    private _addColClass(): void {
        if (!this._elementRef.nativeElement.classList.contains(CSS_CLASS_NAME.col)) {
            this._addClassToHost(CSS_CLASS_NAME.col);
        }
    }

    /** @hidden Adds grid column modifier class */
    private _addColSizeModifierClass(changes: SimpleChanges): void {
        const gridColChange = changes._numberOfColumns;

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
