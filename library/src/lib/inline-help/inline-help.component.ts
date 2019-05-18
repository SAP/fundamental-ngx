import { Component, Input, ViewEncapsulation } from '@angular/core';
/**
 * The component that represents an inline-help. 
 * Inline help is used to display help text in a popover, often inline with headers, body text and form labels.
 *
 * ```html
 * <fd-inline-help [position]="'bottom-left'">
 *      Lorem ipsum dolor sit amet, consectetur adipiscing.
 * </fd-inline-help>
 * ```
 */
@Component({
    selector: 'fd-inline-help',
    templateUrl: './inline-help.component.html',
    host: {
        class: 'fd-inline-help',
        role: 'alert'
    },
    encapsulation: ViewEncapsulation.None
})
export class InlineHelpComponent {
    /** 
     * The position of the inline help component.
     * Options include *bottom-right*, *bottom-left*, *bottom-center*, *right*, and *left*.
     * The default position is *bottom right* 
     */
    @Input()
    position: string;
}
