import { Component, Input, ViewEncapsulation } from '@angular/core';

export type ButtonType = 'standard' | 'positive' | 'medium' | 'negative' | 'toolbar' | 'main' | '';
export type ButtonOptions = 'light' | 'emphasized' | '';

@Component({
    selector: 'fdp-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ButtonComponent {
    /** id to the button. */
    @Input() id: string;

    /** Whether to apply compact mode to the button. */
    @Input() compact: boolean;

    /** The icon to include in the button. See the icon page for the list of icons. */
    @Input() glyph: string;

    /** The type of the button. Types include 'standard', 'positive', 'medium', and 'negative'.
     * Leave empty for default (Action button).'*/
    @Input() fdType: ButtonType;

    /** Button options.  Options include 'emphasized' and 'light'. Leave empty for default.' */
    @Input() options: ButtonOptions | ButtonOptions[];
}
