import {
    ChangeDetectorRef,
    ChangeDetectionStrategy,
    Component,
    Input,
    Renderer2,
    Optional,
    Self,
    LOCALE_ID,
    Inject
} from '@angular/core';
import { formatNumber } from '@angular/common';
import { NgControl, NgForm } from '@angular/forms';

import { FormFieldControl } from '../../form-control';
import { StepInputComponent, PlatformStepInputChange } from '../base.step-input';
import { StepInputConfig } from '../step-input.config';

/** Change event object emitted by Platform Number Step Input. */
export class PlatformNumberStepInputChange extends PlatformStepInputChange<NumberStepInputComponent, number> {}

@Component({
    selector: 'fdp-number-step-input',
    templateUrl: 'number-step-input.component.html',
    styleUrls: ['number-step-input.component.scss'],
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
        @Inject(LOCALE_ID) readonly localeId: string
    ) {
        super(_cd, ngControl, ngForm, config, renderer);
    }

    /**@hidden
     * Create change event instance
     */
    createChangeEvent(value: number) {
        const event = new PlatformNumberStepInputChange();
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
        const parsedValue = Number.parseFloat(value);
        return isNaN(parsedValue) ? null : parsedValue;
    }
}
