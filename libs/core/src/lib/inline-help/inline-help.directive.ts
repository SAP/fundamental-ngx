/* eslint-disable @angular-eslint/no-input-rename */
import {
    Directive,
    ElementRef,
    EmbeddedViewRef,
    Inject,
    Input,
    isDevMode,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Renderer2,
    Self,
    SimpleChanges,
    TemplateRef,
    Type,
    ViewContainerRef
} from '@angular/core';
import { PopoverService, TriggerConfig } from '@fundamental-ngx/core/popover';
import { BasePopoverClass } from '@fundamental-ngx/core/popover';
import { FD_ICON_COMPONENT } from '@fundamental-ngx/core/icon';
import { Nullable } from '@fundamental-ngx/cdk/utils';

const INLINE_HELP_CLASS = 'fd-popover__body--inline-help fd-inline-help__content';
const INLINE_HELP_ICON_CLASS = 'fd-popover__body--inline-help-icon';

let inlineHelpId = 0;

/**
 * The component that represents an inline-help.
 * Inline help is used to display help text in a popover, often inline with headers, body text and form labels.
 */
@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: '[fd-inline-help]:not([fd-inline-help-template]), [fd-inline-help-template]:not([fd-inline-help])',
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
    set inlineHelpContent(content: string | TemplateRef<any>) {
        const { text, template } = {
            text: typeof content === 'string' ? content : null,
            template: content instanceof TemplateRef ? content : null
        };
        this._popoverService.updateContent(text, template);

        this._setupScreenreaderElement(content);
    }

    /** @hidden */
    _describedBy = '';

    /** @hidden */
    private _srViewRef: EmbeddedViewRef<any>;

    /**
     * Inline help template to display inside generated popover
     * @deprecated Use `fd-inline-help` instead
     * */
    @Input('fd-inline-help-template')
    set inlineHelpTemplate(template: Nullable<TemplateRef<any>>) {
        if (isDevMode()) {
            console.warn(
                '[fd-inline-help-template] is deprecated and will be removed in the future, use [fd-inline-help] instead.'
            );
        }
        this._popoverService.updateContent(null, template);

        this._setupScreenreaderElement(template);
    }

    /** @hidden */
    constructor(
        private _popoverService: PopoverService,
        private _elementRef: ElementRef,
        private _renderer: Renderer2,
        private readonly _viewContainerRef: ViewContainerRef,
        @Optional() @Self() @Inject(FD_ICON_COMPONENT) private _icon: Type<any>
    ) {
        super();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if ('additionalBodyClass' in changes) {
            this._applyAdditionalInlineHelpClass();
        }
        this._popoverService.refreshConfiguration(this);
    }

    /** @hidden */
    ngOnInit(): void {
        this._bodyRole = 'tooltip';
        this._describedBy = `fd-inline-help-${inlineHelpId++}`;
        this._elementRef.nativeElement.setAttribute('aria-describedby', this._describedBy);
        this._bodyId = this._describedBy;
        this._applyAdditionalInlineHelpClass();
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

    /** @hidden */
    private _setupScreenreaderElement(content: string | Nullable<TemplateRef<any>>): void {
        this._viewContainerRef.clear();
        let srElement = this._renderer.createElement('span');
        if (typeof content === 'string') {
            srElement.innerText = content;
        } else if (content) {
            this._srViewRef = content.createEmbeddedView(null);
            this._viewContainerRef.insert(this._srViewRef);
            srElement = this._srViewRef.rootNodes[0];
        }

        if (srElement.style) {
            srElement.style.cssText = `position: absolute !important; height: 1px; width: 1px; overflow: hidden; clip: rect(1px, 1px, 1px, 1px);`;
        }
        this._renderer.appendChild(this._elementRef.nativeElement, srElement);
    }
}
