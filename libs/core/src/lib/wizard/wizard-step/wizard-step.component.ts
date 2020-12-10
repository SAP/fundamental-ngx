import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { WizardContentComponent } from '../wizard-content/wizard-content.component';
import { WizardStepIndicatorComponent } from '../wizard-step-indicator/wizard-step-indicator.component';
import { Subscription } from 'rxjs';
import { KeyUtil } from '../../utils/functions';
import { ENTER, SPACE } from '@angular/cdk/keycodes';

export type WizardStepStatus = 'completed' | 'current' | 'upcoming' | 'active';

import { CURRENT_STEP_STATUS, COMPLETED_STEP_STATUS } from '../wizard.component';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-wizard-step]',
    host: {
        class: 'fd-wizard__step',
        '[class.fd-wizard__step--completed]': 'status === "completed" || completed',
        '[class.fd-wizard__step--current]': 'status === "current"',
        '[class.fd-wizard__step--upcoming]': 'status === "upcoming" && !completed',
        '[class.fd-wizard__step--active]': 'status === "active"'
    },
    templateUrl: './wizard-step.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WizardStepComponent implements OnChanges, AfterViewInit, OnDestroy {
    /**
     * The aria-label for the step container.
     */
    @Input()
    ariaLabel: string;

    /**
     * The type of step ('completed', 'current', 'upcoming', and 'active'.)
     */
    @Input()
    status: WizardStepStatus;

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

    /** @hidden */
    glyph: string;

    /**
     * The smaller text for labeling the step as optional.
     */
    @Input()
    optionalText: string;

    /**
     * Event emitted when the wizard step's status changes.
     */
    @Output()
    statusChange = new EventEmitter<WizardStepStatus>();

    /**
     * Event emitted when a step is clicked.
     */
    @Output()
    stepClicked = new EventEmitter<WizardStepComponent>();

    /**
     * Event emitted when a step indicator is clicked.
     */
    @Output()
    stepIndicatorItemClicked = new EventEmitter<WizardStepComponent>();

    /** @hidden */
    @ContentChild(WizardContentComponent)
    content: WizardContentComponent;

    /** @hidden */
    @ContentChild(WizardStepIndicatorComponent)
    stepIndicator: WizardStepIndicatorComponent;

    /** The wizard label span element. */
    @ViewChild('wizardLabel', { read: ElementRef })
    wizardLabel: ElementRef;

    /** @hidden */
    finalStep = false;

    /** @hidden */
    visited = false;

    /** @hidden */
    completed = false;

    /** @hidden */
    private _subscriptions: Subscription = new Subscription();

    /** @hidden */
    _stepId: number;

    /** @hidden */
    constructor(private _elRef: ElementRef) {}

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.status) {
            if (
                changes.status.previousValue === CURRENT_STEP_STATUS &&
                changes.status.currentValue === COMPLETED_STEP_STATUS
            ) {
                this.completed = true;
            }
            this.statusChange.emit(this.status);
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        if (this.stepIndicator) {
            this._subscriptions.add(
                this.stepIndicator.stepIndicatorItemClicked.subscribe((step) => {
                    this.stepIndicatorItemClicked.emit(step);
                })
            );
            if (this.stepIndicator.glyph) {
                this.glyph = this.stepIndicator.glyph;
            }
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    stepContainerKeypress(event?: KeyboardEvent): void {
        if (event) {
            event.preventDefault();
        }
        if (
            this.visited &&
            (!event || KeyUtil.isKeyCode(event, [SPACE, ENTER])) &&
            (!this.stepIndicator || !this.stepIndicator.stackedItems || !this.stepIndicator.stackedItems.length)
        ) {
            this.stepClicked.emit(this);
        }
    }

    /** @hidden */
    wizardLabelClicked(event: MouseEvent): void {
        event.preventDefault();
        this.stepClicked.emit(this);
    }

    /** @hidden */
    getClassList(): DOMTokenList {
        return this._elRef.nativeElement.classList;
    }

    /** @hidden */
    hasLabel(label: string): boolean {
        return this._elRef.nativeElement.classList.contains(label);
    }

    /** @hidden */
    getStepClientWidth(): number {
        return this._elRef.nativeElement.clientWidth;
    }
}
