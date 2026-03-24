import {
    booleanAttribute,
    computed,
    Directive,
    effect,
    ElementRef,
    EmbeddedViewRef,
    inject,
    input,
    Renderer2,
    TemplateRef,
    ViewContainerRef
} from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FD_ICON_COMPONENT } from '@fundamental-ngx/core/icon';
import { PopoverService, TriggerConfig } from '@fundamental-ngx/core/popover';
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
        '[class.fd-inline-help__trigger]': 'true',
        '[attr.aria-describedby]': 'bodyId()'
    }
})
export class InlineHelpDirective {
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
    readonly closeOnOutsideClick = input(false, { transform: booleanAttribute });

    /** Additional CSS class(es) to apply to the popover body. */
    readonly additionalBodyClass = input<string | null>(null);

    /** Whether the inline help is disabled. */
    readonly disabled = input(false, { transform: booleanAttribute });

    /** ID for the Inline Help Popover body */
    readonly bodyId = input(`fd-inline-help-${inlineHelpId++}`);

    /** aria-role for the Inline Help Popover body */
    readonly bodyRole = input('tooltip');

    /** @hidden Combined internal + user-provided body classes. */
    readonly combinedBodyClass = computed(() => {
        const parts = [this._additionalBodyClass];
        const userClass = this.additionalBodyClass();
        if (userClass) {
            parts.push(userClass);
        }
        return parts.join(' ');
    });

    /** @hidden Popover configuration computed from all inputs. */
    readonly popoverConfig = computed(() => ({
        placement: this.placement() ?? 'bottom',
        triggers: this.triggers(),
        noArrow: false,
        closeOnEscapeKey: false,
        closeOnOutsideClick: this.closeOnOutsideClick(),
        additionalBodyClass: this.combinedBodyClass(),
        disabled: this.disabled(),
        bodyRole: this.bodyRole(),
        bodyId: this.bodyId()
    }));

    /** @hidden */
    private readonly _popoverService = inject(PopoverService);

    /** @hidden */
    private readonly _elementRef = inject(ElementRef);

    /** @hidden */
    private readonly _renderer = inject(Renderer2);

    /** @hidden */
    private readonly _viewContainerRef = inject(ViewContainerRef);

    /** @hidden */
    private readonly _icon = inject(FD_ICON_COMPONENT, { optional: true, self: true });

    /** @hidden */
    private _additionalBodyClass = '';

    /** @hidden */
    private _srViewRef: EmbeddedViewRef<any> | null = null;

    /** @hidden */
    private _initialised = false;

    /** @hidden */
    constructor() {
        this._applyAdditionalInlineHelpClass();

        // Effect to initialise and reactively update the popover config
        effect(() => {
            const config = this.popoverConfig();
            if (!this._initialised) {
                this._popoverService.initialise(this._elementRef, config);
                this._initialised = true;
            } else {
                this._popoverService.refreshConfiguration(config);
            }
        });

        // Effect to watch for content changes
        effect(() => {
            const content = this.inlineHelpContent();
            const text = typeof content === 'string' ? content : null;
            const template = content instanceof TemplateRef ? content : null;

            this._popoverService.updateContent(text, template);
            this._setupScreenreaderElement(content);
        });
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

        // Destroy previous embedded view if any
        if (this._srViewRef) {
            this._srViewRef.destroy();
            this._srViewRef = null;
        }

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
