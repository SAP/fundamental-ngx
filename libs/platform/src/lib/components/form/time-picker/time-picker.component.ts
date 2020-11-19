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
import { Placement } from 'popper.js';

import { BaseInput } from '../base.input';
import { TimeObject, TimePickerComponent } from '@fundamental-ngx/core';
import { FormFieldControl, Status } from '../form-control';

@Component({
    selector: 'fdp-time-picker',
    templateUrl: './time-picker.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: FormFieldControl, useExisting: PlatformTimePickerComponent, multi: true }]
})
export class PlatformTimePickerComponent extends BaseInput implements OnInit, AfterViewInit, OnDestroy {

    /**
     * value for time in string
     */
    @Input()
    get value(): TimeObject {
        return super.getValue();
    }

    set value(value: TimeObject) {
        super.setValue(value);
    }

    /**
     * @Input An object that contains three integer properties: 'hour' (ranging from 0 to 23),
     * 'minute' (ranging from 0 to 59), and 'second' (ranging from 0 to 59). This is the model the component consumes. Example:
     *
     * ```json
     * { hour: 12, minute: 0, second: 0 }
     * ```
     */
    @Input()
    time: TimeObject = { hour: 0, minute: 0, second: 0 };

    /** @Input When set to true, uses the 24 hour clock (hours ranging from 0 to 23)
     * and does not display a period control. */
    @Input()
    meridian = false;

    /** @Input Whether to show spinner buttons */
    @Input()
    spinnerButtons = true;

    /** @Input When set to false, hides the input for seconds. */
    @Input()
    displaySeconds = true;

    /** @Input When set to false, hides the input for minutes. */
    @Input()
    displayMinutes = true;

    /** @Input When set to false, hides the input for hours. */
    @Input()
    displayHours = true;

    /** @Input Default time picker placeholder which is set dependant on the hours, minutes and seconds.
     * Otherwise It can be set to a default value
     */
    @Input()
    placeholder: string = this.getPlaceholder();

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

    /** Event emitted when the state of the isOpen property changes. */
    @Output()
    isOpenChange = new EventEmitter<boolean>();

    @ViewChild(TimePickerComponent)
    timePickerComponent: TimePickerComponent;

    /**
     * @hidden
     * The state of the form control - applies css classes.
     * Can be `success`, `error`, `warning`, `information` or blank for default.
     */
    private _state: Status;

    /**
     * Method that handles changes when popover is opened or closed.
     */
    handleOpenChange(open: boolean): void {
        this.isOpenChange.emit(open);
    };

    /**
     * @hidden
     * logic to handle validation from both platform forms and core datetiimepicker
     * @param value inputted
     */
    handleTimeChange(value: TimeObject): void {
        if (this.timePickerComponent) {
            if (this.timePickerComponent.isInvalidTimeInput) {
                this.state = 'error';
            } else {
                if (!this.timePickerComponent.time && !this.allowNull) {
                    this.state = 'error'; // null value in not allowNull should throw error
                } else {
                    this.state = undefined; // resetting to default state
                }
            }
            this.value = value;
            this.stateChanges.next('time picker: handleTimeInputChange');
        }
        this.onTouched();
    }

    /** @hidden */
    getPlaceholder(): string {
        let retVal = '';
        if (this.displayHours) {
            retVal = retVal + 'hh';
        }
        if (this.displayMinutes) {
            retVal = retVal + ':mm';
        }
        if (this.displaySeconds) {
            retVal = retVal + ':ss';
        }
        if (this.meridian) {
            retVal = retVal + ' am/pm';
        }

        return retVal;
    }
}
