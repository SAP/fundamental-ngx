import {
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    Component,
    Input,
    Renderer2,
    Optional,
    Self,
    LOCALE_ID,
    Inject,
    ViewEncapsulation
} from '@angular/core';
import { formatNumber } from '@angular/common';
import { NgControl, NgForm } from '@angular/forms';

import { RtlService } from '@fundamental-ngx/core';

import { FormFieldControl } from '../../form-control';
import { StepInputComponent, StepInputChangeEvent } from '../base.step-input';
import { StepInputConfig } from '../step-input.config';

/** Change event object emitted by Platform Number Step Input. */
export class NumberStepInputChangeEvent extends StepInputChangeEvent<NumberStepInputComponent, number> {}

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

    /**@hidden */
    constructor(
        protected _cd: ChangeDetectorRef,
        config: StepInputConfig,
        @Optional() @Self() public ngControl: NgControl,
        @Optional() @Self() public ngForm: NgForm,
        renderer: Renderer2,
        rtlService: RtlService,
        @Inject(LOCALE_ID) readonly localeId: string
    ) {
        super(_cd, ngControl, ngForm, config, renderer, rtlService);
    }

    /**@hidden
     * Create change event instance
     */
    createChangeEvent(value: number) {
        const event = new NumberStepInputChangeEvent();
        event.source = this;
        event.payload = value;
        return event;
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
