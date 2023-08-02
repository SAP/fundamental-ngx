import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Host,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    Self,
    SkipSelf,
    ViewChild
} from '@angular/core';
import { ControlContainer, NgControl, NgForm } from '@angular/forms';
import { FD_FORM_FIELD, FD_FORM_FIELD_CONTROL, FormStates } from '@fundamental-ngx/cdk/forms';

import { TimePickerComponent } from '@fundamental-ngx/core/time-picker';
import { Placement } from '@fundamental-ngx/core/shared';
import { BaseInput, PlatformFormFieldControl, PlatformFormField } from '@fundamental-ngx/platform/shared';
import deprecated from 'deprecated-decorator';

@Component({
    selector: 'fdp-time-picker',
    templateUrl: './time-picker.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: FD_FORM_FIELD_CONTROL, useExisting: PlatformTimePickerComponent, multi: true }]
})
export class PlatformTimePickerComponent<D> extends BaseInput implements OnInit, AfterViewInit, OnDestroy {
    /**
     * @Input date time object representation
     */
    @Input()
    set value(value: D | null) {
        super.setValue(value);
    }
    get value(): D | null {
        return super.getValue();
    }

    /**
     * @Input date time object representation
     */
    @Input()
    time: D;

    /** @Input Whether to show spinner buttons */
    @Input()
    spinnerButtons = true;

    /** @deprecated
     * Meridian is deprecated. Use displayFormat and parseFormat inputs or
     * DateTimeFormats.display.timeInput and DateTimeFormats.parse.timeInput instead.
     * @Input When set to false, uses the 24 hour clock (hours ranging from 0 to 23).
     * Default value based on the current locale format option
     */
    @Input()
    @deprecated(
        'Meridian is deprecated. Use displayFormat and parseFormat inputs or DateTimeFormats.display.timeInput and DateTimeFormats.parse.timeInput instead.'
    )
    meridian: boolean;

    /**
     * @Input When set to false, hides the input for seconds.
     * Default value based on the current locale format option
     * */
    @Input()
    displaySeconds: boolean;

    /**
     * @Input When set to false, hides the input for minutes.
     * Default value based on the current locale format option
     * */
    @Input()
    displayMinutes: boolean;

    /**
     * @Input When set to false, hides the input for hours.
     * Default value based on the current locale format option
     * */
    @Input()
    displayHours: boolean;

    /** @Input Default time picker placeholder which is set dependant on the hours, minutes and seconds.
     * Otherwise It can be set to a default value
     */
    @Input()
    placeholder: string;

    /** Aria label for the time picker input. */
    @Input()
    timePickerInputLabel: string;

    /** Whether a null input is considered valid(success). */
    @Input()
    allowNull = true;

    /** Defines if time component should be used with tablet mode */
    @Input()
    tablet = false;

    /**
     *  The placement of the popover. It can be one of: top, top-start, top-end, bottom,
     *  bottom-start, bottom-end, right, right-start, right-end, left, left-start, left-end.
     */
    @Input()
    placement: Placement = 'bottom-start';

    /**
     *  The state of the form control - applies css classes.
     *  Can be `success`, `error`, `warning`, `information` or blank for default.
     */
    @Input()
    set state(state: FormStates | undefined) {
        super.state = state;
    }

    get state(): FormStates {
        if (this.timePickerComponent && this.timePickerComponent._isInvalidTimeInput) {
            // if any other error from core timePicker
            return 'error';
        }
        return super.state;
    }

    /**
     * Whether AddOn Button should be focusable
     * @default true
     */
    @Input()
    buttonFocusable = true;

    /** Whether to validate the time picker input. */
    @Input()
    useValidation = true;

    /**
     * @Input when set to true, time inputs won't allow to have 1 digit
     * for example 9 will become 09
     * but 12 will be kept as 12.
     */
    @Input()
    keepTwoDigitsTime = false;

    /**
     * Display format option to customize time format in input control.
     * Must be a format option that is understandable by DatetimeAdapter.
     */
    @Input()
    displayFormat: unknown;

    /**
     * Parse format option to customize time format in input control.
     * Must be a format option that is understandable by DatetimeAdapter.
     */
    @Input()
    parseFormat: unknown;

    /** Event emitted when the state of the isOpen property changes. */
    @Output()
    readonly isOpenChange = new EventEmitter<boolean>();

    /** @hidden */
    @ViewChild(TimePickerComponent)
    timePickerComponent: TimePickerComponent<D>;

    /** @hidden */
    constructor(
        cd: ChangeDetectorRef,
        elementRef: ElementRef,
        @Optional() @Self() ngControl: NgControl,
        @Optional() @SkipSelf() controlContainer: ControlContainer,
        @Optional() @SkipSelf() ngForm: NgForm,
        @Optional() @SkipSelf() @Host() @Inject(FD_FORM_FIELD) formField: PlatformFormField,
        @Optional() @SkipSelf() @Host() @Inject(FD_FORM_FIELD_CONTROL) formControl: PlatformFormFieldControl
    ) {
        super(cd, elementRef, ngControl, controlContainer, ngForm, formField, formControl);
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }

    /**
     * Method that handles changes when popover is opened or closed.
     */
    handleOpenChange(open: boolean): void {
        this.isOpenChange.emit(open);
    }

    /**
     * logic to handle validation from both platform forms and core datetiimepicker
     * @param value inputted
     */
    handleTimeChange(value: D): void {
        if (this.timePickerComponent) {
            if (this.timePickerComponent._isInvalidTimeInput) {
                this.state = 'error';
            } else {
                this.state = !this.timePickerComponent.time && !this.allowNull ? 'error' : undefined;
            }
            this.value = value;
            this.stateChanges.next('time picker: handleTimeInputChange');
        }
        this.onTouched();
    }
}
