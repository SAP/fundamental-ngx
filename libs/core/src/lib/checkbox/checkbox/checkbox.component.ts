import {
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
    OnInit,
    Optional,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FdCheckboxValues } from './fd-checkbox-values.interface';
import { Platform } from '@angular/cdk/platform';
import {
    LIST_ITEM_COMPONENT,
    ListItemInterface,
    compareObjects,
    KeyUtil,
    ContentDensityService
} from '@fundamental-ngx/core/utils';
import { SPACE } from '@angular/cdk/keycodes';
import { Subscription } from 'rxjs';
import { FormStates } from '@fundamental-ngx/core/shared';

let checkboxUniqueId = 0;

export type fdCheckboxTypes = 'checked' | 'unchecked' | 'indeterminate' | 'force-checked';

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
        }
    ],
    host: { '[attr.tabindex]': '-1' }
})
export class CheckboxComponent implements ControlValueAccessor, OnInit, OnDestroy {
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

    /** Sets [id] property of input, binds input with input label using [for] property. */
    @Input()
    inputId = `fd-checkbox-${checkboxUniqueId++}`;

    /** State of control, changes visual appearance of control. */
    @Input()
    state: FormStates;

    /** Sets [name] property of input. */
    @Input()
    name: string;

    /** Sets text of control label. */
    @Input()
    label: string;

    /** Allows to disable/enable control. */
    @Input()
    disabled: boolean;

    /** Allows to minimize control to compact mode. */
    @Input()
    compact?: boolean;

    /** Enables controls third state. */
    @Input()
    tristate: boolean;

    /** Allows to prevent user from manually selecting controls third state. */
    @Input()
    tristateSelectable = true;

    /** Assigns given class to checkbox label element */
    @Input()
    labelClass: string;

    /** If it is mandatory field */
    @Input()
    required = false;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** Sets values returned by control. */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('values')
    set _values(checkboxValues: FdCheckboxValues) {
        this.values = { ...this.values, ...checkboxValues };
    }

    /** @hidden */
    @HostBinding('style.position')
    readonly position = 'relative';

    /** @hidden */
    @HostBinding('style.outline')
    readonly outline = 'none';

    /** Emits event on focus change */
    @Output() focusChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Values returned by control. */
    public values: FdCheckboxValues = { trueValue: true, falseValue: false, thirdStateValue: null };
    /** Stores current checkbox value. */
    public checkboxValue: any;
    /** Stores current checkbox state. */
    public checkboxState: fdCheckboxTypes;
    /** @hidden */
    private _previousState: fdCheckboxTypes;

    /** @hidden Reference to callback provided by FormControl.*/
    public onTouched = () => {};
    /** @hidden Reference to callback provided by FormControl.*/
    public onValueChange: (value: any) => void = () => {};

    /** @hidden */
    constructor(
        public elementRef: ElementRef,
        @Attribute('tabIndexValue') public tabIndexValue: number = 0,
        private _platform: Platform,
        private _changeDetectorRef: ChangeDetectorRef,
        @Optional() private _contentDensityService: ContentDensityService,
        @Optional() @Inject(LIST_ITEM_COMPONENT) private _listItemComponent: ListItemInterface
    ) {
        this.tabIndexValue = tabIndexValue;
    }

    /** @hidden */
    ngOnInit(): void {
        if (this.compact === undefined && this._contentDensityService) {
            this._subscriptions.add(
                this._contentDensityService._contentDensityListener.subscribe((density) => {
                    this.compact = density !== 'cozy';
                    this._changeDetectorRef.markForCheck();
                })
            );
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden Used to define if control is in 'indeterminate' state.*/
    get isIndeterminate(): boolean {
        return this.checkboxState === 'indeterminate';
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

    /** @hidden Updates checkbox Indeterminate state on mouse click on IE11 */
    public checkByClick(event: MouseEvent): void {
        this._nextValueEvent(true, event);
        this.muteKey(event);
    }

    /** @hidden Updates checkbox Indeterminate state on space bar key on IE11 */
    public checkByKey(event: KeyboardEvent): void {
        if (this._isSpaceBarEvent(event) && this._platform.TRIDENT) {
            this._nextValueEvent();
            this.muteKey(event);
        }
    }

    /** @hidden Based on current control state:
     * - sets next control value
     * - emits new control value
     * - updates control state based on new control value
     * */
    public nextValue(previousValue?: fdCheckboxTypes): void {
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
                this.inputLabel.nativeElement.checked = true;
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

    /** Space event should be handled separately, when used inside list component and in firefox browser */
    handleInputKeyUp(event: KeyboardEvent): void {
        event.stopPropagation();
        if (this._listItemComponent && this._platform.FIREFOX && KeyUtil.isKeyCode(event, SPACE)) {
            event.preventDefault();
        }
    }

    /** Handles blur event */
    onBlur(): void {
        if (typeof this.onTouched === 'function') {
            this.onTouched();
        }
        this.focusChange.emit(false);
    }
    /** Handles focus event */
    onFocus(): void {
        this.focusChange.emit(true);
    }

    /** @hidden Based on current control value sets new control state. */
    private _setState(): void {
        if (this._compare(this.checkboxValue, this.values.trueValue)) {
            this.checkboxState = 'checked';
        } else if (this._compare(this.checkboxValue, this.values.falseValue)) {
            this.checkboxState = 'unchecked';
        } else if (this.tristate && this._compare(this.checkboxValue, this.values.thirdStateValue)) {
            this.checkboxState = 'indeterminate';
        } else if (!this.checkboxValue) {
            this.checkboxState = 'unchecked';
        }
        this._previousState = this.checkboxState;
    }

    /** @hidden */
    private _nextValueEvent(triggeredByClick?: boolean, event?: MouseEvent): void {
        if (
            this._platform.TRIDENT &&
            this._previousState === 'indeterminate' &&
            this.checkboxState === 'indeterminate'
        ) {
            this.checkboxState = 'force-checked';
            this._detectChanges();
            /** Prevents from keeping the old value */
            if (triggeredByClick) {
                this.nextValue('force-checked');
                if (event) {
                    this.muteKey(event);
                    event.preventDefault();
                }
            }
        }
    }

    /** @hidden Compares values */
    private _compare(val1: any, val2: any): boolean {
        return typeof val1 === 'object' ? compareObjects(val1, val2) : val1 === val2;
    }

    /** @hidden Determines event source based on key code */
    private _isSpaceBarEvent(event: KeyboardEvent): boolean {
        return KeyUtil.isKeyCode(event, SPACE);
    }

    /** Method to trigger change detection in component */
    private _detectChanges(): void {
        if (!this._changeDetectorRef['destroyed']) {
            this._changeDetectorRef.detectChanges();
        }
    }
}
