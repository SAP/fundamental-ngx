import { Directive, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { FdbToolHeaderActionButton } from '../tool-header-action-button.type';

@Directive({
    selector: '[fdbToolHeaderAction]',
    standalone: true
})
export class ToolHeaderActionDirective implements FdbToolHeaderActionButton {
    /**
     * Glyph which will be used for the action when in overflow mode.
     */
    @Input({ required: true })
    glyph: string;

    /**
     * Label which will be used for the action when in overflow mode.
     */
    @Input({ required: true })
    label: string;

    /**
     * Whether the action should have a separator next to it
     */
    @Input()
    hasSeparator = false;

    /**
     * Whether the action is always visible.
     */
    @Input()
    forceVisibility?: boolean;

    /**
     * Event emitted when the action is clicked when in overflow mode.
     **/
    @Output()
    clicked = new EventEmitter<void>();

    /** @hidden */
    constructor(readonly templateRef: TemplateRef<any>) {}

    /**
     * Function to be called when the action is clicked
     * when in overflow mode.
     **/
    clickCallback = (): void => this.clicked.emit();
}
