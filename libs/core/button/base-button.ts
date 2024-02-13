import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Directive, ElementRef, HostBinding, Input, booleanAttribute, inject } from '@angular/core';

import { HasElementRef, Nullable } from '@fundamental-ngx/cdk/utils';
import { FD_DEFAULT_ICON_FONT_FAMILY, IconFont } from '@fundamental-ngx/core/icon';

export type GlyphPosition = 'before' | 'after';

export type ButtonType =
    | ''
    | 'standard'
    | 'positive'
    | 'negative'
    | 'attention'
    | 'half'
    | 'ghost'
    | 'transparent'
    | 'emphasized'
    | 'menu';

@Directive()
export class BaseButton implements HasElementRef {
    /** @hidden */
    @HostBinding('class.fd-button--toggled')
    @HostBinding('attr.aria-pressed')
    _toggled: Nullable<boolean>;

    /**
     * Native type of button element
     */
    @Input()
    type: Nullable<string> = 'button';

    /** Position of glyph related to text */
    @Input()
    glyphPosition: GlyphPosition = 'before';

    /** The icon to include in the button. See the icon page for the list of icons.
     * Setter is used to control when css class have to be rebuilded.
     * Default value is set to ''.
     */
    @Input()
    glyph: Nullable<string>;

    /** Glyph font family */
    @Input()
    glyphFont: IconFont = FD_DEFAULT_ICON_FONT_FAMILY;

    /** The type of the button. Types include:
     * 'standard' | 'positive' | 'negative' | 'attention' | 'half' | 'ghost' | 'transparent' | 'emphasized' | 'menu'.
     * Leave empty for default (Standard button).'
     * Default value is set to 'standard'
     */
    @Input()
    fdType: ButtonType = 'standard';

    /**
     * Text rendered inside button component
     */
    @Input()
    label: string;

    /** Whether to apply menu mode to the button.
     * Default value is set to false
     */
    @Input()
    fdMenu = false;

    /** adding native aria-label to the component */
    @Input()
    ariaLabel: Nullable<string>;

    /** adding native aria-description to the componenet */
    @Input()
    ariaDescription: Nullable<string>;

    /** Whether button is in toggled state. */
    @Input()
    set toggled(value: BooleanInput) {
        if (value !== undefined && value !== null) {
            this._toggled = coerceBooleanProperty(value);
        }
    }
    get toggled(): Nullable<boolean> {
        return this._toggled;
    }

    /**
     * Native disabled attribute of button element
     */
    @Input({ transform: booleanAttribute })
    disabled = false;

    /**
     * Native aria-disabled attribute of button element
     */
    @Input({ alias: 'aria-disabled', transform: booleanAttribute })
    ariaDisabled = false;

    /** @hidden */
    readonly elementRef = inject(ElementRef);

    /** @hidden */
    protected readonly _cdr = inject(ChangeDetectorRef);

    /** @hidden */
    detectChanges(): void {
        this._cdr.detectChanges();
    }

    /** @hidden */
    markForCheck(): void {
        this._cdr.markForCheck();
    }
}
