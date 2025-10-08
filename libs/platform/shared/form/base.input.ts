import { BooleanInput } from '@angular/cdk/coercion';
import {
    AfterViewInit,
    DestroyRef,
    Directive,
    DoCheck,
    ElementRef,
    InjectionToken,
    Input,
    OnDestroy,
    OnInit,
    TemplateRef,
    ViewChild,
    booleanAttribute,
    inject,
    isDevMode
} from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, NgControl, NgForm } from '@angular/forms';
import { HasElementRef, Nullable } from '@fundamental-ngx/cdk/utils';
import { Observable, Subject, filter } from 'rxjs';

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
import { BaseComponent } from '../base';
import { PlatformFormField, PlatformFormFieldControl } from './form-field';

export const FDP_DO_CHECK = new InjectionToken<Observable<void>>('FdpInputDoCheckTrigger');
export const FDP_FORM_SUBMIT = new InjectionToken<Observable<void>>('FdpFormSubmitTrigger');

let randomId = 0;

/**
 * All form components share the same information (value, name, placeholder,.. ) as well as
 * the same behavior given by ControlValueAccessor.
 *
 * Even this is not ideal solution there is no other way then use inheritance to reuse some of the
 * common logic. It should be possible to use some kind of compositions with Proxies but something
 * similar that exists in Aspect Oriented Programing.
 *
 * Usually try to fire stateChange only for things that can change dynamically in runtime. We don't expect
 * that e.g. placeholder will change after component is created
 */
@Directive()
export abstract class BaseInput
    extends BaseComponent
    implements PlatformFormFieldControl, ControlValueAccessor, OnInit, DoCheck, AfterViewInit, OnDestroy, HasElementRef
{
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

    /** Whether the input is disabled */
    @Input()
    set disabled(value: boolean) {
        this.setDisabledState(value);
    }
    get disabled(): boolean {
        if (this.ngControl && this.ngControl.disabled !== null) {
            return this.ngControl.disabled;
        }
        return this._disabled;
    }

    /**
     * readOnly Value to Mark component read only
     */
    @Input()
    readonly: boolean;

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
     * need to make  these value accessor as abstract to be implemented by subclasses. Having them
     * in superclass have issue getting reference to them with Object.getOwnPropertyDescripton
     * which we need to programmatically wraps components set/get value
     *
     */
    abstract get value(): any;

    abstract set value(value: any);

    /** @hidden */
    formMessage: Nullable<FormInputMessageGroupComponent>;

    /**
     * See @FormFieldControl
     */
    focused = false;

    /** set when input field is mandatory form field */
    required: boolean;

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

    /** @hidden */
    private readonly _externalSubmit = inject(FDP_FORM_SUBMIT, { optional: true });

    /** @hidden */
    private _externalFormSubmitted = false;

    /**
     * @hidden
     */
    private _controlInvalid = false;

    /** @hidden */
    constructor() {
        /**
         * We do not use Injector.get() approach here because there is a bug
         * with this signature https://github.com/angular/angular/issues/31776
         * where "get()" method doesn't take into account "flag" option"
         *
         */
        super();

        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }

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
    }

    /** @hidden */
    onChange: (value: any) => void = () => {};

    /** @hidden */
    onTouched = (): void => {};

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
        if (this.ngControl) {
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
    registerOnChange(fn: (_: any) => void): void {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    /** @hidden */
    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.stateChanges.complete();
        if (this.formField) {
            this.formField.unregisterFormFieldControl(this);
        }
    }

    /** @hidden */
    setDisabledState(isDisabled: BooleanInput): void {
        const newState = booleanAttribute(isDisabled);
        this.markForCheck();
        if (newState !== this._disabled) {
            this._disabled = newState;
            this.stateChanges.next('setDisabledState');
        }
    }

    /**
     * Each sub class must override this method as inheritance does not work
     */
    writeValue(value: any): void {
        this._value = value;
        this.stateChanges.next('writeValue');
        this.markForCheck();
    }

    /**
     *
     * Keeps track of element focus
     */
    _onFocusChanged(isFocused: boolean): void {
        if (isFocused !== this.focused && (!this.disabled || !isFocused)) {
            this.focused = isFocused;
            this.stateChanges.next('_onFocusChanged');
        }

        if (!isFocused) {
            this.onTouched();
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
    focus(event?: MouseEvent): void {
        if (this._elementRef && !this.focused) {
            this._elementRef.nativeElement.focus(event);
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
        const newStatusIsError = !!(
            control?.invalid &&
            ((this.validationStrategy.includes('dirty') && control.dirty) ||
                (this.validationStrategy.includes('touched') && control.touched) ||
                (this.validationStrategy.includes('submitted') && parent?.submitted) ||
                (parentControlContainer as any)?.submitted ||
                this._externalFormSubmitted)
        );

        if (newStatusIsError !== this.controlInvalid) {
            this._controlInvalid = newStatusIsError;
            this.stateChanges.next('updateErrorState');
            this.markForCheck();
        }
    }

    /**
     * Used to change the value of a control.
     * @param value the value to be applied
     * @param emitOnChange whether to emit "onChange" event.
     * Should be "false", if the change is made programmatically (internally) by the control, "true" otherwise
     */
    protected setValue(value: any, emitOnChange = true): void {
        if (value !== this._value) {
            this.writeValue(value);
            if (emitOnChange) {
                this.onChange(value);
            }
            this.markForCheck();
        }
    }

    /** @hidden */
    protected getValue(): any {
        return this._value;
    }
}
