import { Component, ContentChild, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { WizardContentComponent } from '../wizard-content/wizard-content.component';

export type StepType = 'completed' | 'current' | 'upcoming' | 'active';

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
     * The type of step ('completed', 'current', 'upcoming', and 'active'.)
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

    /** @hidden */
    @ContentChild(WizardContentComponent)
    content: WizardContentComponent;
}
