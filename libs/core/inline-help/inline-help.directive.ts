import {
    Directive,
    effect,
    ElementRef,
    EmbeddedViewRef,
    Inject,
    input,
    OnInit,
    Optional,
    Renderer2,
    Self,
    TemplateRef,
    Type,
    ViewContainerRef
} from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FD_ICON_COMPONENT } from '@fundamental-ngx/core/icon';
import { PopoverConfig, PopoverService, TriggerConfig } from '@fundamental-ngx/core/popover';
import { Placement } from '@fundamental-ngx/core/shared';

const INLINE_HELP_CLASS = 'fd-popover__body--inline-help fd-inline-help__content';
const INLINE_HELP_ICON_CLASS = 'fd-popover__body--inline-help-with-icon';

/** Default trigger configuration for inline help */
const DEFAULT_TRIGGERS: TriggerConfig[] = [
    { trigger: 'mouseenter', openAction: true, closeAction: false },
    { trigger: 'mouseleave', openAction: false, closeAction: true },
    { trigger: 'focusin', openAction: true, closeAction: false },
    { trigger: 'focusout', openAction: false, closeAction: true }
];

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
    },
    standalone: true
})
export class InlineHelpDirective implements OnInit {
    /** Inline help text to display inside generated popover */
    readonly inlineHelpContent = input<string | TemplateRef<any>>('', { alias: 'fd-inline-help' });

    /** Popover placement */
    readonly placement = input<Placement | null>(null);

    /**
     * The trigger events that will open/close the inline help component.
     * Accepts any HTML DOM Events or TriggerConfig objects.
     * @default mouseenter/mouseleave and focusin/focusout
     */
    readonly triggers = input<(string | TriggerConfig)[]>(DEFAULT_TRIGGERS);

    /** Whether the popover should close when a click is made outside its boundaries. */
    readonly closeOnOutsideClick = input(false);

    /** @hidden */
    _describedBy = '';

    /** @hidden Internal body ID for ARIA */
    protected _bodyId = '';

    /** @hidden */
    protected _bodyRole = 'tooltip';

    /** @hidden */
    private _additionalBodyClass = '';

    /** @hidden */
    private _srViewRef: EmbeddedViewRef<any>;

    /** @hidden */
    constructor(
        private _popoverService: PopoverService,
        private _elementRef: ElementRef,
        private _renderer: Renderer2,
        private readonly _viewContainerRef: ViewContainerRef,
        @Optional() @Self() @Inject(FD_ICON_COMPONENT) private _icon: Type<any>
    ) {
        // Watch for placement changes and sync with popover service
        effect(() => {
            this._popoverService.placement.set(this.placement() ?? 'bottom');
        });

        // Watch for triggers changes and sync with popover service
        effect(() => {
            this._popoverService.triggers.set(this.triggers());
        });

        // Watch for closeOnOutsideClick changes and sync with popover service
        effect(() => {
            this._popoverService.closeOnOutsideClick.set(this.closeOnOutsideClick());
        });

        // Watch for content changes
        effect(() => {
            const content = this.inlineHelpContent();
            const text = typeof content === 'string' ? content : null;
            const template = content instanceof TemplateRef ? content : null;

            this._popoverService.updateContent(text, template);
            this._setupScreenreaderElement(content);
        });

        // Set role and id for ARIA
        const bodyId = `fd-inline-help-${inlineHelpId++}`;
        this._bodyRole = 'tooltip';
        this._bodyId = bodyId;
        this._elementRef.nativeElement.setAttribute('aria-describedby', bodyId);
        this._describedBy = bodyId;

        // Apply additional inline help classes
        this._applyAdditionalInlineHelpClass();
    }

    /** @hidden */
    ngOnInit(): void {
        // Initialize popover with element and config
        const config: PopoverConfig = {
            placement: this.placement() ?? 'bottom',
            triggers: this.triggers(),
            noArrow: false,
            closeOnEscapeKey: false,
            closeOnOutsideClick: this.closeOnOutsideClick(),
            additionalBodyClass: this._additionalBodyClass,
            bodyRole: this._bodyRole,
            bodyId: this._bodyId
        };

        this._popoverService.initialise(this._elementRef, config);
    }

    /** @hidden */
    private _applyAdditionalInlineHelpClass(): void {
        let classes = INLINE_HELP_CLASS;

        // If connected to the icon, but not button, then apply additional class
        // That will change the arrow's position a bit
        if (this._icon) {
            classes += ' ' + INLINE_HELP_ICON_CLASS;
        }

        this._additionalBodyClass = classes;
    }

    /** @hidden */
    private _setupScreenreaderElement(content: string | Nullable<TemplateRef<any>>): void {
        this._viewContainerRef.clear();
        let srElement = this._renderer.createElement('span');
        if (typeof content === 'string') {
            srElement.innerText = content;
        } else if (content) {
            this._srViewRef = content.createEmbeddedView(null);
            if (this._srViewRef.rootNodes[0] instanceof Text) {
                srElement.innerText = this._srViewRef.rootNodes[0].textContent;
            } else {
                srElement = this._srViewRef.rootNodes[0];
            }
        }

        if (srElement.style) {
            srElement.style.cssText = `position: absolute !important; height: 1px; width: 1px; overflow: hidden; clip: rect(1px, 1px, 1px, 1px);`;
        }
        this._renderer.appendChild(this._elementRef.nativeElement, srElement);
    }
}
