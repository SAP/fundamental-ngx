import {
    Directive,
    ElementRef,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Self,
    SimpleChanges,
    TemplateRef,
    Type
} from '@angular/core';
import { PopoverService, TriggerConfig } from '@fundamental-ngx/core/popover';
import { BasePopoverClass } from '@fundamental-ngx/core/popover';
import { FD_ICON_COMPONENT } from '@fundamental-ngx/core/icon';
import { Nullable } from '@fundamental-ngx/cdk/utils';

const INLINE_HELP_CLASS = 'fd-popover__body--inline-help fd-inline-help__content';
const INLINE_HELP_ICON_CLASS = 'fd-popover__body--inline-help-icon';

/**
 * The component that represents an inline-help.
 * Inline help is used to display help text in a popover, often inline with headers, body text and form labels.
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-inline-help], [fd-inline-help-template]',
    providers: [PopoverService],
    host: {
        '[class.fd-inline-help__trigger]': 'true'
    }
})
export class InlineHelpDirective extends BasePopoverClass implements OnInit, OnChanges, OnDestroy {
    /** The trigger events that will open/close the inline help component.
     *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp). */
    @Input()
    triggers: (string | TriggerConfig)[] = [
        { trigger: 'mouseenter', openAction: true, closeAction: false },
        { trigger: 'mouseleave', openAction: false, closeAction: true },
        { trigger: 'focusin', openAction: true, closeAction: false },
        { trigger: 'focusout', openAction: false, closeAction: true }
    ];

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
    inlineHelpText: Nullable<string> = null;

    /** Inline help template to display inside generated popover */
    @Input('fd-inline-help-template')
    inlineHelpTemplate: Nullable<TemplateRef<any>> = null;

    /** @hidden */
    constructor(
        private _popoverService: PopoverService,
        private _elementRef: ElementRef,
        @Optional() @Self() @Inject(FD_ICON_COMPONENT) private _icon: Type<any>
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
            );
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
    ngOnDestroy(): void {
        this._popoverService.onDestroy();
    }

    /** @hidden */
    private _applyAdditionalInlineHelpClass(): void {
        this.additionalBodyClass = INLINE_HELP_CLASS + ' ' + this.additionalBodyClass;

        // If connected to the icon, but not button, then apply additional class
        // That will change the arrow's position a bit
        if (this._icon) {
            this.additionalBodyClass += ' ' + INLINE_HELP_ICON_CLASS;
        }
    }
}
