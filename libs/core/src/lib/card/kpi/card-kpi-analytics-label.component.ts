import { OnInit, ElementRef, Renderer2, Component, ChangeDetectionStrategy } from '@angular/core';

import { CLASS_NAME } from '../constants';

@Component({
    selector: 'fd-card-kpi-analytics-label',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardKpiAnalyticsLabelComponent implements OnInit {
    /** @hidden */
    constructor(private _elementRef: ElementRef<HTMLElement>, private _renderer: Renderer2) {}

    /** @hidden */
    ngOnInit(): void {
        this._addClassNameToHostElement(CLASS_NAME.cardAnalyticsText);
    }

    /**@hidden */
    private _addClassNameToHostElement(className: string): void {
        this._renderer.addClass(this._elementRef.nativeElement, className);
    }
}
