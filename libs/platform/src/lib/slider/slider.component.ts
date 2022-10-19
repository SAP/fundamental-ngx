import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Host,
    Input,
    Optional,
    Output,
    Self,
    SkipSelf,
    ViewEncapsulation
} from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';

import { SliderTickMark } from '@fundamental-ngx/core/slider';
import { BaseInput, FormField, FormFieldControl } from '@fundamental-ngx/platform/shared';

export type SliderCustomValue = Omit<SliderTickMark, 'position'>;

export type SliderControlValue = number | number[] | SliderTickMark | SliderTickMark[];

/** Switch change event instance */
export class SliderChangeEvent<T extends SliderControlValue = any> {
    /** The source Slider of the event. */
    source: SliderComponent;
    /** The new `payload` value of the slider. */
    payload: T;
}

@Component({
    selector: 'fdp-slider',
    templateUrl: './slider.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    providers: [{ provide: FormFieldControl, useExisting: SliderComponent, multi: true }]
})
export class SliderComponent extends BaseInput {
    /** User's custom classes */
    @Input()
    class: string;

    /** Minimum value. */
    @Input()
    min = 0;

    /** Maximum value. */
    @Input()
    max = 100;

    /** Step value. */
    @Input()
    step = 1;

    /** Jump value. */
    @Input()
    jump = 10;

    /** Put a label on every N-th tickmark. */
    @Input()
    tickmarksBetweenLabels = 1;

    /**
     * Slider mode.
     * Options include: 'single' | 'range'
     * The default is set to 'single'
     */
    @Input()
    mode: 'single' | 'range' = 'single';

    /** Toggles the visibility of tick marks. */
    @Input()
    showTicks = false;

    /** Toggles the visibility of tick mark labels. Must be used in conjunction with 'showTicks' */
    @Input()
    showTicksLabels = false;

    /** Array of custom values to use for Slider. */
    @Input()
    customValues: SliderCustomValue[] = [];

    /** Tooltip can be two types, 'readonly' to display value and 'editable' to make the ability to set and display value. */
    @Input()
    tooltipMode: 'readonly' | 'editable';

    /** Hides display of colored progress bar. */
    @Input()
    hideProgressBar = false;
    /**
     * Event fired when the state of the slider changes.
     * *$event* can be used to retrieve the new state of the slider.
     */
    @Output()
    readonly sliderChange = new EventEmitter<SliderChangeEvent>();

    /** @hidden */
    constructor(
        cd: ChangeDetectorRef,
        @Optional() @Self() ngControl: NgControl,
        @Optional() @SkipSelf() ngForm: NgForm,
        @Optional() @SkipSelf() @Host() formField: FormField,
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>
    ) {
        super(cd, ngControl, ngForm, formField, formControl);
    }

    /** value for slider control */
    @Input()
    set value(selectValue: any) {
        this.setValue(selectValue);
    }
    get value(): any {
        return this.getValue();
    }

    /** @hidden */
    _onModelChange(modelValue: SliderControlValue): void {
        this._emitChangeEvent(modelValue);
        this.onTouched();
        this.stateChanges.next('Slider: onValueChange');
    }

    /** @hidden
     * Method to emit change event
     */
    private _emitChangeEvent(modelValue: SliderControlValue): void {
        const event = new SliderChangeEvent();
        event.source = this;
        event.payload = modelValue;

        // setting value, it will call setValue()
        this.value = modelValue;
        this.sliderChange.emit(event);
    }
}
