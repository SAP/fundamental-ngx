import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    AfterViewInit,
    Directive,
    DoCheck,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
    computed,
    inject,
    isDevMode,
    signal
} from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, NgControl, NgForm } from '@angular/forms';
import { HasElementRef, Nullable } from '@fundamental-ngx/cdk/utils';
import { Subject, Subscription } from 'rxjs';
import { isValidControlState } from '../helpers/state';
import { BaseCVA } from '../models/cva';
import { FormField, FormFieldControl } from '../models/form-field';
import { FormStates } from '../models/form-state';
import { FD_FORM_FIELD_CONTROL } from '../tokens/form-field-control.token';
import { FD_FORM_FIELD } from '../tokens/form-field.token';

let randomId = 0;

@Directive({
    selector: '[fdkCva]',
    standalone: true
})
export class CvaDirective<T = any>
    implements HasElementRef, BaseCVA, FormFieldControl, OnInit, DoCheck, AfterViewInit, OnDestroy, ControlValueAccessor
{
    /** Input placeholder */
    @Input()
    placeholder: string;

    /** Input type */
    @Input()
    type: string;

    /**
     *  The state of the form control - applies css classes.
     *  Can be 'success', 'error', 'warning', 'default', 'information'.
     *
     * @default 'default'
     */
    @Input()
    set state(state: Nullable<FormStates>) {
        if (!state || isValidControlState(state)) {
            this._state$.set(state);
        } else if (isDevMode()) {
            console.warn(`Provided value "${state}" is not a valid option for FormStates type`);
        }
    }
    get state(): FormStates {
        return this.normalizedState$();
    }

    /** Holds the message with respect to state */
    @Input()
    stateMessage: Nullable<string>;

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
     * readOnly Value to mark component read only
     */
    @Input()
    readonly: boolean;

    /**
     * display Value to mark component display only
     */
    @Input()
    display: boolean;

    /**
     * isLast Value to mark component as last in a group
     */
    @Input()
    isLast: boolean;

    /** Binds to control aria-labelledBy attribute */
    @Input()
    ariaLabelledBy: Nullable<string>;

    /** Sets control aria-label attribute value */
    @Input()
    ariaLabel: Nullable<string>;

    /**
     * Tell the component if we are in editing mode.
     */
    @Input()
    set editable(value: BooleanInput) {
        const newVal = coerceBooleanProperty(value);
        if (this._editable !== newVal) {
            this._editable = newVal;
            this._markForCheck();
            this.stateChanges.next('editable');
        }
    }
    get editable(): boolean {
        return this._editable;
    }

    /**
     * Name of the control.
     */
    @Input()
    name: string;

    /**
     * Emits when change detection is needed.
     */
    @Output()
    detectChanges = new EventEmitter<void>();

    /**
     * Emits when mark for changes detection is needed.
     */
    @Output()
    markForCheck = new EventEmitter<void>();

    /**
     * Reference to internal Input element
     */
    @ViewChild('inputElementRef', { static: true, read: ElementRef })
    protected _elementRef: ElementRef;

    /** @hidden */
    value: T;

    /** set when input field is mandatory form field */
    required: boolean;

    /**
     * See @FormFieldControl
     */
    focused = false;

    /** Whether control has errors */
    get controlInvalid(): boolean {
        return this._controlInvalid$();
    }

    /**
     * See @FormFieldControl
     */
    readonly stateChanges: Subject<any> = new Subject<any>();

    /** @hidden */
    readonly formField: FormField | null = inject(FD_FORM_FIELD, {
        skipSelf: true,
        optional: true
    });

    /**
     * NgControl instance.
     */
    readonly ngControl = inject(NgControl, {
        optional: true,
        host: true
    });

    /**
     * Form container instance. Usually ngForm or FormGroup directives.
     */
    readonly controlContainer = inject(ControlContainer, {
        optional: true,
        skipSelf: true
    });

    /**
     * Separate NgForm instance. For cases when formGroup is used with the form itself.
     */
    readonly ngForm = inject(NgForm, {
        optional: true,
        skipSelf: true
    });

    /** @hidden */
    readonly normalizedState$ = computed(() => {
        const storedState = this._state$();
        if (storedState) {
            return storedState;
        }

        if (!this._controlInvalid$()) {
            return 'default';
        }

        return this.formField?.getPriorityState() || 'default';
    });

    /** @hidden */
    protected _subscriptions = new Subscription();

    /**
     * A private property to hold the ElementRef which might be null
     */
    private _elementRefOrNull: ElementRef | null = inject(ElementRef, { optional: true });

    /**
     * Element reference.
     */
    get elementRef(): ElementRef {
        // Return a fallback ElementRef if _elementRefOrNull is null
        return this._elementRefOrNull || (this._elementRef as ElementRef);
    }

    /** @hidden */
    private _defaultId = `fd-input-id-${randomId++}`;

    /** ID for the Element */
    // eslint-disable-next-line @typescript-eslint/member-ordering
    @Input()
    id: string = this._defaultId;

    /** @hidden */
    private _disabled: boolean;
    /** @hidden */
    private _editable = true;

    /**
     * @hidden
     */
    private readonly _controlInvalid$ = signal(false);

    /** @hidden */
    private readonly _parentControl = inject(FD_FORM_FIELD_CONTROL, {
        skipSelf: true,
        optional: true
    });

    /**
     * @hidden
     * The state of the form control - applies css classes.
     * Can be `success`, `error`, `warning`, `information` or 'default'
     */
    private readonly _state$ = signal<Nullable<FormStates>>(null);

    /** @hidden */
    constructor() {
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }

    /** @hidden */
    onChange: (value: any) => void = () => {};

    /** @hidden */
    onTouched = (): void => {};

    /** @hidden */
    ngOnInit(): void {
        // There may be cases when one form control is used as a base to build another form control.
        if (!this._parentControl) {
            this.formField?.registerFormFieldControl(this);
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
                    this._markForCheck();
                })
            );
        }

        const labelAndHelpId = `fdp-form-label-content-${this.id}`;
        // if not specified, associate label and inline help ids with the input,
        // else add these ids to the specified ones
        if (!this.ariaLabelledBy) {
            this.ariaLabelledBy = labelAndHelpId;
        } else {
            this.ariaLabelledBy += ' ' + labelAndHelpId;
        }
        this._markForCheck();
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
        this._subscriptions.unsubscribe();
        this.stateChanges.complete();
        this.formField?.unregisterFormFieldControl(this);
    }

    /** @hidden */
    setDisabledState(isDisabled: BooleanInput): void {
        const newState = coerceBooleanProperty(isDisabled);
        this._markForCheck();
        if (newState !== this._disabled) {
            this._disabled = newState;
            this.stateChanges.next('setDisabledState');
        }
    }

    /**
     * Method for setting the value
     * @param value
     */
    writeValue(value: T): void {
        this.value = value;
        this.stateChanges.next('writeValue');
        this._markForCheck();
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
     * In most of the cases when working with input element directly you should be just find to assign
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
    updateErrorState(): void {
        const parent = this.ngForm;
        const parentControlContainer = this.controlContainer;
        const control = this.ngControl ? (this.ngControl.control as FormControl) : null;
        const newStatusIsError = !!(
            control?.invalid &&
            (control.dirty || control.touched || parent?.submitted || (parentControlContainer as any)?.submitted)
        );

        if (newStatusIsError !== this._controlInvalid$()) {
            this._controlInvalid$.set(newStatusIsError);
            this.stateChanges.next('updateErrorState');
            this._markForCheck();
        }
    }

    /**
     * Used to change the value of a control.
     * @param value the value to be applied
     * @param emitOnChange whether to emit "onChange" event.
     * Should be "false", if the change is made programmatically (internally) by the control, "true" otherwise
     */
    setValue(value: T, emitOnChange = true): void {
        let coercedValue: any = value;

        if (this.type === 'number') {
            coercedValue = value === '' || value === null || value === undefined ? null : Number(value);
        }

        if (coercedValue !== this.value) {
            this.writeValue(coercedValue);
            if (emitOnChange) {
                this.onChange(coercedValue);
            }
            this._markForCheck();
        }
    }

    /** @hidden */
    private _markForCheck(): void {
        this.markForCheck.emit();
    }
}
