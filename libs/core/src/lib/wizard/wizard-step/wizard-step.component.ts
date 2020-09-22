import { Component, Input, ViewEncapsulation } from '@angular/core';

export type StepType = 'completed' | 'current' | 'upcoming' | 'no-label' | 'stacked' | 'stacked-top' | 'active';

@Component({
    selector: 'fd-wizard-step',
    templateUrl: './wizard-step.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./wizard-step.component.scss']
})
export class WizardStepComponent {
    /**
     * The aria-label for the step container.
     */
    @Input()
    ariaLabel: string;

    /**
     * The type of step ('completed', 'current', 'upcoming', 'no-label', 'stacked', 'stacked-top', and 'active'.)
     */
    @Input()
    status: StepType;

    /**
     * Whether or not this is a 'branching' step.
     */
    @Input()
    branching = false;

    /**
     * The label text.
     */
    @Input()
    label: string;

    /**
     * The smaller text for labeling the step as optional.
     */
    @Input()
    optionalText: string;

    /**
     * If this step is the active one in the wizard.
     */
    active = false;
}
