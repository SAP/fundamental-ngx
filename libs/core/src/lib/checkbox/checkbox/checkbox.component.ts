import {
    AfterViewInit,
    Attribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    Inject,
    Input,
    OnDestroy,
    Optional,
    Output,
    Renderer2,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FD_CHECKBOX_VALUES_DEFAULT, FdCheckboxValues } from './fd-checkbox-values.interface';
import { LIST_ITEM_COMPONENT, ListItemInterface, Nullable } from '@fundamental-ngx/cdk/utils';
import equal from 'fast-deep-equal';
import { Subscription } from 'rxjs';
import { FormStates } from '@fundamental-ngx/cdk/forms';
import { FormItemControl, registerFormItemControl } from '@fundamental-ngx/core/form';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { FD_CHECKBOX_COMPONENT } from '../tokens';

let checkboxUniqueId = 0;

export type FdCheckboxTypes = 'checked' | 'unchecked' | 'indeterminate' | 'force-checked';

@Component({
    selector: 'fd-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
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
    host: { '[attr.tabindex]': '-1' }
})
export class CheckboxComponent implements ControlValueAccessor, AfterViewInit, OnDestroy, FormItemControl {
    /** @hidden */
    @ViewChild('inputElement')
    inputElement: ElementRef<HTMLInputElement>;

    /** @hidden */
    @ViewChild('labelElement')
    labelElement: ElementRef;

    /** Sets the `aria-label` attribute to the element. */
    @Input()
    ariaLabel: Nullable<string>;

    /** Current selection state of the checkbox component */
    @Input()
    set value(value: any) {
        this.writeValue(value);
    }

    get value(): any {
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

    /** @hidden */
    private _subscriptions = new Subscription();

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

    /** @hidden values returned by control. */
    private _values: FdCheckboxValues = { ...FD_CHECKBOX_VALUES_DEFAULT };
    /** Stores current checkbox value. */
    public checkboxValue: any;
    /** Stores current checkbox state. */
    public checkboxState: FdCheckboxTypes;

    /** @hidden Reference to callback provided by FormControl.*/
    public onTouched = (): void => {};
    /** @hidden Reference to callback provided by FormControl.*/
    public onValueChange: (value: any) => void = () => {};

    /** @hidden Used to define if control is in 'indeterminate' state.*/
    get isIndeterminate(): boolean {
        return this.checkboxState === 'indeterminate';
    }

    /** @hidden Used to define if control is in 'checked' / 'unchecked' state. */
    get isChecked(): boolean {
        return this.checkboxState === 'checked' || this.checkboxState === 'force-checked';
    }

    /** @hidden */
    constructor(
        public elementRef: ElementRef<Element>,
        @Attribute('tabIndexValue') public tabIndexValue: number = 0,
        private _changeDetectorRef: ChangeDetectorRef,
        private renderer: Renderer2,
        readonly _contentDensityObserver: ContentDensityObserver,
        @Optional() @Inject(LIST_ITEM_COMPONENT) private _listItemComponent: ListItemInterface
    ) {
        this.tabIndexValue = tabIndexValue;
    }

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
    writeValue(value: any): void {
        this.checkboxValue = value;
        this._setState();
        this._detectChanges();
    }

    /** @hidden ControlValueAccessor interface method - sets onValueChange callback.*/
    registerOnChange(fn: any): void {
        this.onValueChange = fn;
    }

    /** @hidden ControlValueAccessor interface method - sets onTouched callback.*/
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    /** @hidden Called by FormControl - used to disable / enable control.*/
    setDisabledState(disabled: boolean): void {
        this.disabled = disabled;
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
    _onLabelClick(event: Event): void {
        // We have to stop propagation for click events on the input label.
        // By default, when a user clicks on a label element, a generated click event will be
        // dispatched on the associated input element. This will lead to duplicated "click" event dispatched from the component
        event.stopPropagation();
    }

    /** @hidden handles click on the native checkbox input */
    _onInputClick(event: MouseEvent): void {
        // When there's a click event dispatched from the input, we have to catch it, process and then re-dispatch it further.
        // This is needed in order to set the value to the component before any external listeners will receive it.
        // Otherwise checkbox might be out of sync.
        event.stopPropagation();
        this.nextValue();
        this.elementRef.nativeElement.dispatchEvent(new MouseEvent(event.type, event));
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
