import {
    AfterViewInit,
    ChangeDetectorRef,
    DestroyRef,
    Directive,
    DoCheck,
    ElementRef,
    InjectionToken,
    Input,
    ModelSignal,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild,
    booleanAttribute,
    effect,
    inject,
    input,
    isDevMode,
    model,
    output
} from '@angular/core';
import { ControlContainer, FormControl, NgControl, NgForm } from '@angular/forms';
import { FormValueControl, ValidationError } from '@angular/forms/signals';
import { HasElementRef, Nullable } from '@fundamental-ngx/cdk/utils';
import { Observable, Subject, Subscription, filter } from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    FD_FORM_FIELD,
    FD_FORM_FIELD_CONTROL,
    FormFieldAdvancedStateMessage,
    FormStates,
    isValidControlState
} from '@fundamental-ngx/cdk/forms';
import { FormInputMessageGroupComponent } from '@fundamental-ngx/core/form';
import { TriggerConfig } from '@fundamental-ngx/core/popover';
import { PlatformFormField, PlatformFormFieldControl } from './form-field';

export const FDP_DO_CHECK = new InjectionToken<Observable<void>>('FdpInputDoCheckTrigger');
export const FDP_FORM_SUBMIT = new InjectionToken<Observable<void>>('FdpFormSubmitTrigger');

let randomId = 0;

/**
 * Self-contained abstract base for all platform form controls.
 *
 * It is Signal-Forms-native: `value`, `name`, `disabled`, `readonly` and `required` are exposed as
 * signals so the class fully implements Angular's `FormValueControl<any>` contract. It intentionally
 * does NOT extend `BaseComponent` (so those members can be signals without clashing with the plain
 * members `BaseComponent` shares with non-form components).
 *
 * Usually try to fire stateChange only for things that can change dynamically in runtime. We don't expect
 * that e.g. placeholder will change after component is created
 */
@Directive()
export abstract class BaseInput<T = any>
    implements PlatformFormFieldControl, FormValueControl<T>, OnInit, DoCheck, AfterViewInit, OnDestroy, HasElementRef
{
    /** Sets the `aria-label` attribute to the element. */
    @Input()
    ariaLabel: Nullable<string>;

    /** Sets the `aria-labelledby` attribute to the element. */
    @Input()
    ariaLabelledBy: Nullable<string>;

    /**
     * @deprecated
     * Use `ariaLabelledBy` instead.
     */
    @Input()
    set ariaLabelledby(value: Nullable<string>) {
        this.ariaDescribedBy = value;
    }

    /** Sets the `aria-describedby` attribute to the element. */
    @Input()
    ariaDescribedBy: Nullable<string>;

    /** id for the Element */
    @Input()
    id = `fdp-id-${randomId++}`;

    /** width of the element */
    @Input()
    width: string;

    /** Input placeholder */
    @Input()
    placeholder: string;

    /**
     * To allow user to determine what event he wants to trigger the messages to show
     * Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
     */
    @Input()
    triggers: (string | TriggerConfig)[] = [
        {
            trigger: 'focusin',
            openAction: true,
            closeAction: false
        },
        {
            trigger: 'focusout',
            openAction: false,
            closeAction: true
        }
    ];

    /**
     *  The state of the form control - applies css classes.
     *  Can be 'success', 'error', 'warning', 'default', 'information'.
     *
     * @default 'default'
     */
    @Input()
    set state(state: FormStates | undefined) {
        if (!state || isValidControlState(state)) {
            this._state = state;
        } else if (isDevMode()) {
            console.warn(`Provided value "${state}" is not a valid option for FormStates type`);
        }
    }
    get state(): FormStates {
        if (this._state) {
            return this._state;
        }

        if (!this.controlInvalid) {
            return 'default';
        }

        return this.formField?.getPriorityState() || 'error';
    }

    /** Holds the message with respect to state */
    @Input()
    stateMessage: Nullable<string>;

    /** Advanced form message configuration. Used for components that can render form messages in its template. */
    @Input()
    stateMessageConfig: Nullable<TemplateRef<any>>;

    /**
     * Tell the component if we are in editing mode.
     */
    @Input({ transform: booleanAttribute })
    set editable(value: boolean) {
        if (this._editable === value) {
            return;
        }
        this._editable = value;
        this.markForCheck();
        this.stateChanges.next('editable');
    }
    get editable(): boolean {
        return this._editable;
    }

    /** Form control validation event strategy. */
    @Input()
    validationStrategy: ('touched' | 'dirty' | 'submitted')[] = ['touched', 'dirty', 'submitted'];

    /**
     * Reference to internal Input element
     */
    @ViewChild('inputElementRef', { static: true, read: ElementRef })
    protected _elementRef: ElementRef;

    /**
     * The value of the control, exposed as a `model()` to satisfy the Signal Forms
     * `FormValueControl` contract. It is the single source of truth, kept in sync with the internal
     * `_value` via the apply/push bridge below so `[field]`, `[(value)]`, and programmatic
     * `value.set()` all drive the same state.
     *
     * Subclasses MUST NOT override this as a getter/setter (TS2611); they adapt behavior by overriding
     * the protected `_applyValue()` / `_applyModelValue()` hooks instead.
     */
    readonly value: ModelSignal<any> = model<any>(undefined);

    /** Control name (two-way `model()` so controls like radio/checkbox can assign a generated name). */
    readonly name = model<string>('');

    /**
     * Whether the input is disabled, exposed as a `model()` so `[field]` / `[(disabled)]` can drive it.
     * Internal reads should use `_isDisabled()` which also folds in a reactive-forms `NgControl` state.
     */
    readonly disabled = model<boolean>(false);

    /** readOnly value to mark the component read only. */
    readonly readonly = model<boolean>(false);

    /** Whether the input is required. */
    readonly required = model<boolean>(false);

    /**
     * Signal Forms `FormUiControl` state inputs. The `[formField]` directive writes these from the
     * bound field; we consume them in the error-state machinery. All optional in the contract.
     */
    readonly errors = input<readonly ValidationError.WithOptionalFieldTree[]>([]);

    /** Whether the bound Signal Forms field is touched. */
    readonly touched = input<boolean>(false);

    /** Whether the bound Signal Forms field is dirty. */
    readonly dirty = input<boolean>(false);

    /** Emits on blur so a Signal Forms field can mark itself touched. */
    readonly touch = output<void>();

    /** @hidden */
    formMessage: Nullable<FormInputMessageGroupComponent>;

    /**
     * See @FormFieldControl
     */
    focused = false;

    /** @hidden */
    innerErrorsTemplate?: TemplateRef<any>;

    /** Whether control has errors */
    get controlInvalid(): boolean {
        return this._controlInvalid;
    }

    /** @hidden */
    advancedStateMessage: Nullable<FormFieldAdvancedStateMessage>;

    /**
     * See @FormFieldControl
     */
    readonly stateChanges: Subject<any> = new Subject<any>();

    /** @hidden */
    readonly formField: PlatformFormField | null = null;

    /** @hidden */
    readonly _doCheck$ = inject(FDP_DO_CHECK, { optional: true });

    /** Element reference. */
    readonly elementRef = inject(ElementRef);

    /** NgControl reference. */
    readonly ngControl = inject(NgControl, {
        optional: true,
        self: true
    });

    /** Control container reference. */
    readonly controlContainer = inject(ControlContainer, {
        optional: true,
        skipSelf: true
    });

    /** Form reference. */
    readonly ngForm = inject(NgForm, {
        optional: true,
        skipSelf: true
    });

    /**
     * @hidden
     * The state of the form control - applies css classes.
     * Can be `success`, `error`, `warning`, `information` or 'default'
     */
    protected _state: FormStates | undefined;

    /** @hidden */
    protected defaultId = `fdp-input-id-${randomId++}`;

    /** @hidden */
    protected _value: any;
    /** @hidden */
    protected _editable = true;
    /** @hidden */
    protected _destroyed = inject(DestroyRef);

    /** @hidden Change detector, used for the imperative (non-signal) state in the form-control chain. */
    protected readonly _cdr = inject(ChangeDetectorRef);

    /** @hidden Subscriptions bag, torn down in `ngOnDestroy`. */
    protected _subscriptions = new Subscription();

    /**
     * @hidden
     * Resolved disabled state: a reactive-forms `NgControl` disabled state when present (preserving
     * the historical delegation), otherwise the `disabled` model. Use this for internal reads/bindings.
     * A getter (not a `computed`) because `NgControl.disabled` is not signal-tracked.
     */
    protected get _isDisabled(): boolean {
        const ngControlDisabled = this.ngControl?.disabled;
        if (ngControlDisabled !== null && ngControlDisabled !== undefined) {
            return ngControlDisabled;
        }
        return this.disabled();
    }

    /** @hidden */
    private readonly _externalSubmit = inject(FDP_FORM_SUBMIT, { optional: true });

    /** @hidden */
    private _externalFormSubmitted = false;

    /**
     * @hidden
     */
    private _controlInvalid = false;

    /**
     * @hidden
     * Re-entrancy guard for the model <-> ControlValueAccessor bridge: set while a model-originated
     * value is being applied, so `_pushToModel()` doesn't rewrite the model mid-apply.
     */
    private _syncingFromModel = false;

    /** @hidden */
    constructor() {
        const formField = inject<PlatformFormField>(FD_FORM_FIELD, {
            optional: true,
            skipSelf: true,
            host: true
        });

        const formControl = inject<PlatformFormFieldControl>(FD_FORM_FIELD_CONTROL, {
            optional: true,
            skipSelf: true,
            host: true
        });

        // We have to ignore "formField" if there is "formControl" wrapper
        this.formField = formField && !formControl ? formField : null;

        this._doCheck$?.pipe(takeUntilDestroyed(this._destroyed)).subscribe(() => {
            this.ngDoCheck();
        });
        this._externalSubmit?.pipe(takeUntilDestroyed(this._destroyed)).subscribe(() => {
            this._externalFormSubmitted = true;
        });

        // Bridge: `value` model -> component state. Two triggers feed one guarded handler:
        //   1. `effect()` — observes parent `[value]` / `[field]` INPUT writes, which update the model
        //      without emitting its output. Runs deferred.
        //   2. model output `subscribe()` — fires SYNCHRONOUSLY on internal `value.set()` (e.g. a
        //      `[(value)]` two-way write or programmatic set).
        //
        // Feedback/double-processing is prevented by VALUE EQUALITY: once a value is applied `_value`
        // equals the model, so whichever trigger fires second (or a `_pushToModel` echo) no-ops. Only a
        // genuinely different (externally-originated) value is applied.
        effect(() => {
            this._syncModelToComponent(this.value());
        });
        this.value.subscribe((modelValue) => {
            this._syncModelToComponent(modelValue);
        });
    }

    /** @hidden */
    ngOnInit(): void {
        if (this.formField) {
            this.formField.registerFormFieldControl(this);
        }
    }

    /**
     * Re-validate and emit event to parent container on every CD cycle as they are some errors
     * that we can't subscribe to.
     */
    ngDoCheck(): void {
        if (this.ngControl || this.errors().length > 0) {
            this.updateErrorState();
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.ngControl) {
            this._subscriptions.add(
                this.ngControl.statusChanges?.subscribe(() => {
                    this.markForCheck();
                })
            );
        }

        const labelAndHelpId = `fdp-form-label-content-${this.id}`;
        // if not specified, associate label and inline help ids with the input,
        // else add these ids to the specified ones
        if (this.formField) {
            if (!this.ariaLabelledBy) {
                this.ariaLabelledBy = labelAndHelpId;
            } else {
                this.ariaLabelledBy += ' ' + labelAndHelpId;
            }
        }

        this.innerErrorsTemplate = this.formField?.innerErrorRenderers;

        this.stateChanges
            .pipe(
                filter(() => !!this.formField),
                takeUntilDestroyed(this._destroyed)
            )
            .subscribe(() => {
                this.advancedStateMessage = {
                    template: this.formField!.innerErrorRenderers,
                    hasErrors: this.formField!.hasErrors()
                };
                this.detectChanges();
            });

        this.detectChanges();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
        this.stateChanges.complete();
        if (this.formField) {
            this.formField.unregisterFormFieldControl(this);
        }
    }

    /**
     * @hidden
     * For internal usage only. Marks the component (and ancestors) for check — still required for the
     * imperative, non-signal state that the form-control chain mutates (RxJS, DOM, plain properties).
     */
    markForCheck(): void {
        this._cdr.markForCheck();
    }

    /**
     * @hidden
     * For internal usage only. Forces change detection for imperative (non-signal) updates.
     */
    detectChanges(): void {
        this._cdr.detectChanges();
    }

    /**
     *
     * Keeps track of element focus
     */
    _onFocusChanged(isFocused: boolean): void {
        if (isFocused !== this.focused && (!this._isDisabled || !isFocused)) {
            this.focused = isFocused;
            this.stateChanges.next('_onFocusChanged');
        }

        if (!isFocused) {
            this.touch.emit();
        }
    }

    /**
     * Handles even when we click on parent container which is the FormField Wrapping this
     * control
     */
    onContainerClick(event: MouseEvent): void {
        this.focus(event);
    }

    /**
     * In most of the cases when working with input element directly you should be just find to assing
     * variable to this element
     *
     * ```
     * <input #inputElementRef fd-form-control ...>
     * ```
     *
     * and this default behavior used. For other cases implement focus.
     *
     */
    focus(event?: FocusOptions | MouseEvent): void {
        if (this._elementRef && !this.focused) {
            // `HTMLElement.focus` only reads `FocusOptions` (e.g. `preventScroll`); a `MouseEvent`
            // argument is ignored harmlessly, preserving the historical `onContainerClick` call.
            this._elementRef.nativeElement.focus(event as FocusOptions);
        }
    }

    /**
     *  Need re-validates errors on every CD iteration to make sure we are also
     *  covering non-control errors, errors that happens outside of this control
     */
    protected updateErrorState(): void {
        const parent = this.ngForm;
        const parentControlContainer = this.controlContainer;
        const control = this.ngControl ? (this.ngControl.control as FormControl) : null;
        const reactiveFormsError = !!(
            control?.invalid &&
            ((this.validationStrategy.includes('dirty') && control.dirty) ||
                (this.validationStrategy.includes('touched') && control.touched) ||
                (this.validationStrategy.includes('submitted') && parent?.submitted) ||
                (parentControlContainer as any)?.submitted ||
                this._externalFormSubmitted)
        );

        // Signal Forms: when driven by a `[formField]`, validation comes in via the `errors`/`touched`/
        // `dirty` inputs rather than the reactive-forms `NgControl`.
        const signalFormsError = !!(
            this.errors().length > 0 &&
            ((this.validationStrategy.includes('dirty') && this.dirty()) ||
                (this.validationStrategy.includes('touched') && this.touched()) ||
                (this.validationStrategy.includes('submitted') && parent?.submitted) ||
                (parentControlContainer as any)?.submitted ||
                this._externalFormSubmitted)
        );

        const newStatusIsError = reactiveFormsError || signalFormsError;

        if (newStatusIsError !== this.controlInvalid) {
            this._controlInvalid = newStatusIsError;
            this.stateChanges.next('updateErrorState');
            this.markForCheck();
        }
    }

    /**
     * Used to change the value of a control.
     * @param value the value to be applied
     * @param emitModelChange whether to propagate the change to the `value` model (and thus to a bound
     * Signal Forms field / `[(value)]`). Should be `false` for a purely internal apply that must not
     * re-notify bindings; `true` otherwise.
     */
    protected setValue(value: any, emitModelChange = true): void {
        if (value !== this._value) {
            this._applyValue(value);
            if (emitModelChange) {
                this._pushToModel(value);
            }
            this.markForCheck();
        }
    }

    /** @hidden */
    protected getValue(): any {
        return this._value;
    }

    /**
     * @hidden
     * Canonical value-apply hook. Stores `_value` and fires `stateChanges`. Subclasses override this
     * to run value-dependent side effects (counters, view updates, selection, etc.) — it replaces the
     * former `writeValue()` override point now that the component is Signal-Forms-native.
     */
    protected _applyValue(value: any): void {
        this._value = value;
        this.stateChanges.next('applyValue');
        this.markForCheck();
    }

    /**
     * @hidden
     * Applies a value coming FROM the `value` model (`[field]`, `[(value)]`, or a programmatic
     * `value.set()`). Routes through `_applyValue()` so subclass side effects run. Subclasses whose
     * value needs special treatment (e.g. radio, whose model value is its identity) override this.
     */
    protected _applyModelValue(modelValue: any): void {
        this._applyValue(modelValue);
    }

    /**
     * @hidden
     * Syncs a model-originated value into the component. Guarded by value equality so a value we just
     * pushed (`_pushToModel`) or an equal re-emit no-ops, preventing feedback loops.
     */
    private _syncModelToComponent(modelValue: any): void {
        if (this._syncingFromModel || this._valuesEqual(modelValue, this._value)) {
            return;
        }
        this._syncingFromModel = true;
        try {
            this._applyModelValue(modelValue);
        } finally {
            this._syncingFromModel = false;
        }
    }

    /**
     * @hidden
     * Pushes a value from the component INTO the `value` model (notifying bound fields / two-way
     * bindings). Skipped while applying a model-originated value so the model isn't rewritten mid-apply.
     */
    private _pushToModel(value: any): void {
        if (this._syncingFromModel) {
            return;
        }
        this.value.set(value);
    }

    /**
     * @hidden
     * Equality used by the model <-> CVA bridge to decide whether a model value differs from the
     * current CVA value. Uses reference/`Object.is` equality, matching signal semantics and the
     * historical `value !== this._value` guard in `setValue`.
     */
    private _valuesEqual(a: any, b: any): boolean {
        return Object.is(a, b);
    }
}
