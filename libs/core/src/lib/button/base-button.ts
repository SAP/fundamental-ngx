import { Directive, Input } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

import { Nullable } from '@fundamental-ngx/core/shared';

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
export class BaseButton {
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

    /** Whether button is in toggled state. */
    @Input()
    set toggled(value: BooleanInput) {
        this._toggled = coerceBooleanProperty(value);
    }
    get toggled(): boolean {
        return this._toggled;
    }

    /**
     * Native disabled attribute of button element
     */
    @Input()
    set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value);
    }
    get disabled(): boolean {
        return this._disabled;
    }

    /**
     * Native aria-disabled attribute of button element
     */
    @Input('aria-disabled')
    set ariaDisabled(value: BooleanInput) {
        this._ariaDisabled = coerceBooleanProperty(value);
    }
    get ariaDisabled(): boolean {
        return this._ariaDisabled;
    }

    /** @hidden */
    _disabled: boolean;

    /** @hidden */
    _ariaDisabled: boolean;

    /** @hidden */
    _toggled: boolean;
}
