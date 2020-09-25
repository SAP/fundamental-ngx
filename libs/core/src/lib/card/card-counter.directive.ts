import { Directive, OnInit, ElementRef, Input, OnChanges } from '@angular/core';

import { applyCssClass, CssClassBuilder } from '../utils/public_api';
import { ObjectStatus, buildObjectStatusCssClasses } from '../object-status/object-status.component';

import { CLASS_NAME } from './constants';

@Directive({
    // tslint:disable-next-line: directive-selector
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

    @applyCssClass
    /** @hidden */
    buildComponentCssClass(): string[] {
        const objectStatusClasses = buildObjectStatusCssClasses(this);
        return [CLASS_NAME.cardCounter, ...objectStatusClasses];
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
