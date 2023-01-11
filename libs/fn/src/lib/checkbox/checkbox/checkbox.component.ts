import {
    Attribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    forwardRef,
    HostBinding,
    Input,
    OnDestroy,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { KeyUtil } from '@fundamental-ngx/cdk/utils';
import equal from 'fast-deep-equal';
import { SPACE } from '@angular/cdk/keycodes';
import { Subscription } from 'rxjs';
import { FN_CHECKBOX_LABEL } from '../checkbox.tokens';
import { TemplateRefProviderToken } from '@fundamental-ngx/fn/utils';

let checkboxUniqueId = 0;

interface FnCheckboxValues {
    trueValue?: any;
    falseValue?: any;
}

type fnCheckboxTypes = 'checked' | 'unchecked' | 'force-checked';

@Component({
    selector: 'fn-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxComponent),
            multi: true
        }
    ]
})
export class CheckboxComponent implements ControlValueAccessor, OnDestroy {
    /** @hidden */
    @ViewChild('inputLabel')
    inputLabel: ElementRef;

    /** @hidden */
    @ViewChild('labelElement')
    labelElement: ElementRef;

    /** Sets the `aria-label` attribute to the element. */
    @Input()
    ariaLabel = '';

    /** Sets the `aria-labelledby` attribute to the element. */
    @Input()
    ariaLabelledBy = null;

    /** Sets the `aria-describedby` attribute to the element. */
    @Input()
    ariaDescribedBy: string;

    /** sets checkbox tooltip */
    @Input()
    title: string;

    /**
     * If the checkbox is used inside a group.
     * If set to true the control will take the width of the parent container.
     */
    @Input()
    isGroup: boolean;

    /** Sets [id] property of input, binds input with input label using [for] property. */
    @Input()
    inputId = `fn-checkbox-${checkboxUniqueId++}`;

    /** Sets [name] property of input. */
    @Input()
    name: string;

    /** Sets text of control label. */
    @Input()
    label: string;

    /** Allows to disable/enable control. */
    @Input()
    disabled: boolean;

    /** Assigns given class to checkbox label element */
    @Input()
    labelClass: string;

    /** If it is mandatory field */
    @Input()
    required = false;

    @ContentChild(FN_CHECKBOX_LABEL)
    labelTemplateProvider: TemplateRefProviderToken<void>;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** Sets values returned by control. */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('values')
    set _values(checkboxValues: FnCheckboxValues) {
        this.values = { ...this.values, ...checkboxValues };
    }

    /** @hidden */
    @HostBinding('style.position')
    readonly position = 'relative';

    /** @hidden */
    @HostBinding('style.outline')
    readonly outline = 'none';

    /** Values returned by control. */
    public values: FnCheckboxValues = { trueValue: true, falseValue: false };
    /** Stores current checkbox value. */
    public checkboxValue: any;
    /** Stores current checkbox state. */
    public checkboxState: fnCheckboxTypes;
    /** @hidden */
    private _previousState: fnCheckboxTypes;

    /** @hidden Reference to callback provided by FormControl.*/
    public onTouched = (): void => {};
    /** @hidden Reference to callback provided by FormControl.*/
    public onValueChange: (value: any) => void = () => {};

    /** @hidden */
    constructor(
        public elementRef: ElementRef,
        @Attribute('tabIndexValue') public tabIndexValue: number = 0,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.tabIndexValue = tabIndexValue;
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden Used to define if control is in 'checked' / 'unchecked' state. */
    get isChecked(): boolean {
        return this.checkboxState === 'checked' || this.checkboxState === 'force-checked';
    }

    /** @hidden ControlValueAccessor interface
     * - sets new control value
     * - updates control state
     * */
    public writeValue(value: any): void {
        this.checkboxValue = value;
        this._setState();
        this._detectChanges();
    }

    /** @hidden ControlValueAccessor interface method - sets onValueChange callback.*/
    public registerOnChange(fn: any): void {
        this.onValueChange = fn;
    }

    /** @hidden prevent event from propagating */
    public muteKey(event: KeyboardEvent | MouseEvent): void {
        event.stopPropagation();
    }

    /** @hidden ControlValueAccessor interface method - sets onTouched callback.*/
    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    /** @hidden Called by FormControl - used to disable / enable control.*/
    public setDisabledState(disabled: boolean): void {
        this.disabled = disabled;
        this._detectChanges();
    }

    /** @hidden Based on current control state:
     * - sets next control value
     * - emits new control value
     * - updates control state based on new control value
     * */
    public nextValue(previousValue?: fnCheckboxTypes): void {
        switch (previousValue || this.checkboxState) {
            case 'checked':
                this.checkboxValue = this.values.falseValue;
                break;
            case 'unchecked':
                this.checkboxValue = this.values.trueValue;
                break;
            case 'force-checked':
                this.checkboxValue = this.values.trueValue;
                this.inputLabel.nativeElement.checked = true;
                break;
            default:
                this.checkboxValue = this.values.trueValue;
                break;
        }
        this._setState();
        this.onValueChange(this.checkboxValue);
        this._detectChanges();
    }

    /** Space event should be handled separately, when used inside list component and in firefox browser */
    keydownHandler(event: KeyboardEvent): void {
        event.stopPropagation();
        if (KeyUtil.isKeyCode(event, SPACE)) {
            this.nextValue();
            event.preventDefault();
        }
    }

    /** @hidden Based on current control value sets new control state. */
    private _setState(): void {
        if (equal(this.checkboxValue, this.values.trueValue)) {
            this.checkboxState = 'checked';
        } else if (equal(this.checkboxValue, this.values.falseValue)) {
            this.checkboxState = 'unchecked';
        } else if (!this.checkboxValue) {
            this.checkboxState = 'unchecked';
        }
        this._previousState = this.checkboxState;
    }

    /** Method to trigger change detection in component */
    private _detectChanges(): void {
        if (!this._changeDetectorRef['destroyed']) {
            this._changeDetectorRef.detectChanges();
        }
    }
}
