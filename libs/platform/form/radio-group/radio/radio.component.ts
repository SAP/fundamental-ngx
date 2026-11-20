import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgTemplateOutlet } from '@angular/common';
import { RadioButtonComponent as CoreRadioButtonComponent } from '@fundamental-ngx/core/radio';
import { BaseInput } from '@fundamental-ngx/platform/shared';

let uniqueId = 0;

@Component({
    selector: 'fdp-radio-button',
    templateUrl: './radio.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CoreRadioButtonComponent, FormsModule, NgTemplateOutlet]
})
/**
 * Implements the structural shape of CDK's `FocusableOption` (notably `focus()`) so it can drive a
 * `FocusKeyManager`. It intentionally does NOT declare `implements FocusableOption`: `disabled` is a
 * `ModelSignal<boolean>` (inherited from `BaseInput`), which is not assignable to the interface's
 * optional plain `disabled?: boolean`. The radio group supplies a `skipPredicate` that calls
 * `disabled()` so disabled-skipping keyboard nav is preserved.
 */
export class RadioButtonComponent extends BaseInput implements AfterViewInit {
    /** sets radio button tooltip */
    @Input()
    title: string;

    /**
     * Includes the Radio in the page tab sequence.
     */
    @Input()
    tabIndex = -1;

    /** used for radio button creation if list value present */
    @Input()
    forceRender = false;

    /** reference of template */
    @ViewChild('renderer')
    renderer: TemplateRef<any>;

    /** click event to emit */
    @Output()
    readonly checked: EventEmitter<RadioButtonComponent> = new EventEmitter();

    /** Access radio button child element passed as content of radio button group */
    @ViewChild(CoreRadioButtonComponent, { static: false })
    private coreRadioButton: CoreRadioButtonComponent;

    /** @hidden */
    _currentValue: any;

    /** @hidden Radio checked status */
    _isChecked = false;

    /** @hidden */
    constructor() {
        super();

        // @hidden have to set default initial values as base class has check and throws error
        this.id = `fdp-radio-id-${uniqueId}`;
        this.name.set(`fdp-radio-name-${uniqueId}`);
        uniqueId++;
    }

    /** @hidden */
    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }

    /** @hidden */
    _valueChange(value: any, emitEvent = false): void {
        if (this.disabled()) {
            emitEvent = false;
        }

        this._currentValue = value;
        this._isChecked = this._currentValue === super.getValue();
        if (this._isChecked && emitEvent) {
            this.checked.emit(this);
        }
        this.tabIndex = this._isChecked ? 0 : -1;
        this.detectChanges();
        if (emitEvent) {
            this.touch.emit();
        }
    }

    /** method for cdk FocusKeymanager */
    focus(): void {
        this.coreRadioButton?.inputElement.nativeElement.focus();
    }

    /** method to select radio button */
    select(): void {
        this._valueChange(super.getValue());
    }

    /** method to uncheck radio button */
    unselect(): void {
        this._valueChange(undefined);
    }

    /** Setting tabIndex for radio accessibility */
    setTabIndex(index: 0 | -1): void {
        this.tabIndex = index;
        this.markForCheck();
    }

    /**
     * @hidden
     * Applies a value coming from the `value` model. For the radio button the model value is the
     * button's own selection value, routed through `_valueChange()` to run the selection logic that
     * CVA `writeValue()` used to trigger.
     */
    protected _applyValue(value: any): void {
        this._valueChange(value);
    }

    /**
     * @hidden
     * For the radio button, the `value` model is the button's own identity value (bound via
     * `[value]="..."`), NOT the group's selected value. So applying a model value simply stores it
     * as `_value` — matching the historical `set value` behavior — without running the selection
     * logic that CVA `writeValue()` triggers through `_valueChange()`.
     */
    protected _applyModelValue(modelValue: any): void {
        this._value = modelValue;
    }
}
