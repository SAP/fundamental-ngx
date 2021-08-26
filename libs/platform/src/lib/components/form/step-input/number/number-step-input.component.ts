import {
    ChangeDetectionStrategy,
    Component,
    Input,
    Renderer2,
    LOCALE_ID,
    Inject,
    ViewEncapsulation,
    ChangeDetectorRef,
    Optional,
    Self,
    SkipSelf,
    Host
} from '@angular/core';
import { formatNumber } from '@angular/common';
import { NgForm, NgControl } from '@angular/forms';

import { RtlService } from '@fundamental-ngx/core';

import { FormFieldControl } from '../../form-control';
import { StepInputComponent, StepInputChangeEvent } from '../base.step-input';
import { StepInputConfig } from '../step-input.config';
import { FormField } from '../../form-field';

/** Change event object emitted by Platform Number Step Input. */
export class NumberStepInputChangeEvent extends StepInputChangeEvent<NumberStepInputComponent, number> {}

/**
 * Fundamental number-step-input component
 *
 * Example of usage
 * ```html
 * <fdp-number-step-input
 *   name="number"
 *   [value]="value"
 *   (valueChange)="onValueChange($event)"
 * ></fdp-number-step-input>
 * ```
 *
 * */
@Component({
    selector: 'fdp-number-step-input',
    templateUrl: 'number-step-input.component.html',
    styleUrls: ['number-step-input.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        { provide: FormFieldControl, useExisting: NumberStepInputComponent, multi: true },
        { provide: StepInputComponent, useExisting: NumberStepInputComponent }
    ]
})
export class NumberStepInputComponent extends StepInputComponent {
    /** Set description */
    @Input() description: string;

    /** @hidden */
    constructor(
        cd: ChangeDetectorRef,
        @Optional() @Self() ngControl: NgControl,
        @Optional() @SkipSelf() ngForm: NgForm,
        @Optional() @SkipSelf() @Host() formField: FormField,
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>,
        config: StepInputConfig,
        renderer: Renderer2,
        @Optional() rtlService: RtlService,
        @Inject(LOCALE_ID) readonly localeId: string
    ) {
        super(cd, ngControl, ngForm, formField, formControl, config, renderer, rtlService);
    }

    /**@hidden
     * Create change event instance
     */
    createChangeEvent(value: number): NumberStepInputChangeEvent {
        return new NumberStepInputChangeEvent(this, value);
    }

    /**@hidden
     * Format value taking into account LOCALE_ID
     */
    formatValue(value: number | null): string {
        const precision = this.precision;
        const digitsInfo = !isNaN(precision) && `1.${precision}-${precision}`;
        return formatNumber(value || 0, this.localeId, digitsInfo);
    }

    /**@hidden
     * In order to avoid issues trying to parse formatted number
     * (potentially specific for each local)
     * we have to simplify number format once it's in focus mode.
     * In this case we deal with a regular float number
     */
    formatValueInFocusMode(value: number | null): string {
        const precision = this.precision;
        value = value || 0;
        if (!isNaN(precision)) {
            return value.toFixed(precision);
        }
        return value.toString(10);
    }

    /**@hidden
     * Used to parse entered value
     */
    parseValueInFocusMode(value: string | null): number | null {
        // if user leaves input empty we should consider it as '0' by default
        value = value === '' ? '0' : value;
        const parsedValue = Number.parseFloat(value);
        return isNaN(parsedValue) ? null : parsedValue;
    }
}
