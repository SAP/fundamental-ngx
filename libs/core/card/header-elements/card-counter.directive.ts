import { Directive, ElementRef, computed, input } from '@angular/core';

import { OBJECT_STATUS_CLASS_NAME, ObjectStatus } from '@fundamental-ngx/core/object-status';

import { HasElementRef } from '@fundamental-ngx/cdk';
import { CLASS_NAME } from '../constants';
import { FD_CARD_COUNTER } from '../token';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-card-counter]',
    host: {
        '[class]': '_cssClass()'
    },
    providers: [
        {
            provide: FD_CARD_COUNTER,
            useExisting: CardCounterDirective
        }
    ]
})
export class CardCounterDirective implements HasElementRef {
    /**
     * the status represented by the Object Status.
     * can be one of the following: 'negative' | 'critical' | 'positive' | 'informative' | 'neutral'
     */
    readonly statusInput = input<ObjectStatus>('neutral');

    /** @hidden */
    protected readonly _cssClass = computed(() => {
        const statusClass = this.statusInput() ? `fd-object-status--${this.statusInput()}` : '';
        return [CLASS_NAME.cardCounter, OBJECT_STATUS_CLASS_NAME, statusClass].filter(Boolean).join(' ');
    });

    /** @hidden */
    constructor(public readonly elementRef: ElementRef<HTMLElement>) {}
}
