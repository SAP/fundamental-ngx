import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { PopoverService } from '../popover/popover-service/popover.service';
import { BasePopoverClass } from '../popover/base/base-popover.class';

const INLINE_HELP_CLASS = 'fd-inline-help__content';

/**
 * The component that represents an inline-help.
 * Inline help is used to display help text in a popover, often inline with headers, body text and form labels.
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[fd-inline-help], [fd-inline-help-template]',
    providers: [PopoverService]
})
export class InlineHelpDirective extends BasePopoverClass implements OnInit, OnChanges {
    /** The trigger events that will open/close the inline help component.
     *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp). */
    @Input()
    triggers: string[] = ['mouseenter', 'mouseleave'];

    /** Whether the popover should have an arrow. */
    @Input()
    noArrow = false;

    /** Whether the popover should close when the escape key is pressed. */
    @Input()
    closeOnEscapeKey = false;

    /** Whether the popover should close when a click is made outside its boundaries. */
    @Input()
    closeOnOutsideClick = false;

    /** Inline help text to display inside generated popover */
    @Input('fd-inline-help')
    inlineHelpText: string = null;

    /** Inline help template to display inside generated popover */
    @Input('fd-inline-help-template')
    inlineHelpTemplate: TemplateRef<any> = null;

    constructor(
        private _popoverService: PopoverService,
        private _elementRef: ElementRef
    ) {
        super();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if ('additionalBodyClass' in changes) {
            this._applyAdditionalInlineHelpClass();
        }

        if ('inlineHelpText' in changes || 'inlineHelpTemplate' in changes) {
            this._popoverService.updateContent(
                changes['inlineHelpText']?.currentValue,
                changes['inlineHelpTemplate']?.currentValue
            )
        }

        this._popoverService.refreshConfiguration(this);
    }

    /** @hidden */
    ngOnInit(): void {
        this._applyAdditionalInlineHelpClass();
        this._popoverService.stringContent = this.inlineHelpText;
        this._popoverService.templateContent = this.inlineHelpTemplate;
        this._popoverService.initialise(this._elementRef, this);
    }

    /** @hidden */
    private _applyAdditionalInlineHelpClass(): void {
        this.additionalBodyClass = INLINE_HELP_CLASS + ' ' + this.additionalBodyClass;
    }
}
