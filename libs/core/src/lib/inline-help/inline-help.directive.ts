import { Directive, ElementRef, Input, OnInit, TemplateRef } from '@angular/core';
import { PopoverService } from '../popover/popover.service';
import { BasePopoverClass } from '../popover/base/base-popover.class';
/**
 * The component that represents an inline-help.
 * Inline help is used to display help text in a popover, often inline with headers, body text and form labels.
 *
 * ```
 */
@Directive({
    selector: '[fd-inline-help], [fd-inline-help-template]',
})
export class InlineHelpDirective extends BasePopoverClass implements OnInit {
    /** The trigger events that will open/close the inline help component.
     *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp). */
    @Input()
    triggers: string[] = ['mouseenter', 'mouseleave'];

    @Input('fd-inline-help')
    inlineHelpTitle: string = null;

    @Input('fd-inline-help-template')
    inlineHelpTemplate: TemplateRef<any> = null;

    constructor(
        private _popoverService: PopoverService,
        private _elementRef: ElementRef
    ) {
        super();
    }

    ngOnInit(): void {
        this._popoverService.basePopoverSettings = new BasePopoverClass();
        Object.keys(new BasePopoverClass()).forEach(key => this._popoverService.basePopoverSettings[key] = this[key])
        this._popoverService.containerElement = this._elementRef;
        this._popoverService.triggerElement = this._elementRef;
        this._popoverService.stringContent = this.inlineHelpTitle;
        this._popoverService.templateContent = this.inlineHelpTemplate;
        this._popoverService.setUpPopover();
    }
}
