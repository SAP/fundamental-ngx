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
            this._wizardGrowing();
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
                this._subscriptions.add(
                    step.statusChange.subscribe(() => {
                        this._handleStepOrStatusChanges();
                    })
                );
                // need to call wizardShrinking for each step < 168px on first load
                if (step.wizardLabel && step.elRef.nativeElement.clientWidth < 168) {
                    this._wizardShrinking();
                }
            });
            this._cdRef.detectChanges();
        });
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    private _wizardShrinking(): void {
        this.steps.forEach((step) => {
            if (step.status === 'active' || step.status === 'current') {
                const currentStep = step;
                if (step.wizardLabel && step.elRef.nativeElement.clientWidth < 168) {
                    this._hideSomeStep(currentStep);
                }
            }
        });
    }

    /** @hidden */
    private _wizardGrowing(): void {
        this._shrinkWhileAnyStepIsTooNarrow();
    }

    /** @hidden */
    private _setContentTemplate(): void {
        this.steps.forEach((step) => {
            step.finalStep = false;
            if (step.status === 'current') {
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
            return !step.elRef.nativeElement.classList.contains('fd-wizard__step--no-label');
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
            stepToHide.elRef.nativeElement.classList.add('fd-wizard__step--no-label');
            stepToHide.elRef.nativeElement.classList.add('fd-wizard__step--stacked');
            this._setStackedTop(currentStep);
        }
    }

    /** @hidden */
    private _setStackedTop(currentStep: WizardStepComponent): void {
        this.steps.forEach((step, index) => {
            step.elRef.nativeElement.classList.remove('fd-wizard__step--stacked-top');
            if (this.steps.toArray()[index + 1] === currentStep) {
                step.elRef.nativeElement.classList.add('fd-wizard__step--stacked-top');
            }
        });
    }

    /** @hidden */
    private _resetStepClasses(): void {
        this.steps.forEach((step) => {
            step.elRef.nativeElement.classList.remove('fd-wizard__step--stacked-top');
            step.elRef.nativeElement.classList.remove('fd-wizard__step--stacked');
            step.elRef.nativeElement.classList.remove('fd-wizard__step--no-label');
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
        let foundNarrowStep = false;
        this.steps.forEach((step) => {
            if (step.elRef.nativeElement.clientWidth < 168) {
                foundNarrowStep = true;
            }
        });
        return foundNarrowStep;
    }
}
