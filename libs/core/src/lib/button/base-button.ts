import { Directive, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

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
    | 'menu'
;


@Directive()
export class BaseButton {
    /**
     * Native type of button element
     */
    @Input()
    type = 'button';

    /** Position of glyph related to text */
    @Input()
    glyphPosition: GlyphPosition = 'before';

    /** The icon to include in the button. See the icon page for the list of icons.
     * Setter is used to control when css class have to be rebuilded.
     * Default value is set to ''.
     */
    @Input()
    glyph = '';

    /** Whether to apply compact mode to the button. */
    @Input()
    compact: boolean = null;

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

    /**
     * Native disabled attribute of button element
     */
    @Input()
    get disabled(): boolean { return this._disabled; }

    set disabled(value: boolean) { this._disabled = coerceBooleanProperty(value); }

    /**
     * Native aria-disabled attribute of button element
     */
    @Input('aria-disabled')
    get ariaDisabled(): boolean { return this._ariaDisabled; }

    set ariaDisabled(value: boolean) { this._ariaDisabled = coerceBooleanProperty(value); }

    /** @hidden */
    _disabled: boolean;

    /** @hidden */
    _ariaDisabled: boolean;
}
