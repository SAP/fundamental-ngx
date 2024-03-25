import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';

import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/cdk/utils';
import { ObjectStatus, buildObjectStatusCssClasses } from '@fundamental-ngx/core/object-status';

import { CLASS_NAME } from './constants';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-counter]',
    standalone: true
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
    constructor(public readonly elementRef: ElementRef<HTMLElement>) {}

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        const objectStatusClasses = buildObjectStatusCssClasses(this);
        return [CLASS_NAME.cardCounter, ...objectStatusClasses];
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }
}
