import { Directive, inject, Input, isDevMode, OnChanges } from '@angular/core';
import { NgClass } from '@angular/common';

export const _secondaryListItemTypes = ['positive', 'critical', 'negative', 'informative'] as const;

export type SecondaryListItemType = (typeof _secondaryListItemTypes)[number];

@Directive({
    selector: '[fd-list-secondary], [fdListSecondary]',
    standalone: true,
    hostDirectives: [NgClass]
})
export class ListSecondaryDirective implements OnChanges {
    /**
     * Type of the secondary list item.
     */
    @Input()
    type: SecondaryListItemType;

    /** @hidden */
    ngClass = inject(NgClass);

    /** @hidden */
    constructor() {
        this.ngClass.ngClass = ['fd-list__secondary'];
    }

    /** @hidden */
    ngOnChanges(): void {
        if (this.type && !_secondaryListItemTypes.includes(this.type) && isDevMode()) {
            console.warn(
                `Unknown type of the secondary list item: ${this.type}. Allowed types are: ${JSON.stringify(
                    _secondaryListItemTypes
                )}`
            );
        }
        this.ngClass.ngClass = ['fd-list__secondary', `fd-list__secondary--${this.type}`];
    }
}
