import {
    Component,
    ContentChild,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { WizardContentComponent } from '../wizard-content/wizard-content.component';

export type StepType = 'completed' | 'current' | 'upcoming' | 'active';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-wizard-step]',
    host: {
        class: 'fd-wizard__step',
        '[class.fd-wizard__step--completed]': 'status === "completed"',
        '[class.fd-wizard__step--current]': 'status === "current"',
        '[class.fd-wizard__step--upcoming]': 'status === "upcoming"',
        '[class.fd-wizard__step--active]': 'status === "active"',
    },
    templateUrl: './wizard-step.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./wizard-step.component.scss']
})
export class WizardStepComponent implements OnChanges {
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

    /**
     * Event emitted when the wizard step's status changes.
     */
    @Output()
    statusChange = new EventEmitter<StepType>();

    /** @hidden */
    @ContentChild(WizardContentComponent)
    content: WizardContentComponent;

    /** @hidden */
    finalStep = false;

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.status) {
            this.statusChange.emit(this.status);
        }
    }
}
