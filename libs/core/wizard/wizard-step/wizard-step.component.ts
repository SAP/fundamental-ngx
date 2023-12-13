import { ENTER, SPACE } from '@angular/cdk/keycodes';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    Optional,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { KeyUtil, Nullable } from '@fundamental-ngx/cdk/utils';
import { Subscription } from 'rxjs';
import { WizardContentComponent } from '../wizard-content/wizard-content.component';

export type WizardStepStatus = 'completed' | 'current' | 'upcoming' | 'active';

import { COMPLETED_STEP_STATUS, CURRENT_STEP_STATUS, FD_WIZARD_STEP_INDICATOR } from '../constants';
import { WizardStepIndicator } from '../models/wizard-step';
import { WIZARD, WizardComponentInterface } from '../wizard-injection-token';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fd-wizard-step]',
    host: {
        class: 'fd-wizard__step',
        '[class.fd-wizard__step--completed]': 'status === "completed" || completed',
        '[class.fd-wizard__step--current]': 'status === "current"',
        '[class.fd-wizard__step--upcoming]': 'status === "upcoming"',
        '[class.fd-wizard__step--active]': 'status === "active"',
        '[attr.aria-label]': 'ariaLabel'
    },
    templateUrl: './wizard-step.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: []
})
export class WizardStepComponent implements OnChanges, AfterViewInit, OnDestroy {
    /**
     * The aria-label for the step container.
     */
    @Input()
    ariaLabel: Nullable<string>;

    /**
     * The aria-label for the step container.
     */
    @Input()
    ariaRoleDecription = 'Navigation';

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

    /** @ignore */
    glyph: string;

    /**
     * The smaller text for labeling the step as optional.
     */
    @Input()
    optionalText: string;

    /**
     * Whether or not this step is the summary page.
     */
    @Input()
    isSummary = false;

    /**
     * User-defined validation function which determines if user can navigate between steps.
     */
    @Input()
    stepClickValidator: (visited: boolean, completed: boolean) => boolean | Promise<boolean>;

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

    /** @ignore */
    @ContentChild(WizardContentComponent)
    content: WizardContentComponent;

    /** @ignore */
    @ContentChild(FD_WIZARD_STEP_INDICATOR)
    stepIndicator: WizardStepIndicator<WizardStepComponent>;

    /** The wizard label span element. */
    @ViewChild('wizardLabel', { read: ElementRef })
    wizardLabel: ElementRef;

    /** @ignore */
    @ViewChild('progressBarLink', { read: ElementRef })
    progressBarLink: ElementRef;

    /** @ignore */
    visited = false;

    /** @ignore */
    completed = false;

    /** @ignore */
    private _subscriptions: Subscription = new Subscription();

    /** @ignore */
    _stepId: number;

    /** @ignore */
    _finalStep = false;

    /** @ignore */
    constructor(
        private _elRef: ElementRef,
        private _cdRef: ChangeDetectorRef,
        @Optional() @Inject(WIZARD) private _wizard: WizardComponentInterface
    ) {}

    /** @ignore */
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

    /** @ignore */
    ngAfterViewInit(): void {
        if (this.isSummary && !this._wizard?.displaySummaryStep) {
            this._summaryInit();
        } else if (this.stepIndicator) {
            this._notSummaryInit();
        }
    }

    /** @ignore */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @ignore */
    setFinalStep(val: boolean): void {
        this._finalStep = val;
        this._cdRef.detectChanges();
    }

    /** @ignore */
    async stepContainerKeypress(event?: KeyboardEvent): Promise<void> {
        if (event) {
            event.preventDefault();
        }

        if (
            this.visited &&
            (!event || KeyUtil.isKeyCode(event, [SPACE, ENTER])) &&
            (!this.stepIndicator || !this.stepIndicator.stackedItems || !this.stepIndicator.stackedItems.length) &&
            (this.stepClickValidator === undefined ||
                (await this.stepClickValidator(this.visited, this.completed)) === true)
        ) {
            this.stepClicked.emit(this);
        }
    }

    /** @ignore */
    getClassList(): DOMTokenList {
        return this._elRef.nativeElement.classList;
    }

    /** @ignore */
    hasLabel(label: string): boolean {
        return this._elRef.nativeElement.classList.contains(label);
    }

    /** @ignore */
    getStepClientWidth(): number {
        return this._elRef.nativeElement.clientWidth;
    }

    /** @ignore */
    removeFromDom(): void {
        if (this._elRef.nativeElement.parentNode) {
            this._elRef.nativeElement.parentNode.removeChild(this._elRef.nativeElement);
        }
    }

    /** @ignore */
    _summaryInit(): void {
        this._elRef.nativeElement.style.display = 'none';
        this.content.tallContent = true;
    }

    /** @ignore */
    _notSummaryInit(): void {
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
