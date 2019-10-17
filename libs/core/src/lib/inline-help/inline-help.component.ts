import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Placement } from 'popper.js';
/**
 * The component that represents an inline-help.
 * Inline help is used to display help text in a popover, often inline with headers, body text and form labels.
 *
 * ```html
 * <fd-inline-help [placement]="'bottom-left'">
 *      Lorem ipsum dolor sit amet, consectetur adipiscing.
 * </fd-inline-help>
 * ```
 */
@Component({
    selector: 'fd-inline-help',
    templateUrl: './inline-help.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['inline-help.component.scss']
})
export class InlineHelpComponent {

    /** The placement of the inline help component. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end.
     *   The default placement is *bottom start*
     */
    @Input()
    placement: Placement = 'bottom-start';

    /** The trigger events that will open/close the inline help component.
     *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp). */
    @Input()
    triggers: string[] = ['mouseenter', 'mouseleave'];

    /**
     * The inline help style has same type as popular [ngStyle] directive. Value will be passed to `control` element
     * */
    @Input()
    inlineHelpIconStyle: {[key: string]: any} | {[key: string]: any}[];

    /** The inline help style has same type as popular [ngStyle] directive. Value will be passed to content element */
    @Input()
    inlineHelpContentStyle: {[key: string]: any} | {[key: string]: any}[];

}
