import { Directive, Input } from '@angular/core';

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

    /** The property allows user to pass additional css classes*/
    @Input()
    class = '';

    /** Position of glyph related to text */
    @Input()
    glyphPosition: GlyphPosition = 'before';

    /** The icon to include in the button. See the icon page for the list of icons.
     * Setter is used to control when css class have to be rebuilded.
     * Default value is set to ''.
     */
    @Input()
    public glyph = '';

    /** Whether to apply compact mode to the button.
     * Default value is set to false
     */
    @Input()
    public compact = false;

    /** The type of the button. Types include:
     * 'standard' | 'positive' | 'negative' | 'attention' | 'half' | 'ghost' | 'transparent' | 'emphasized' | 'menu'.
     * Leave empty for default (Standard button).'
     * Default value is set to 'standard'
     */
    @Input()
    public fdType: ButtonType = 'standard';

    /**
     * Text rendered inside button component
     */
    @Input()
    label: string;

    /** Whether to apply menu mode to the button.
     * Default value is set to false
     */
    @Input()
    public fdMenu = false;
}
