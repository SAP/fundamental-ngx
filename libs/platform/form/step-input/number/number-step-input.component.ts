import { formatNumber } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { FD_FORM_FIELD_CONTROL } from '@fundamental-ngx/cdk/forms';

import { OnlyDigitsDirective } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    ContentDensityModule,
    ContentDensityObserver,
    contentDensityObserverProviders
} from '@fundamental-ngx/core/content-density';
import { FormInputMessageGroupComponent, FormMessageComponent } from '@fundamental-ngx/core/form';
import { StepInputChangeEvent, StepInputComponent } from '../base.step-input';
import { StepInputControlDirective } from '../step-input-control.directive';
import { StepInputDecrementDirective } from '../step-input-decrement.directive';
import { StepInputIncrementDirective } from '../step-input-increment.directive';

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
    styleUrl: 'number-step-input.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        { provide: FD_FORM_FIELD_CONTROL, useExisting: NumberStepInputComponent, multi: true },
        { provide: StepInputComponent, useExisting: NumberStepInputComponent },
        contentDensityObserverProviders()
    ],
    imports: [
        FormInputMessageGroupComponent,
        ButtonComponent,
        StepInputDecrementDirective,
        StepInputControlDirective,
        OnlyDigitsDirective,
        StepInputIncrementDirective,
        FormMessageComponent,
        ContentDensityModule
    ]
})
export class NumberStepInputComponent extends StepInputComponent {
    /** Set description */
    @Input() description: string;

    /** @hidden */
    constructor(
        @Inject(LOCALE_ID) readonly localeId: string,
        readonly contentDensityObserver: ContentDensityObserver
    ) {
        super();
    }

    /** @hidden
     * Create change event instance
     */
    createChangeEvent(value: number): StepInputChangeEvent {
        return new StepInputChangeEvent(this, value);
    }

    /** @hidden
     * Format value taking into account LOCALE_ID
     */
    formatValue(value: number | null): string {
        const precision = this.precision;
        const digitsInfo = !isNaN(precision) ? `1.${precision}-${precision}` : undefined;
        return formatNumber(value || 0, this.localeId, digitsInfo);
    }

    /** @hidden
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

    /** @hidden
     * Used to parse entered value
     */
    parseValueInFocusMode(value: string | null): number | null {
        // if user leaves input empty we should consider it as '0' by default
        value = value || '0';
        const parsedValue = Number.parseFloat(value);
        return isNaN(parsedValue) ? null : parsedValue;
    }
}
