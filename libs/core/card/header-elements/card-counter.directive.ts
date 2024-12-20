import { Directive, ElementRef, OnChanges, OnInit, input } from '@angular/core';

import { CssClassBuilder, applyCssClass } from '@fundamental-ngx/cdk/utils';
import { ObjectStatus, buildObjectStatusCssClasses } from '@fundamental-ngx/core/object-status';

import { CLASS_NAME } from '../constants';
import { FD_CARD_COUNTER } from '../token';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-counter]',
    standalone: true,
    providers: [
        {
            provide: FD_CARD_COUNTER,
            useExisting: CardCounterDirective
        }
    ]
})
export class CardCounterDirective implements OnInit, OnChanges, CssClassBuilder {
    /**
     * the status represented by the Object Status.
     * can be one of the following: 'negative' | 'critical' | 'positive' | 'informative' | 'neutral'
     */
    statusInput = input<ObjectStatus>('neutral');

    /** @hidden */
    status: ObjectStatus;

    /** @hidden */
    class: string;

    /** @hidden */
    constructor(public readonly elementRef: ElementRef<HTMLElement>) {}

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        this.status = this.statusInput();
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
