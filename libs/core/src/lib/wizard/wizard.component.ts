import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    HostListener,
    OnDestroy,
    QueryList,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { WizardStepComponent } from './wizard-step/wizard-step.component';
import { Subscription } from 'rxjs';

export const STEP_MIN_WIDTH = 168;
export const STEP_STACKED_TOP_CLASS = 'fd-wizard__step--stacked-top';
export const STEP_STACKED_CLASS = 'fd-wizard__step--stacked';
export const STEP_NO_LABEL_CLASS = 'fd-wizard__step--no-label';

export const ACTIVE_STEP_STATUS = 'active';
export const CURRENT_STEP_STATUS = 'current';
export const UPCOMING_STEP_STATUS = 'upcoming';
export const COMPLETED_STEP_STATUS = 'completed';

@Component({
    selector: 'fd-wizard',
    templateUrl: './wizard.component.html',
    styleUrls: ['./wizard.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WizardComponent implements AfterViewInit, OnDestroy {
    /** @hidden */
    @ContentChildren(WizardStepComponent, { descendants: true })
    steps: QueryList<WizardStepComponent>;

    /** @hidden */
    contentTemplate: TemplateRef<any>;

    /** @hidden */
    private _subscriptions: Subscription = new Subscription();

    /** @hidden */
    private _previousWidth: number;

    constructor(private _elRef: ElementRef, private _cdRef: ChangeDetectorRef) {}

    /** @hidden */
    @HostListener('window:resize')
    resizeHandler(): void {
        const wizardWidth = this._elRef.nativeElement.getBoundingClientRect().width;
        if (!this._previousWidth || wizardWidth <= this._previousWidth) {
            this._wizardShrinking();
        } else if (wizardWidth > this._previousWidth) {
            this._shrinkWhileAnyStepIsTooNarrow();
        }
        this._previousWidth = wizardWidth;
    }

    /** @hidden */
    ngAfterViewInit(): void {
        setTimeout(() => {
            // fixes ExpressionChangedAfterItHasBeenCheckedError
            this._setContentTemplate();
            this._subscriptions.add(
                this.steps.changes.subscribe(() => {
                    this._handleStepOrStatusChanges();
                })
            );
            this.steps.forEach((step) => {
                this._setupStepEvents(step);
            });
            this._cdRef.detectChanges();
        });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    private _setupStepEvents(step: WizardStepComponent): void {
        this._subscriptions.add(
            step.stepClicked.subscribe((event) => {
                this._stepClicked(event);
            })
        );
        this._subscriptions.add(
            step.statusChange.subscribe(() => {
                this._handleStepOrStatusChanges();
            })
        );
        // need to call wizardShrinking for each step < 168px on first load
        if (step.wizardLabel && step.getStepClientWidth() < STEP_MIN_WIDTH) {
            this._wizardShrinking();
        }
    }

    /** @hidden */
    private _wizardShrinking(): void {
        this.steps.forEach((step) => {
            if (step.status === ACTIVE_STEP_STATUS || step.status === CURRENT_STEP_STATUS) {
                const currentStep = step;
                if (step.wizardLabel && step.getStepClientWidth() < STEP_MIN_WIDTH) {
                    this._hideSomeStep(currentStep);
                }
            }
        });
    }

    /** @hidden */
    private _setContentTemplate(): void {
        this.steps.forEach((step) => {
            step.finalStep = false;
            if (step.status === CURRENT_STEP_STATUS && step.content) {
                step.visited = true;
                this.contentTemplate = step.content.contentTemplate;
            }
        });
        this.steps.last.finalStep = true;
    }

    /** @hidden */
    private _hideSomeStep(currentStep: WizardStepComponent): void {
        // If a small step was found, get the step with a visible label furthest away from the current step and hide the label
        let stepsArray = this.steps.toArray();
        stepsArray = stepsArray.filter((step) => {
            return !step.hasLabel(STEP_NO_LABEL_CLASS);
        });
        if (stepsArray.length > 1) {
            let currentStepIndex = 0,
                stepToHide;
            if (currentStep) {
                currentStepIndex = stepsArray.indexOf(currentStep);
            }
            currentStepIndex > (stepsArray.length - 1) / 2
                ? (stepToHide = stepsArray[0])
                : (stepToHide = stepsArray[stepsArray.length - 1]);
            stepToHide.getClassList().add(STEP_NO_LABEL_CLASS);
            stepToHide.getClassList().add(STEP_STACKED_CLASS);
            this._setStackedTop(currentStep);
        }
    }

    /** @hidden */
    private _setStackedTop(currentStep: WizardStepComponent): void {
        this.steps.forEach((step, index) => {
            step.getClassList().remove(STEP_STACKED_TOP_CLASS);
            if (this.steps.toArray()[index + 1] === currentStep) {
                step.getClassList().add(STEP_STACKED_TOP_CLASS);
            }
        });
    }

    /** @hidden */
    private _resetStepClasses(): void {
        this.steps.forEach((step) => {
            step.getClassList().remove(STEP_STACKED_TOP_CLASS);
            step.getClassList().remove(STEP_STACKED_CLASS);
            step.getClassList().remove(STEP_NO_LABEL_CLASS);
        });
    }

    /** @hidden */
    private _handleStepOrStatusChanges(): void {
        this._setContentTemplate();
        this._shrinkWhileAnyStepIsTooNarrow();
        this._cdRef.detectChanges();
    }

    /** @hidden */
    private _shrinkWhileAnyStepIsTooNarrow(): void {
        this._resetStepClasses();
        let i = 0;
        while (this._anyStepIsTooNarrow() && i < this.steps.length - 1) {
            i++;
            this._wizardShrinking();
        }
    }

    /** @hidden */
    private _anyStepIsTooNarrow(): boolean {
        return this.steps.some(step => step.getStepClientWidth() < STEP_MIN_WIDTH);
    }

    /** @hidden */
    private _stepClicked(clickedStep: WizardStepComponent): void {
        this.steps.forEach((step) => {
            const clickedStepIndex = this.steps.toArray().indexOf(clickedStep);
            if (step === clickedStep) {
                step.status = CURRENT_STEP_STATUS;
                step.statusChange.emit(CURRENT_STEP_STATUS);
            } else if (step !== clickedStep) {
                if (this.steps.toArray().indexOf(step) < clickedStepIndex) {
                    step.status = COMPLETED_STEP_STATUS;
                    step.statusChange.emit(COMPLETED_STEP_STATUS);
                } else if (this.steps.toArray().indexOf(step) > clickedStepIndex) {
                    step.status = UPCOMING_STEP_STATUS;
                    step.statusChange.emit(UPCOMING_STEP_STATUS);
                }
            }
        });
    }
}
