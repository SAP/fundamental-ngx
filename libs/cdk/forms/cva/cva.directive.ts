import {
    AfterViewInit,
    booleanAttribute,
    computed,
    DestroyRef,
    Directive,
    effect,
    ElementRef,
    inject,
    input,
    isDevMode,
    OnDestroy,
    OnInit,
    output,
    signal,
    untracked,
    viewChild
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlContainer, ControlValueAccessor, FormControl, NgControl, NgForm } from '@angular/forms';
import { HasElementRef, Nullable } from '@fundamental-ngx/cdk/utils';
import { Subject } from 'rxjs';
import { isValidControlState } from '../helpers/state';
import { BaseCVA } from '../models/cva';
import { FormField, FormFieldControl } from '../models/form-field';
import { FormStates } from '../models/form-state';
import { FD_FORM_FIELD_CONTROL } from '../tokens/form-field-control.token';
import { FD_FORM_FIELD } from '../tokens/form-field.token';

let randomId = 0;

@Directive({
    selector: '[fdkCva]'
})
export class CvaDirective<T = any>
    implements HasElementRef, BaseCVA, FormFieldControl, OnInit, AfterViewInit, OnDestroy, ControlValueAccessor
{
    /**
     * Reference to internal Input element
     */
    readonly inputElementRef = viewChild<ElementRef>('inputElementRef');

    // ============================================
    // Signal inputs
    // ============================================

    /** Input placeholder */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    readonly placeholderInput = input<string>('', { alias: 'placeholder' });

    /** Input type */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    readonly typeInput = input<string>('', { alias: 'type' });

    /**
     * The state of the form control - applies css classes.
     * Can be 'success', 'error', 'warning', 'default', 'information'.
     */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    readonly stateInput = input<Nullable<FormStates>>(null, { alias: 'state' });

    /** Holds the message with respect to state */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    readonly stateMessageInput = input<Nullable<string>>(null, { alias: 'stateMessage' });

    /** Whether the input is disabled (via input binding) */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    readonly disabledInput = input(false, { alias: 'disabled', transform: booleanAttribute });

    /** readOnly Value to Mark component read only */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    readonly readonlyInput = input(false, { alias: 'readonly', transform: booleanAttribute });

    /** Binds to control aria-labelledBy attribute */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    readonly ariaLabelledByInput = input<Nullable<string>>(null, { alias: 'ariaLabelledBy' });

    /** Sets control aria-label attribute value */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    readonly ariaLabelInput = input<Nullable<string>>(null, { alias: 'ariaLabel' });

    /** Tell the component if we are in editing mode (via input binding) */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    readonly editableInput = input(true, { alias: 'editable', transform: booleanAttribute });

    /** Name of the control. */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    readonly nameInput = input<string>('', { alias: 'name' });

    /** ID for the Element */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    readonly idInput = input<string>(`fd-input-id-${randomId++}`, { alias: 'id' });

    // ============================================
    // Signal outputs
    // ============================================

    /** Emits when change detection is needed. */
    readonly detectChanges = output<void>();

    /** Emits when mark for changes detection is needed. */
    readonly markForCheck = output<void>();

    // ============================================
    // Injected dependencies (public/readonly)
    // ============================================

    /** @hidden */
    readonly formField: FormField | null = inject(FD_FORM_FIELD, {
        skipSelf: true,
        optional: true
    });

    /** NgControl instance. */
    readonly ngControl = inject(NgControl, {
        optional: true,
        host: true
    });

    /** Form container instance. Usually ngForm or FormGroup directives. */
    readonly controlContainer = inject(ControlContainer, {
        optional: true,
        skipSelf: true
    });

    /** Separate NgForm instance. For cases when formGroup is used with the form itself. */
    readonly ngForm = inject(NgForm, {
        optional: true,
        skipSelf: true
    });

    /** See @FormFieldControl */
    readonly stateChanges: Subject<any> = new Subject<any>();

    // ============================================
    // Computed signals
    // ============================================

    /** @hidden */
    readonly normalizedState = computed(() => {
        const inputState = this.stateInput();
        const storedState = this._state();

        // Validate and use input state if provided
        if (inputState) {
            if (isValidControlState(inputState)) {
                return inputState;
            } else if (isDevMode()) {
                console.warn(`Provided value "${inputState}" is not a valid option for FormStates type`);
            }
        }

        // Fall back to stored state (set programmatically)
        if (storedState) {
            return storedState;
        }

        if (!this._controlInvalid()) {
            return 'default';
        }

        return this.formField?.getPriorityState() || 'default';
    });

    // ============================================
    // Protected fields
    // ============================================

    /** @hidden */
    protected readonly _destroyRef = inject(DestroyRef);

    // ============================================
    // Private fields
    // ============================================

    /**
     * A private property to hold the ElementRef which might be null
     */
    private readonly _elementRefOrNull: ElementRef | null = inject(ElementRef, { optional: true });

    /** @hidden */
    private readonly _parentControl = inject(FD_FORM_FIELD_CONTROL, {
        skipSelf: true,
        optional: true
    });

    /** @hidden */
    private readonly _controlInvalid = signal(false);

    /**
     * @hidden
     * Internal state storage for programmatic state changes.
     */
    private readonly _state = signal<Nullable<FormStates>>(null);

    /** @hidden Internal signal for disabled state */
    private readonly _disabled = signal(false);

    /** @hidden Internal signal for editable state */
    private readonly _editable = signal(true);

    /** @hidden Internal signal for focused state */
    private readonly _focused = signal(false);

    /** @hidden Internal signal for value */
    private readonly _value = signal<T | null>(null);

    /** @hidden Internal signal for required state */
    private readonly _required = signal(false);

    /** @hidden Internal signal for ariaLabelledBy (can be modified after view init) */
    private readonly _ariaLabelledBy = signal<Nullable<string>>(null);

    /** @hidden Internal signal for stateMessage (can be modified programmatically) */
    private readonly _stateMessage = signal<Nullable<string>>(null);

    /** @hidden Internal signal for readonly (can be modified programmatically) */
    private readonly _readonly = signal(false);

    // ============================================
    // Constructor
    // ============================================

    /** @hidden */
    constructor() {
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }

        // Effect to sync editable input to internal state and emit stateChanges
        effect(() => {
            const editableValue = this.editableInput();
            untracked(() => {
                if (this._editable() !== editableValue) {
                    this._editable.set(editableValue);
                    this._markForCheck();
                    this.stateChanges.next('editable');
                }
            });
        });

        // Effect to sync disabled input to internal state
        effect(() => {
            const disabledValue = this.disabledInput();
            untracked(() => {
                if (disabledValue && !this._disabled()) {
                    this._disabled.set(true);
                    this.stateChanges.next('setDisabledState');
                }
            });
        });

        // Effect to update error state - replaces ngDoCheck for zoneless compatibility
        effect(() => {
            // Read signals to track dependencies
            this._focused();
            this._value();

            untracked(() => {
                if (this.ngControl) {
                    this.updateErrorState();
                }
            });
        });
    }

    // ============================================
    // CVA callbacks (public method properties)
    // ============================================

    /** @hidden */
    onChange: (value: any) => void = () => {};

    /** @hidden */
    onTouched = (): void => {};

    // ============================================
    // FormFieldControl interface property accessors
    // (setters before getters per ESLint rules)
    // ============================================

    /** Input placeholder - implements FormFieldControl */
    get placeholder(): string {
        return this.placeholderInput();
    }

    /** Input type */
    get type(): string {
        return this.typeInput();
    }

    /**
     * The state of the form control.
     * Can be 'success', 'error', 'warning', 'default', 'information'.
     * Allows programmatic state changes.
     */
    set state(value: Nullable<FormStates>) {
        if (!value || isValidControlState(value)) {
            this._state.set(value);
        } else if (isDevMode()) {
            console.warn(`Provided value "${value}" is not a valid option for FormStates type`);
        }
    }

    get state(): FormStates {
        return this.normalizedState();
    }

    /** Allows programmatic stateMessage changes */
    set stateMessage(value: Nullable<string>) {
        this._stateMessage.set(value);
    }

    /** Holds the message with respect to state */
    get stateMessage(): Nullable<string> {
        return this._stateMessage() ?? this.stateMessageInput();
    }

    /** Allows programmatic disabled state changes */
    set disabled(value: boolean) {
        this.setDisabledState(value);
    }

    /** Whether the input is disabled - implements FormFieldControl */
    get disabled(): boolean {
        if (this.ngControl && this.ngControl.disabled !== null) {
            return this.ngControl.disabled;
        }
        return this._disabled();
    }

    /** Allows programmatic readonly state changes */
    set readonly(value: boolean) {
        this._readonly.set(value);
    }

    /** readOnly Value to Mark component read only */
    get readonly(): boolean {
        return this._readonly() || this.readonlyInput();
    }

    /** Allows programmatic ariaLabelledBy changes */
    set ariaLabelledBy(value: Nullable<string>) {
        this._ariaLabelledBy.set(value);
    }

    /** Binds to control aria-labelledBy attribute */
    get ariaLabelledBy(): Nullable<string> {
        return this._ariaLabelledBy() ?? this.ariaLabelledByInput();
    }

    /** Sets control aria-label attribute value */
    get ariaLabel(): Nullable<string> {
        return this.ariaLabelInput();
    }

    /** Allows programmatic editable state changes */
    set editable(value: boolean) {
        if (this._editable() !== value) {
            this._editable.set(value);
            this._markForCheck();
            this.stateChanges.next('editable');
        }
    }

    /** Tell the component if we are in editing mode - implements FormFieldControl */
    get editable(): boolean {
        return this._editable();
    }

    /** Name of the control. */
    get name(): string {
        return this.nameInput();
    }

    set value(val: T | null) {
        this._value.set(val);
    }

    /** @hidden */
    get value(): T | null {
        return this._value();
    }

    /** set when input field is mandatory form field - implements FormFieldControl */
    set required(value: boolean) {
        this._required.set(value);
    }

    get required(): boolean {
        return this._required();
    }

    set focused(value: boolean) {
        this._focused.set(value);
    }

    /** See @FormFieldControl */
    get focused(): boolean {
        return this._focused();
    }

    /** Whether control has errors - implements FormFieldControl */
    get controlInvalid(): boolean {
        return this._controlInvalid();
    }

    /** ID for the Element - implements FormFieldControl */
    get id(): string {
        return this.idInput();
    }

    /** Element reference - implements FormFieldControl */
    get elementRef(): ElementRef {
        // Return a fallback ElementRef if _elementRefOrNull is null
        return this._elementRefOrNull || this.inputElementRef() || new ElementRef(null);
    }

    // ============================================
    // Lifecycle hooks
    // ============================================

    /** @hidden */
    ngOnInit(): void {
        // There may be cases when one form control is used as a base to build another form control.
        if (!this._parentControl) {
            this.formField?.registerFormFieldControl(this);
        }

        // Subscribe to ngControl status changes for error state updates
        if (this.ngControl?.statusChanges) {
            this.ngControl.statusChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
                this.updateErrorState();
                this._markForCheck();
            });
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        const labelAndHelpId = `fdp-form-label-content-${this.id}`;
        // if not specified, associate label and inline help ids with the input,
        // else add these ids to the specified ones
        const currentAriaLabelledBy = this.ariaLabelledBy;
        if (!currentAriaLabelledBy) {
            this._ariaLabelledBy.set(labelAndHelpId);
        } else {
            this._ariaLabelledBy.set(currentAriaLabelledBy + ' ' + labelAndHelpId);
        }
        this._markForCheck();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.stateChanges.complete();
        this.formField?.unregisterFormFieldControl(this);
    }

    // ============================================
    // ControlValueAccessor implementation
    // ============================================

    /** @hidden */
    registerOnChange(fn: (_: any) => void): void {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    /** @hidden */
    setDisabledState(isDisabled: boolean): void {
        this._markForCheck();
        if (isDisabled !== this._disabled()) {
            this._disabled.set(isDisabled);
            this.stateChanges.next('setDisabledState');
        }
    }

    /**
     * Method for setting the value
     * @param value
     */
    writeValue(value: T): void {
        this._value.set(value);
        this.stateChanges.next('writeValue');
        this._markForCheck();
    }

    // ============================================
    // Public methods
    // ============================================

    /**
     * Keeps track of element focus
     */
    _onFocusChanged(isFocused: boolean): void {
        if (isFocused !== this._focused() && (!this.disabled || !isFocused)) {
            this._focused.set(isFocused);
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
     */
    focus(event?: MouseEvent): void {
        const elementRef = this.inputElementRef();
        if (elementRef && !this._focused()) {
            elementRef.nativeElement.focus(event);
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

        if (newStatusIsError !== this._controlInvalid()) {
            this._controlInvalid.set(newStatusIsError);
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

        if (coercedValue !== this._value()) {
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
