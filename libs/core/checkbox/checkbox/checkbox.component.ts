import { CdkPortalOutlet, DomPortal, PortalModule } from '@angular/cdk/portal';
import { NgClass } from '@angular/common';
import {
    AfterViewInit,
    Attribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnDestroy,
    Output,
    Renderer2,
    ViewChild,
    ViewEncapsulation,
    forwardRef
} from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormStates } from '@fundamental-ngx/cdk/forms';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import {
    ContentDensityModule,
    ContentDensityObserver,
    contentDensityObserverProviders
} from '@fundamental-ngx/core/content-density';
import { FormItemControl, registerFormItemControl } from '@fundamental-ngx/core/form';
import equal from 'fast-deep-equal';
import { Subscription } from 'rxjs';
import { FD_CHECKBOX_COMPONENT } from '../tokens';
import { FD_CHECKBOX_VALUES_DEFAULT, FdCheckboxValues } from './fd-checkbox-values.interface';

let checkboxUniqueId = 0;

export type FdCheckboxTypes = 'checked' | 'unchecked' | 'indeterminate' | 'force-checked';

@Component({
    selector: 'fd-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrl: './checkbox.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxComponent),
            multi: true
        },
        {
            provide: FD_CHECKBOX_COMPONENT,
            useExisting: CheckboxComponent
        },
        registerFormItemControl(CheckboxComponent),
        contentDensityObserverProviders()
    ],
    host: { '[attr.tabindex]': '-1' },
    imports: [FormsModule, NgClass, ContentDensityModule, PortalModule]
})
export class CheckboxComponent<T = unknown> implements ControlValueAccessor, AfterViewInit, OnDestroy, FormItemControl {
    /** @hidden */
    @ViewChild('inputElement')
    inputElement: ElementRef<HTMLInputElement>;

    /** @hidden */
    @ViewChild('labelElement')
    labelElement: ElementRef;

    /** Whether input label should be wrapped */
    @Input() wrapLabel: boolean;

    /** Vertical position of the label compared to the checkbox box */
    @Input() valignLabel: 'top' | 'middle' = 'middle';

    /** Sets the `aria-label` attribute to the element. */
    @Input()
    ariaLabel: Nullable<string>;

    /**
     * Sets the `role` attribute to the element.
     * Default: checkbox
     */
    @Input()
    role = 'checkbox';

    /** Current selection state of the checkbox component */
    @Input()
    set value(value: T) {
        this.writeValue(value);
    }

    get value(): T {
        return this.checkboxValue;
    }

    /** Sets the `aria-labelledby` attribute to the element. */
    @Input()
    ariaLabelledBy: Nullable<string>;

    /** Sets the `aria-describedby` attribute to the element. */
    @Input()
    ariaDescribedBy: Nullable<string>;

    /** sets checkbox tooltip */
    @Input()
    title: Nullable<string>;

    /** Sets [id] property of input, binds input with input label using [for] property. */
    @Input()
    inputId = `fd-checkbox-${checkboxUniqueId++}`;

    /** State of control, changes visual appearance of control. */
    @Input()
    state?: FormStates;

    /** Sets [name] property of input. */
    @Input()
    name: string;

    /** Sets text of control label. */
    @Input()
    label: string;

    /** Allows to disable/enable control. */
    @Input()
    disabled: boolean;

    /** Disables editibility */
    @Input()
    readonly: boolean;

    /** Enables controls third state. */
    @Input()
    tristate = false;

    /** Allows to prevent user from manually selecting controls third state. */
    @Input()
    tristateSelectable = false;

    /** Assigns given class to checkbox label element */
    @Input()
    labelClass: string;

    /** If it is mandatory field */
    @Input()
    required = false;

    /** Whether the checkbox should be rendered in display-only mode. */
    @Input()
    displayOnly = false;

    /** Sets values returned by control. */
    @Input()
    set values(checkboxValues: FdCheckboxValues) {
        this._values = { ...FD_CHECKBOX_VALUES_DEFAULT, ...(checkboxValues ?? {}) };
    }

    get values(): FdCheckboxValues {
        return this._values;
    }

    /** Whether checkbox should be rendered standalone (without any text). */
    @HostBinding('class.fd-checkbox--standalone')
    @Input()
    standalone = false;

    /** @hidden */
    @HostBinding('style.position')
    readonly position = 'relative';

    /** @hidden */
    @HostBinding('style.outline')
    readonly outline = 'none';

    /** Emits event on focus change */
    @Output() focusChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** @hidden */
    @ViewChild('domPortal')
    private readonly _domPortalContent: ElementRef<HTMLElement>;

    /** @hidden */
    @ViewChild(CdkPortalOutlet, { static: false })
    private readonly _portalOutlet: CdkPortalOutlet;

    /** Stores current checkbox value. */
    checkboxValue: T;
    /** Stores current checkbox state. */
    checkboxState: FdCheckboxTypes;

    /** @hidden */
    _projectedContent = false;

    /** @hidden Used to define if control is in 'indeterminate' state.*/
    get isIndeterminate(): boolean {
        return this.checkboxState === 'indeterminate';
    }

    /** @hidden Used to define if control is in 'checked' / 'unchecked' state. */
    get isChecked(): boolean {
        return this.checkboxState === 'checked' || this.checkboxState === 'force-checked';
    }

    /** @hidden */
    _domPortal: DomPortal<HTMLElement>;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden values returned by control. */
    private _values: FdCheckboxValues = { ...FD_CHECKBOX_VALUES_DEFAULT };

    /** @hidden */
    constructor(
        public elementRef: ElementRef<Element>,
        @Attribute('tabIndexValue') public tabIndexValue: number = 0,
        private _changeDetectorRef: ChangeDetectorRef,
        private renderer: Renderer2,
        readonly _contentDensityObserver: ContentDensityObserver
    ) {
        this.tabIndexValue = tabIndexValue;
    }

    /** @hidden Reference to callback provided by FormControl.*/
    public onTouched = (): void => {};
    /** @hidden Reference to callback provided by FormControl.*/
    public onValueChange: (value: T) => void = () => {};

    /** @hidden */
    ngAfterViewInit(): void {
        this._contentDensityObserver.consume(
            {
                elementRef: this.inputElement
            },
            {
                elementRef: this.labelElement
            }
        );

        this._domPortal = new DomPortal(this._domPortalContent);
        this._projectedContent = !!this._domPortal.element.innerHTML.trim();
        this._changeDetectorRef.detectChanges();
        this._portalOutlet?.attach(this._domPortal);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /**
     * @hidden ControlValueAccessor interface
     * - sets new control value
     * - updates control state
     */
    writeValue(value: T): void {
        this.checkboxValue = value;
        this._setState();
        this._detectChanges();
    }

    /** @hidden ControlValueAccessor interface method - sets onValueChange callback.*/
    registerOnChange(fn: (value: T) => void): void {
        this.onValueChange = fn;
    }

    /** @hidden ControlValueAccessor interface method - sets onTouched callback.*/
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    /** @hidden Called by FormControl - used to disable / enable control.*/
    setDisabledState(disabled: boolean): void {
        this.disabled = disabled;
        this._detectChanges();
    }

    /** @hidden Called by FormControl - used to disable editablity.*/
    setReadOnlyState(readonly: boolean): void {
        this.readonly = readonly;
        this._detectChanges();
    }

    /** @hidden */
    setStyleState(state: FormStates): void {
        this.state = state;
        this._detectChanges();
    }

    /**
     * @hidden
     * Based on current control state:
     * - sets next control value
     * - emits new control value
     * - updates control state based on new control value
     * */
    nextValue(previousValue?: FdCheckboxTypes): void {
        switch (previousValue || this.checkboxState) {
            case 'checked':
                this.checkboxValue = this.values.falseValue;
                break;
            case 'unchecked':
                this.checkboxValue =
                    this.tristate && this.tristateSelectable ? this.values.thirdStateValue : this.values.trueValue;
                break;
            case 'indeterminate':
            case 'force-checked':
                this.checkboxValue = this.values.trueValue;
                this.renderer.setProperty(this.inputElement.nativeElement, 'checked', 'true');
                break;
            default:
                this.checkboxValue =
                    this.tristate && this.tristateSelectable ? this.values.thirdStateValue : this.values.trueValue;
                break;
        }
        this._setState();
        this.onValueChange(this.checkboxValue);
        this._detectChanges();
    }

    /** @hidden handles blur event */
    _onBlur(): void {
        if (typeof this.onTouched === 'function') {
            this.onTouched();
        }
        this.focusChange.emit(false);
    }

    /** @hidden handles focus event */
    _onFocus(): void {
        this.focusChange.emit(true);
    }

    /** @hidden handles click on the label associated with native checkbox input */
    _onLabelClick(event: MouseEvent): void {
        // We have to stop propagation for click events on the input label.
        // By default, when a user clicks on a label element, a generated click event will be
        // dispatched on the associated input element. This will lead to duplicated "click" event dispatched from the component
        event.stopPropagation();

        // If we have display-only mode, stop any possible actions by label click event.
        this._handleDisplayOnlyMode(event);
    }

    /**
     * @hidden
     * Event handler for cases when checkbox was toggled with the help of keyboard.
     * @param event
     */
    _onLabelKeydown(event: Event): void {
        // If we have display-only mode, stop any possible actions by label click event.
        this._handleDisplayOnlyMode(event);
    }

    /** @hidden handles click on the native checkbox input */
    _onInputClick(event: MouseEvent): void {
        // When there's a click event dispatched from the input, we have to catch it, process and then re-dispatch it further.
        // This is needed in order to set the value to the component before any external listeners will receive it.
        // Otherwise checkbox might be out of sync.
        event.stopPropagation();
        if (this.displayOnly) {
            return;
        }
        this.nextValue();
        this.elementRef.nativeElement.dispatchEvent(new MouseEvent(event.type, event));
    }

    /** @hidden */
    private _handleDisplayOnlyMode(event: Event): void {
        if (!this.displayOnly) {
            return;
        }
        event.preventDefault();
        event.stopImmediatePropagation();
    }

    /** @hidden Based on current control value sets new control state. */
    private _setState(): void {
        if (equal(this.checkboxValue, this.values.trueValue)) {
            this.checkboxState = 'checked';
        } else if (equal(this.checkboxValue, this.values.falseValue)) {
            this.checkboxState = 'unchecked';
        } else if (this.tristate && equal(this.checkboxValue, this.values.thirdStateValue)) {
            this.checkboxState = 'indeterminate';
        } else if (!this.checkboxValue) {
            this.checkboxState = 'unchecked';
        }
    }

    /** Method to trigger change detection in component */
    private _detectChanges(): void {
        if (!this._changeDetectorRef['destroyed']) {
            this._changeDetectorRef.detectChanges();
        }
    }
}
