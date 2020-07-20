import { ChangeDetectorRef, Input, Output } from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';

import { BaseInput } from '../base.input';
import { PlatformStepInputConfig } from './step-input.config';

/** Change event object emitted by Platform Step Input component */
export class PlatformStepInputChange<T extends StepInputComponent = StepInputComponent, K = number> {
    /** The source Step Input of the event. */
    source: T;
    /** The new value of a control. */
    payload: K;
}

export abstract class StepInputComponent extends BaseInput {
    /** Sets input value */
    @Input()
    get value(): number {
        return super.getValue();
    }

    set value(value: number) {
        super.setValue(value);
    }

    /** Sets minimum value boundary */
    @Input()
    min: number;

    /** Sets maximum value boundary */
    @Input()
    max: number;

    /** Sets input step value */
    @Input()
    step: number = 1;

    /** Custom function to calculate step dynamically */
    @Input()
    stepFn: (value: number, action: 'increase' | 'decrease') => number;

    /** Sets largeStep multiplier */
    @Input()
    largerStep: number = 2;

    /** Hides -/+ icons and shows labels */
    @Input()
    showLabels: boolean = false;

    /** Horizontally aligns value inside input */
    @Input()
    align: 'left' | 'center' | 'right';

    /**
     * ARIA label for increment button
     */
    @Input()
    incrementLabel: string;

    /**
     * ARIA label for decrement button
     */
    @Input()
    decrementLabel: string;

    /**
     * ARIA label for input element
     */
    @Input()
    ariaLabel: string;

    /**
     * ARIA labelledby for input element
     */
    @Input()
    ariaLabelledby: string;

    /** @hidden */
    get compact() {
        return this.contentDensity === 'compact';
    }

    constructor(
        protected _cd: ChangeDetectorRef,
        public ngControl: NgControl,
        public ngForm: NgForm,
        protected config: PlatformStepInputConfig
    ) {
        super(_cd, ngControl, ngForm);
        // Initiate default options
        this.decrementLabel = this.config.decrementLabel;
        this.incrementLabel = this.config.incrementLabel;
        this.contentDensity = this.config.contentDensity;
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }

    /** Increase value method */
    increase(step = this._getStepValue('increase')) {
        if (step == null) {
        }
        const value = this.value + step;
        this.value = Math.min(value, this.max);
    }

    /** Decrease value method */
    decrease(step = this._getStepValue('decrease')) {
        const value = this.value - step;
        this.value = Math.max(value, this.min);
    }

    /** Increase value by large step */
    largeStepIncrease() {
        const step = this._getStepValue('increase') * this.largerStep;
        this.increase(step);
    }

    /** Decrease value by large step */
    largeStepDecrease() {
        const step = this._getStepValue('decrease') * this.largerStep;
        this.decrease(step);
    }

    abstract createChangeEvent(): PlatformStepInputChange;

    /**@hidden get step value base either on "stepFn" or "step" */
    private _getStepValue(action: 'increase' | 'decrease'): number {
        if (typeof this.stepFn === 'function') {
            return this.stepFn(this.value, action);
        }
        return this.step;
    }
}
