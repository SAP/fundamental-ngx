import {
    AfterViewInit,
    Attribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Host,
    Inject,
    Input,
    Optional,
    Output,
    Self,
    SkipSelf,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlContainer, NgControl, NgForm } from '@angular/forms';
import { FD_FORM_FIELD, FD_FORM_FIELD_CONTROL } from '@fundamental-ngx/cdk/forms';

import { FdCheckboxValues, CheckboxComponent as FdCheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { BaseInput, PlatformFormFieldControl, PlatformFormField } from '@fundamental-ngx/platform/shared';

/** Change event object emitted by Platform Checkbox. */
export class PlatformCheckboxChange {
    /** The source Checkbox of the event. */
    source: CheckboxComponent;
    /**
     * The new `checked` value of the checkbox.
     * possible value: true/false and array of checkbox values.
     */
    checked: any;
}

let nextUniqueId = 0;

@Component({
    selector: 'fdp-checkbox',
    templateUrl: './checkbox.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: FD_FORM_FIELD_CONTROL, useExisting: forwardRef(() => CheckboxComponent), multi: true }]
})
export class CheckboxComponent extends BaseInput implements AfterViewInit {
    /**
     * Checkbox tooltip
     */
    @Input()
    title: string;

    /** Sets label for checkbox. */
    @Input()
    label: string;

    /** true when checkbox has indeterminate state */
    @Input()
    tristate = false;

    // this is undesired to have "checked" input instead of "value"
    // but it was done this way initially and we have to keep this in order to not break anything
    /**
     * Checked state of the checkbox control.
     */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('checked')
    set value(selectValue: any) {
        this.setValue(selectValue);
    }
    get value(): any {
        return this.getValue();
    }

    /** when true indeterminate state can be selected */
    @Input()
    tristateSelectable = false;

    /** Values returned by control. */
    @Input()
    values: FdCheckboxValues;

    /** Whether checkbox should be rendered standalone (without any text). */
    @Input()
    standalone = false;

    /**
     * Emitting checked event for non-form checkbox
     */
    @Output()
    readonly checkedChange = new EventEmitter<any>();

    /**
     * @hidden
     * is needed for the checkbox group to access component values
     */
    @ViewChild(FdCheckboxComponent)
    coreCheckbox: FdCheckboxComponent;

    /** @hidden */
    constructor(
        elementRef: ElementRef,
        @Optional() @Self() ngControl: NgControl,
        @Optional() @SkipSelf() controlContainer: ControlContainer,
        @Optional() @SkipSelf() ngForm: NgForm,
        @Optional() @SkipSelf() @Host() @Inject(FD_FORM_FIELD) formField: PlatformFormField,
        @Optional() @SkipSelf() @Host() @Inject(FD_FORM_FIELD_CONTROL) formControl: PlatformFormFieldControl,
        protected _changeDetector: ChangeDetectorRef,
        @Attribute('tabIndexValue') public tabIndexValue: number = 0
    ) {
        super(_changeDetector, elementRef, ngControl, controlContainer, ngForm, formField, formControl);
        // necessary to fulfill baseInput check.
        // case: fdp-checkbox passed in declarative fdp-checkbox-group without id and name.
        this.name = `fdp-checkbox-${nextUniqueId++}`;
        this.tabIndexValue = tabIndexValue;
    }
    /** update controller on checkbox state change */
    public onModelChange(value: any): void {
        this.value = value;
        this._emitChangeEvent();
        this.stateChanges.next('checkbox: onModelChange');
    }

    /**
     * Method to emit change event
     */
    private _emitChangeEvent(): void {
        this.checkedChange.emit(this.value);

        const event = new PlatformCheckboxChange();
        event.source = this;
        event.checked = this.value;
    }
}
