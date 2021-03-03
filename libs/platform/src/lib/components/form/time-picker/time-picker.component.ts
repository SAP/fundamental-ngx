import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';

import { BaseInput } from '../base.input';
import { Placement, TimePickerComponent } from '@fundamental-ngx/core';
import { FormFieldControl, Status } from '../form-control';

@Component({
    selector: 'fdp-time-picker',
    templateUrl: './time-picker.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: FormFieldControl, useExisting: PlatformTimePickerComponent, multi: true }]
})
export class PlatformTimePickerComponent<D> extends BaseInput implements OnInit, AfterViewInit, OnDestroy {

    /**
     * @Input date time object representation
     */
    @Input()
    get value(): D {
        return super.getValue();
    }

    set value(value: D) {
        super.setValue(value);
    }

    /**
     * @Input date time object representation
     */
    @Input()
    time: D;

    /** @Input Whether to show spinner buttons */
    @Input()
    spinnerButtons = true;

    /**
     * @Input When set to false, uses the 24 hour clock (hours ranging from 0 to 23).
     * Default value based on the current locale format option
     */
    @Input()
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
    timePickerInputLabel = 'Time picker input';

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

    @Input()
    set state(state: Status) {
        this._state = state ? state : 'default';
    }

    get state(): Status {
        if (this.timePickerComponent && this.timePickerComponent.isInvalidTimeInput) {
            // if any other error from core timePicker
            return 'error';
        }
        if (this.status) {
            return this.status;
        }
        return this._state;
    }

    /**
     * Whether AddOn Button should be focusable, set to true by default
     */
    @Input()
    buttonFocusable = true;

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

    @ViewChild(TimePickerComponent)
    timePickerComponent: TimePickerComponent<D>;

    /**
     * Method that handles changes when popover is opened or closed.
     */
    handleOpenChange(open: boolean): void {
        this.isOpenChange.emit(open);
    };

    /**
     * logic to handle validation from both platform forms and core datetiimepicker
     * @param value inputted
     */
    handleTimeChange(value: D): void {
        if (this.timePickerComponent) {
            if (this.timePickerComponent.isInvalidTimeInput) {
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
