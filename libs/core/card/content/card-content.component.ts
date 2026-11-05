import { ChangeDetectionStrategy, Component, ElementRef, computed, inject, input } from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';
import { CLASS_NAME } from '../constants';

export type CardContentPaddingSize = 'tiny' | 'sm' | 'md' | 'lg';

const PADDING_VALUES: Record<CardContentPaddingSize, string> = {
    tiny: '0.5rem',
    sm: '1rem',
    md: '2rem',
    lg: '3rem'
};

@Component({
    selector: 'fd-card-content',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: CLASS_NAME.cardContent,
        '[style.padding]': 'paddingStyle()',
        '[style.padding-inline]': 'paddingInlineStyle()',
        '[style.padding-block]': 'paddingBlockStyle()',
        '[style.padding-block-end]': 'paddingBottomStyle()'
    }
})
export class CardContentComponent implements HasElementRef {
    /** @hidden */
    readonly elementRef = inject(ElementRef);

    /**
     * Sets padding on all sides of the card content.
     * Options: 'tiny' (0.5rem), 'sm' (1rem), 'md' (2rem), 'lg' (3rem)
     */
    readonly padding = input<CardContentPaddingSize>();

    /**
     * Sets horizontal padding (left and right) of the card content.
     * Options: 'tiny' (0.5rem), 'sm' (1rem), 'md' (2rem), 'lg' (3rem)
     * Takes precedence over the general padding input for horizontal spacing.
     */
    readonly paddingInline = input<CardContentPaddingSize>();

    /**
     * Sets vertical padding (top and bottom) of the card content.
     * Options: 'tiny' (0.5rem), 'sm' (1rem), 'md' (2rem), 'lg' (3rem)
     * Takes precedence over the general padding input for vertical spacing.
     */
    readonly paddingBlock = input<CardContentPaddingSize>();

    /**
     * Sets padding-bottom specifically.
     * Options: 'tiny' (0.5rem), 'sm' (1rem), 'md' (2rem), 'lg' (3rem)
     * Takes precedence over paddingBlock and general padding input for bottom spacing.
     */
    readonly paddingBottom = input<CardContentPaddingSize>();

    /** @hidden */
    protected readonly paddingStyle = computed(() => this._toPaddingValue(this.padding()));

    /** @hidden */
    protected readonly paddingInlineStyle = computed(() => this._toPaddingValue(this.paddingInline()));

    /** @hidden */
    protected readonly paddingBlockStyle = computed(() => this._toPaddingValue(this.paddingBlock()));

    /** @hidden */
    protected readonly paddingBottomStyle = computed(() => this._toPaddingValue(this.paddingBottom()));

    private _toPaddingValue(size: CardContentPaddingSize | undefined): string | null {
        return size ? PADDING_VALUES[size] : null;
    }
}
