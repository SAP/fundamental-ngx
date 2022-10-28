import { Directive, OnInit, ElementRef, Input, OnChanges } from '@angular/core';

import { ObjectStatus, buildObjectStatusCssClasses } from '@fundamental-ngx/core/object-status';
import { applyCssClass } from '@fundamental-ngx/core/utils';
import { CssClassBuilder } from '@fundamental-ngx/core/utils';

import { CLASS_NAME } from './constants';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-counter]'
})
export class CardCounterDirective implements OnInit, OnChanges, CssClassBuilder {
    /**
     * The status represented by the Object Status.
     * Can be one of the following: 'negative' | 'critical' | 'positive' | 'informative'
     */
    @Input()
    status: ObjectStatus;

    /** @hidden */
    class: string;

    /** @hidden */
    constructor(private _elementRef: ElementRef<HTMLElement>) {}

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        const objectStatusClasses = buildObjectStatusCssClasses(this);
        return [CLASS_NAME.cardCounter, ...objectStatusClasses];
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
