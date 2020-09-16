import { Component, OnInit, ChangeDetectionStrategy, ElementRef, Renderer2 } from '@angular/core';

import { CLASS_NAME } from '../constants';

@Component({
    selector: 'fd-card-kpi-header',
    templateUrl: './card-kpi-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardKpiHeaderComponent implements OnInit {
    /** @hidden */
    constructor(private _elementRef: ElementRef<HTMLElement>, private _renderer: Renderer2) {}

    /** @hidden */
    ngOnInit(): void {
        this._addClassNameToHostElement(CLASS_NAME.cardAnalyticalArea);
    }

    /**@hidden */
    private _addClassNameToHostElement(className: string): void {
        this._addClassName(this._elementRef.nativeElement, className);
    }

    /**@hidden */
    private _addClassName(element: HTMLElement, className: string): void {
        this._renderer.addClass(element, className);
    }
}
