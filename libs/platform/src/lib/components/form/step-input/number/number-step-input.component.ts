import { ChangeDetectorRef, ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Optional, Self } from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';

import { FormFieldControl } from '../../form-control';
import { StepInputComponent, PlatformStepInputChange } from '../base.step-input';
import { PlatformStepInputConfig } from '../step-input.config';

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

    constructor(
        protected _cd: ChangeDetectorRef,
        config: PlatformStepInputConfig,
        @Optional() @Self() public ngControl: NgControl,
        @Optional() @Self() public ngForm: NgForm
    ) {
        super(_cd, ngControl, ngForm, config);
    }

    ngOnInit(): void {
        if (this.step == null && typeof this.stepFn !== 'function') {
            throw new Error('Step Input Component: It is required to define either "step" or "stepFn" input');
        }
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }

    createChangeEvent(value: number) {
        const event = new PlatformNumberStepInputChange();
        event.source = this;
        event.payload = value;
        return event;
    }

    formatValue(value: number | null) {
        return value ? value.toPrecision() : '0';
    }

    parseValue(value: string | null) {
        const parsedValue = Number(value);
        return isNaN(parsedValue) ? null : parsedValue;
    }
}
