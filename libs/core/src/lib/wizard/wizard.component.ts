import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    HostListener,
    Input,
    OnDestroy,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { WizardStepComponent } from './wizard-step/wizard-step.component';
import { Subscription } from 'rxjs';

export const STEP_MIN_WIDTH = 168;
export const STEP_STACKED_TOP_CLASS = 'fd-wizard__step--stacked-top';
export const STEP_STACKED_CLASS = 'fd-wizard__step--stacked';
export const STEP_NO_LABEL_CLASS = 'fd-wizard__step--no-label';

export const WIZARD_NAVIGATION_CLASS = 'fd-wizard__navigation';
export const WIZARD_CONTENT_CLASS = 'fd-wizard__content';
export const WIZARD_CONTAINER_WRAPPER_CLASS = 'fd-wizard-container-wrapper';
export const WIZARD_TALL_CONTENT_CLASS = 'fd-wizard-tall-content';
export const SHELLBAR_CLASS = 'fd-shellbar';
export const BAR_FOOTER_CLASS = 'fd-bar--footer';

export const ACTIVE_STEP_STATUS = 'active';
export const CURRENT_STEP_STATUS = 'current';
export const UPCOMING_STEP_STATUS = 'upcoming';
export const COMPLETED_STEP_STATUS = 'completed';

export let _fromScrollToCurrentStep;
export let timer = null;
export const handleTimeoutReference = () => {
    if (timer !== null) {
        clearTimeout(timer);
    }
    timer = setTimeout(() => {
        _fromScrollToCurrentStep = false;
    }, 150);
};

@Component({
    selector: 'fd-wizard',
    templateUrl: './wizard.component.html',
    styleUrls: ['./wizard.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WizardComponent implements AfterViewInit, OnDestroy {
    /**
     * Whether or not to append the step to the wizard. If false, each step will be displayed on a different page.
     * Default is true.
     */
    @Input()
    appendToWizard = true;

    /**
     * Custom height to use for the wizard's content pane. By default, this value is calc(100vh - 144px), where 144px
     * is the combined height of the shellbar, wizard header and wizard footer.
     */
    @Input()
    contentHeight: string;

    /** @hidden */
    @ContentChildren(WizardStepComponent, { descendants: true })
    steps: QueryList<WizardStepComponent>;

    /** @hidden */
    @ViewChild('wrapperContainer')
    wrapperContainer: ElementRef<HTMLElement>;

    /** @hidden */
    contentTemplates: TemplateRef<any>[] = [];

    /** @hidden */
    private _subscriptions: Subscription = new Subscription();

    /** @hidden */
    private _previousWidth: number;

    constructor(private _elRef: ElementRef, private readonly _cdRef: ChangeDetectorRef) {}

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
        if (this.contentHeight) {
            this._elRef.nativeElement.querySelector(
                '.' + WIZARD_CONTAINER_WRAPPER_CLASS
            ).style.height = this.contentHeight;
        } else {
            this._setContainerAndTallContentHeight();
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        setTimeout(() => {
            // fixes ExpressionChangedAfterItHasBeenCheckedError
            this._setContentTemplates();
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
        this.resizeHandler();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
        this.wrapperContainer.nativeElement.removeEventListener('scroll', handleTimeoutReference);
    }

    /**
     * @hidden
     * @private
     * This function determines the height of the wizard content by looking for the document's shellbar, the wizard
     * navigation and the wizard footer, and calculating the height based on their presence.
     */
    private _calculateContentHeight(): number {
        let shellbarHeight, wizardNavHeight, wizardFooterHeight;
        shellbarHeight = this._getShellbarHeight();
        wizardNavHeight = this._getWizardNavHeight();
        wizardFooterHeight = this._getWizardFooterHeight();
        return shellbarHeight + wizardNavHeight + wizardFooterHeight;
    }

    /** @hidden */
    private _getShellbarHeight(): number {
        let retVal;
        if (document.querySelector<HTMLElement>('.' + SHELLBAR_CLASS)) {
            retVal = document.querySelector<HTMLElement>('.' + SHELLBAR_CLASS).clientHeight;
        } else {
            retVal = 0;
        }
        return retVal;
    }

    /** @hidden */
    private _getWizardNavHeight(): number {
        const wizard = this._elRef.nativeElement;
        let retVal;
        if (wizard.querySelector('.' + WIZARD_NAVIGATION_CLASS)) {
            retVal = wizard.querySelector('.' + WIZARD_NAVIGATION_CLASS).clientHeight;
        } else {
            retVal = 0;
        }
        return retVal;
    }

    /** @hidden */
    private _getWizardFooterHeight(): number {
        const wizard = this._elRef.nativeElement;
        let retVal;
        if (wizard.querySelector('.' + BAR_FOOTER_CLASS)) {
            retVal = wizard.querySelector('.' + BAR_FOOTER_CLASS).clientHeight;
        } else {
            retVal = 0;
        }
        return retVal;
    }

    /** @hidden */
    private _setContainerAndTallContentHeight(): void {
        const wizard = this._elRef.nativeElement;
        const combinedHeight = this.contentHeight ? this.contentHeight : this._calculateContentHeight();
        if (wizard.querySelector('.' + WIZARD_CONTAINER_WRAPPER_CLASS)) {
            wizard.querySelector('.' + WIZARD_CONTAINER_WRAPPER_CLASS).style.height =
                'calc(100vh - ' + combinedHeight + 'px)';
        }
        wizard.querySelectorAll('.' + WIZARD_CONTENT_CLASS).forEach((node) => {
            node.style.height = 'auto';
        });
        if (wizard.querySelector('.' + WIZARD_TALL_CONTENT_CLASS)) {
            wizard.querySelector('.' + WIZARD_TALL_CONTENT_CLASS).style.height =
                'calc(100vh - ' + combinedHeight + 'px)';
        }
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
    private _setContentTemplates(): void {
        const templatesLength = this.contentTemplates.length;
        this.contentTemplates = [];
        let _stepId = 0;
        this.steps.forEach((step) => {
            if (step.content) {
                step.content.tallContent = false;
                step.content.wizardContentId = _stepId.toString();
            }
            step._stepId = _stepId;
            _stepId++;
            step.finalStep = false;
            if (step.completed && this.appendToWizard) {
                step.content.nextStep._getElRef().nativeElement.style.display = 'none';
            }
            if (
                step.visited ||
                ((step.status === CURRENT_STEP_STATUS || step.status === COMPLETED_STEP_STATUS) && step.content)
            ) {
                if (step.status === CURRENT_STEP_STATUS && !step.completed) {
                    step.content.tallContent = true;
                }
                step.visited = true;
                if (!templatesLength || (!this.appendToWizard && step.status === CURRENT_STEP_STATUS)) {
                    this.contentTemplates = [step.content.contentTemplate];
                } else if (this.appendToWizard) {
                    this.contentTemplates.push(step.content.contentTemplate);
                }
            }
        });
        if (this.steps.last.content) {
            this.steps.last.content.tallContent = true;
        }
        this.steps.last.finalStep = true;
    }

    /** @hidden */
    private _scrollToCurrentStep(): void {
        if (this.appendToWizard) {
            _fromScrollToCurrentStep = true;
            this.steps.forEach((step, index) => {
                if (step.status === CURRENT_STEP_STATUS) {
                    const child = <HTMLElement>this.wrapperContainer.nativeElement.children[index];
                    this.wrapperContainer.nativeElement.scrollTo({
                        top: child.offsetTop - this._elRef.nativeElement.querySelector('.' + WIZARD_NAVIGATION_CLASS).clientHeight,
                        behavior: 'smooth'
                    });
                }
            });
            this._setUpScrollListener();
        }
    }

    /** @hidden */
    private _setUpScrollListener(): void {
        this.wrapperContainer.nativeElement.addEventListener('scroll', handleTimeoutReference, false);
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
        this._setContentTemplates();
        this._shrinkWhileAnyStepIsTooNarrow();
        this._cdRef.detectChanges();
        this._setContainerAndTallContentHeight();
        this._scrollToCurrentStep();
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
        return this.steps.some((step) => step.getStepClientWidth() < STEP_MIN_WIDTH);
    }

    /** @hidden */
    private _stepClicked(clickedStep: WizardStepComponent): void {
        const clickedStepIndex = this.steps.toArray().indexOf(clickedStep);
        this.steps.forEach((step) => {
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

    /** @hidden */
    scrollSpyChange($event: HTMLElement): void {
        if (!_fromScrollToCurrentStep) {
            this.steps.forEach((step) => {
                if (step._stepId.toString() === $event.children[0].id) {
                    step.status = CURRENT_STEP_STATUS;
                } else if (step._stepId < parseInt($event.children[0].id, 10)) {
                    step.status = COMPLETED_STEP_STATUS;
                } else {
                    step.status = UPCOMING_STEP_STATUS;
                }
            });
        }
        this._shrinkWhileAnyStepIsTooNarrow();
    }
}
