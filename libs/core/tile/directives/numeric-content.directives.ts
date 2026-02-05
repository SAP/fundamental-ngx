import { computed, Directive, ElementRef, inject, input } from '@angular/core';
import { HasElementRef } from '@fundamental-ngx/cdk/utils';
import { FD_DEFAULT_ICON_FONT_FAMILY, fdBuildIconClass, IconFont } from '@fundamental-ngx/core/icon';

export type NumericContentState = 'negative' | 'critical' | 'positive' | 'informative' | 'neutral';
export type NumericContentSize = 's' | 'm' | 'l';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-numeric-content]',
    host: {
        '[class]': 'cssClass()'
    }
})
export class NumericContentDirective implements HasElementRef {
    /** Size of the numeric content. Options are 's', 'm', or 'l'. */
    readonly size = input<NumericContentSize | null>();

    /** @hidden */
    readonly elementRef = inject(ElementRef);

    /** @hidden */
    protected readonly cssClass = computed(() => {
        const classes: string[] = ['fd-numeric-content'];

        const sizeValue = this.size();
        if (sizeValue) {
            classes.push(`fd-numeric-content--${sizeValue}`);
        }

        if (this._isSmallTile()) {
            classes.push('fd-numeric-content--small-tile');
        }

        return classes.join(' ');
    });

    /** @hidden */
    private readonly _isSmallTile = computed(() => {
        const grandparent = this.elementRef.nativeElement.parentElement?.parentElement;
        return grandparent?.classList.contains('fd-tile--s') ?? false;
    });
}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-numeric-content-launch-icon-container]',
    host: {
        class: 'fd-numeric-content__launch-icon-container'
    }
})
export class NumericContentLaunchIconContainerDirective {}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-numeric-content-launch-icon]',
    host: {
        '[attr.aria-label]': 'ariaLabel()',
        '[class]': 'cssClass()'
    }
})
export class NumericContentLaunchIconDirective implements HasElementRef {
    /** Glyph (icon) to display. */
    readonly glyph = input<string>();

    /** Glyph font family. */
    readonly glyphFont = input<IconFont>(FD_DEFAULT_ICON_FONT_FAMILY);

    /** Aria label for accessibility. */
    readonly ariaLabel = input<string | null>(null);

    /** @hidden */
    readonly elementRef = inject(ElementRef);

    /** @hidden */
    protected readonly cssClass = computed(() => {
        const classes: string[] = ['fd-numeric-content__launch-icon'];

        const glyphValue = this.glyph();
        if (glyphValue) {
            classes.push(fdBuildIconClass(this.glyphFont(), glyphValue));
        }

        return classes.join(' ');
    });
}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-numeric-content-kpi-container]',
    host: {
        class: 'fd-numeric-content__kpi-container'
    }
})
export class NumericContentKpiContainerDirective {}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-numeric-content-kpi]',
    host: {
        '[class]': 'cssClass()'
    }
})
export class NumericContentKpiDirective implements HasElementRef {
    /** State of the KPI. Options are 'neutral' (default), 'positive', 'negative', 'critical', or 'informative'. */
    readonly state = input<NumericContentState | null>();

    /** Glyph (icon) to display. */
    readonly glyph = input<string>();

    /** @hidden */
    readonly elementRef = inject(ElementRef);

    /** @hidden */
    protected readonly cssClass = computed(() => {
        const classes: string[] = ['fd-numeric-content__kpi'];

        const stateValue = this.state();
        if (stateValue) {
            classes.push(`fd-numeric-content__kpi--${stateValue}`);
        }

        return classes.join(' ');
    });
}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-numeric-content-scale-container]',
    host: {
        class: 'fd-numeric-content__scale-container'
    }
})
export class NumericContentScaleContainerDirective {}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-numeric-content-scale-arrow]',
    host: {
        '[attr.aria-label]': 'ariaLabel()',
        '[class]': 'cssClass()'
    }
})
export class NumericContentScaleArrowDirective implements HasElementRef {
    /** Glyph (icon) to display. */
    readonly glyph = input<string>();

    /** Glyph font family. */
    readonly glyphFont = input<IconFont>(FD_DEFAULT_ICON_FONT_FAMILY);

    /** Aria label for accessibility. */
    readonly ariaLabel = input<string | null>(null);

    /** @hidden */
    readonly elementRef = inject(ElementRef);

    /** @hidden */
    protected readonly cssClass = computed(() => {
        const classes: string[] = ['fd-numeric-content__scale-arrow'];

        const glyphValue = this.glyph();
        if (glyphValue) {
            classes.push(fdBuildIconClass(this.glyphFont(), glyphValue));
        }

        return classes.join(' ');
    });
}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-numeric-content-scale]',
    host: {
        '[class]': 'cssClass()'
    }
})
export class NumericContentScaleDirective implements HasElementRef {
    /** State of the scale. Options are 'neutral' (default), 'positive', 'negative', 'critical', or 'informative'. */
    readonly state = input<NumericContentState | null>();

    /** @hidden */
    readonly elementRef = inject(ElementRef);

    /** @hidden */
    protected readonly cssClass = computed(() => {
        const classes: string[] = ['fd-numeric-content__scale'];

        const stateValue = this.state();
        if (stateValue) {
            classes.push(`fd-numeric-content__scale--${stateValue}`);
        }

        return classes.join(' ');
    });
}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-numeric-content-scale-text]',
    host: {
        class: 'fd-numeric-content__scale-text'
    }
})
export class NumericContentScaleTextDirective {}
