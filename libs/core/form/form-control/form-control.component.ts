import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    ElementRef,
    inject,
    input,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Renderer2,
    signal,
    ViewEncapsulation
} from '@angular/core';
import { FormStates } from '@fundamental-ngx/cdk/forms';
import { applyCssClass, CssClassBuilder, Nullable } from '@fundamental-ngx/cdk/utils';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { ValueStateAriaMessageService } from '@fundamental-ngx/core/shared';
import { Subscription } from 'rxjs';
import { FormItemControl, registerFormItemControl } from '../form-item-control/form-item-control';

let formControlId = 0;

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'input[fd-form-control], textarea[fd-form-control]',
    template: `<ng-content></ng-content>`,
    styleUrl: './form-control.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [registerFormItemControl(FormControlComponent), contentDensityObserverProviders()],
    host: {
        '[attr.type]': 'type()',
        '[attr.aria-label]': 'ariaLabel',
        '[attr.aria-labelledby]': 'ariaLabelledBy',
        '[attr.aria-describedby]': 'combinedAriaDescribedBy()'
    }
})
export class FormControlComponent implements CssClassBuilder, OnInit, OnChanges, OnDestroy, FormItemControl {
    /** aria-label for form-control. */
    @Input()
    ariaLabelledBy: Nullable<string>;

    /** aria-label for form-control. */
    @Input()
    ariaLabel: Nullable<string>;

    /**
     *  The state of the form control - applies css classes.
     *  Can be `success`, `error`, `warning`, `information` or blank for default.
     */
    state = input<FormStates | null>(null);

    /** Type of the form control. */
    type = input<string>();

    /** User's custom classes */
    class = input<string>();

    /** Default ARIA message text for the "success" value state. */
    valueStateSuccessMessage = input<string>(inject(ValueStateAriaMessageService).success);

    /** Default ARIA message text for the "information" value state. */
    valueStateInformationMessage = input<string>(inject(ValueStateAriaMessageService).information);

    /** Default ARIA message text for the "warning" value state. */
    valueStateWarningMessage = input<string>(inject(ValueStateAriaMessageService).warning);

    /** Default ARIA message text for the "error" value state. */
    valueStateErrorMessage = input<string>(inject(ValueStateAriaMessageService).error);

    /**
     * @hidden
     * Stores the value of the `aria-describedby` attribute set by the enclosing Form Item component.
     */
    formItemAriaDescribedBy = signal<Nullable<string>>(null);

    /**
     * @hidden
     * Computes the full list of element IDs that should be referenced by `aria-describedby`.
     *
     * The final string may include:
     * - The generated ID of the visually hidden span for value state messages (success, error, warning, info).
     * - Any user-provided IDs from a native `aria-describedby` attribute.
     * - Any user-provided IDs from a native `aria-errormessage` attribute.
     * - Any IDs set by the parent Form Item via `formItemAriaDescribedBy`.
     *
     * All IDs are concatenated with spaces, and `null` is returned if none exist.
     */

    combinedAriaDescribedBy = computed(() => {
        const userAriaDescribedByID = this._userAriaDescribedBy();
        const userAriaErrorMessageID = this._userAriaErrorMessage();
        const valueStateId = this.state() ? this._valueStateMessageId : null;

        // Include formItemAriaDescribedBy only if no user-provided IDs exist
        const formItemAriaDescribedById =
            !userAriaDescribedByID && !userAriaErrorMessageID ? this.formItemAriaDescribedBy() : null;

        return (
            [valueStateId, userAriaDescribedByID, userAriaErrorMessageID, formItemAriaDescribedById]
                .filter(Boolean)
                .join(' ') || null
        );
    });

    /** @hidden */
    public elementRef = inject(ElementRef);

    /** @hidden */
    private contentDensityObserver = inject(ContentDensityObserver);

    /** @hidden */
    private renderer = inject(Renderer2);

    /** @hidden */
    private _subscriptions = new Subscription();

    /**
     * @hidden
     * Unique ID assigned to the hidden value state message <span>,
     * used to link it with `aria-describedby`.
     */
    private _valueStateMessageId = `fd-form-control-value-state-${++formControlId}`;

    /**
     * @hidden
     * Reference to the hidden <span> element that holds the value state message for screen readers.
     * Created dynamically when the control has a state.
     */
    private _valueStateSpan: HTMLElement | null = null;

    /**
     * @hidden
     * Stores the value of the user-defined `aria-describedby` attribute (if present on the host element).
     */
    private _userAriaDescribedBy = signal<Nullable<string>>(null);

    /**
     * @hidden
     * Stores the value of the user-defined `aria-errormessage` attribute (if present on the host element).
     */
    private _userAriaErrorMessage = signal<Nullable<string>>(null);

    /** @hidden */
    private _valueStateMessages = {
        success: this.valueStateSuccessMessage,
        information: this.valueStateInformationMessage,
        warning: this.valueStateWarningMessage,
        error: this.valueStateErrorMessage
    } as const;

    /** @hidden */
    private _currentValueStateMessage = computed(() => {
        const st = this.state();
        const signalMsg = st ? this._valueStateMessages[st] : null;
        return signalMsg ? signalMsg() : '';
    });

    /** @hidden */
    constructor() {
        this._subscriptions.add(this.contentDensityObserver.subscribe());

        // Update the hidden span’s text whenever the value state message changes
        effect(() => {
            if (!this._valueStateSpan) {
                return;
            }

            const msg = this._currentValueStateMessage();
            this._valueStateSpan.textContent = msg ?? '';
        });
    }

    /**
     * @hidden
     * CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    @applyCssClass
    buildComponentCssClass(): string[] {
        const tagName = this.elementRef.nativeElement.tagName.toLowerCase();
        return [
            tagName === 'textarea' ? 'fd-textarea' : tagName === 'input' ? 'fd-input' : '',
            this.state() ? `is-${this.state()}` : '',
            this.class()
        ].filter(Boolean) as string[];
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();

        // Capture user-defined aria-describedby (if present on host element)
        const userAriaDescribedByValue = this.elementRef.nativeElement.getAttribute('aria-describedby');
        if (userAriaDescribedByValue) {
            this._userAriaDescribedBy.set(userAriaDescribedByValue);
        }

        // Capture user-defined aria-errormessage (if present on host element)
        const userAriaErrorMessageValue = this.elementRef.nativeElement.getAttribute('aria-errormessage');
        if (userAriaErrorMessageValue) {
            this._userAriaErrorMessage.set(userAriaErrorMessageValue);
        }

        // If the control has a state, create a hidden <span> for the value state message
        if (this.state()) {
            this._valueStateSpan = this.renderer.createElement('span');
            this.renderer.setAttribute(this._valueStateSpan, 'id', this._valueStateMessageId);
            this.renderer.addClass(this._valueStateSpan, 'fd-value-state-message__sr-only');

            // Insert hidden span right after the input/textarea
            const parent = this.elementRef.nativeElement.parentNode;
            this.renderer.insertBefore(parent, this._valueStateSpan, this.elementRef.nativeElement.nextSibling);
        }
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnDestroy(): void {
        if (this._valueStateSpan) {
            this.renderer.removeChild(this.elementRef.nativeElement.parentNode, this._valueStateSpan);
            this._valueStateSpan = null;
        }

        this._subscriptions.unsubscribe();
    }
}
