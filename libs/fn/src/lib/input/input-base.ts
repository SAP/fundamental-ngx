/**
 * This abstract class contains common functionality that will be used by many different input components, such as the input, text area,
 * select, multi-input etc.
 */

import { Directive, Input } from '@angular/core';

export type InputState = 'positive' | 'critical' | 'negative' | 'info';

@Directive()
export abstract class InputBase {
    /** Placeholder for the input. */
    @Input()
    placeholder: string;

    /** Whether or not this input is the 'display' type. */
    @Input()
    display = false;

    /** Whether or not this input is disabled. */
    @Input()
    fnDisabled = false;

    /** Whether or not this input is readonly. */
    @Input()
    fnReadonly = false;

    /** The state of the input. */
    @Input()
    state: InputState;
}
