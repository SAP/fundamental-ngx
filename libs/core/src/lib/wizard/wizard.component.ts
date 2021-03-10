import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
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
import { WizardProgressBarDirective } from './wizard-progress-bar/wizard-progress-bar.directive';
import { scrollTop } from '../utils/functions/scroll';
import { ACTIVE_STEP_STATUS, CURRENT_STEP_STATUS, UPCOMING_STEP_STATUS, COMPLETED_STEP_STATUS } from './constants';

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
export const BAR_FLOATING_FOOTER_CLASS = 'fd-bar--floating-footer';

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
    @ContentChild(WizardProgressBarDirective)
    progressBar: WizardProgressBarDirective;

    /** @hidden */
    @ViewChild('wrapperContainer')
    wrapperContainer: ElementRef<HTMLElement>;

    /** @hidden */
    contentTemplates: TemplateRef<any>[] = [];

    /** @hidden */
    stackedStepsLeft: WizardStepComponent[] = [];

    /** @hidden */
    stackedStepsRight: WizardStepComponent[] = [];

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
            this._handleStepOrStatusChanges();
            this.resizeHandler();
        });
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
        let shellbarHeight,
            wizardNavHeight = 0,
            wizardFooterHeight,
            dialogOffset;
        shellbarHeight = this._getShellbarHeight();
        if (!this._isCurrentStepSummary()) {
            wizardNavHeight = this._getWizardNavHeight();
        }
        wizardFooterHeight = this._getWizardFooterHeight();
        dialogOffset = this._getDialogOffset();
        return shellbarHeight + wizardNavHeight + wizardFooterHeight + dialogOffset;
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
            retVal = wizard.querySelector('.' + BAR_FOOTER_CLASS).offsetHeight;
        } else if (wizard.querySelector('.' + BAR_FLOATING_FOOTER_CLASS)) {
            retVal = wizard.querySelector('.' + BAR_FLOATING_FOOTER_CLASS).offsetHeight;
        } else {
            retVal = 0;
        }
        return retVal;
    }

    /** @hidden */
    private _getDialogOffset(): number {
        const dialogBody = this._elRef.nativeElement.parentElement;
        let retVal = 0;
        if (dialogBody.tagName.toLowerCase() === 'fd-dialog-body') {
            if (dialogBody.querySelector('.' + 'fd-title--h2')) {
                retVal = dialogBody.querySelector('.' + 'fd-title--h2').offsetHeight;
            }
            retVal = retVal + window.innerHeight - dialogBody.offsetHeight;
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
            if (
                wizard.querySelector('.' + WIZARD_TALL_CONTENT_CLASS).offsetHeight <
                wizard.querySelector('.' + WIZARD_CONTAINER_WRAPPER_CLASS).offsetHeight
            ) {
                wizard.querySelector('.' + WIZARD_TALL_CONTENT_CLASS).style.height =
                    'calc(100vh - ' + combinedHeight + 'px)';
            } else {
                wizard.querySelector('.' + WIZARD_TALL_CONTENT_CLASS).style.paddingBottom = '24px';
            }
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
        this._subscriptions.add(
            step.stepIndicatorItemClicked.subscribe((event) => {
                this._stepClicked(event);
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
            if (!step.isSummary && (step.status === ACTIVE_STEP_STATUS || step.status === CURRENT_STEP_STATUS)) {
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
        for (const step of this.steps.toArray()) {
            if (step.content) {
                if (!step.isSummary) {
                    step.content.tallContent = false;
                }
                step.content.wizardContentId = _stepId.toString();
            }
            step._stepId = _stepId;
            _stepId++;
            step.finalStep = false;
            /*
             If the step is completed and appendToWizard is true, hide the nextStep button, unless it's the last step,
             or if there's a summary and it is the second to last step
             */
            if (step.completed && this.appendToWizard && step !== this._getLastNonSummaryStep()) {
                step.content.nextStep._getElRef().nativeElement.style.display = 'none';
            } else if (
                (step.completed && this.appendToWizard) ||
                (step.visited && step.branching && step.status === CURRENT_STEP_STATUS)
            ) {
                step.content.nextStep._getElRef().nativeElement.style.removeProperty('display');
            }
            if (
                step.visited ||
                ((step.status === CURRENT_STEP_STATUS || step.status === COMPLETED_STEP_STATUS) && step.content)
            ) {
                if (step.status === CURRENT_STEP_STATUS && (!step.completed || !this.appendToWizard)) {
                    step.content.tallContent = true;
                }
                if (!templatesLength || (!this.appendToWizard && step.status === CURRENT_STEP_STATUS)) {
                    this.contentTemplates = [step.content.contentTemplate];
                    if (!this.appendToWizard && step.status === CURRENT_STEP_STATUS) {
                        break;
                    }
                } else if (this.appendToWizard && !step.isSummary) {
                    this.contentTemplates.push(step.content.contentTemplate);
                }
                step.visited = true;
            }
        }
        const lastVisibleTemplate = this.steps.toArray()[this.contentTemplates.length - 1];
        if (lastVisibleTemplate && lastVisibleTemplate.content) {
            lastVisibleTemplate.content.tallContent = true;
        }
        this.steps.last.finalStep = true;
    }

    /** @hidden */
    private _scrollToCurrentStep(): void {
        if (this.appendToWizard) {
            _fromScrollToCurrentStep = true;
            this.steps.forEach((step, index) => {
                if (step.status === CURRENT_STEP_STATUS && !step.isSummary) {
                    const child = <HTMLElement>this.wrapperContainer.nativeElement.children[index];
                    const wizardNavigationHeight = this._elRef.nativeElement.querySelector(
                        '.' + WIZARD_NAVIGATION_CLASS
                    ).clientHeight;

                    scrollTop(this.wrapperContainer.nativeElement, child.offsetTop - wizardNavigationHeight);
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
        if (this.steps.last.isSummary) {
            stepsArray.pop();
        }
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
            if (stepsArray.indexOf(stepToHide) < currentStepIndex) {
                this.stackedStepsLeft.push(stepToHide);
            } else if (stepsArray.indexOf(stepToHide) > currentStepIndex) {
                this.stackedStepsRight.unshift(stepToHide);
            }
            if (this.stackedStepsLeft.length) {
                this._setStackedTop(currentStep);
            }
        }
    }

    /** @hidden */
    private _setStackedTop(currentStep: WizardStepComponent): void {
        this.steps.forEach((step, index) => {
            if (step.stepIndicator) {
                step.getClassList().remove(STEP_STACKED_TOP_CLASS);
                if (this.steps.toArray()[index + 1] === currentStep) {
                    if (this.steps.length > 1) {
                        step.getClassList().add(STEP_STACKED_TOP_CLASS);
                    }
                    step.stepIndicator.setStackedItems(this.stackedStepsLeft);
                } else {
                    step.stepIndicator.stackedItems = [];
                }
            }
        });
        this._getLastNonSummaryStep().stepIndicator.setStackedItems(this.stackedStepsRight);
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
        if (this._isCurrentStepSummary()) {
            this.progressBar.visible = false;
            this._showSummary();
        } else {
            this.progressBar.visible = true;
            this._setContentTemplates();
            this._shrinkWhileAnyStepIsTooNarrow();
        }
        setTimeout(() => {
            this._cdRef.detectChanges();
            this.resizeHandler();
            if (!this._isCurrentStepSummary()) {
                this._scrollToCurrentStep();
            }
        });
        this._setFinalStep();
    }

    /** @hidden */
    private _setFinalStep(): void {
        const lastNonSummaryStep = this._getLastNonSummaryStep();
        if (this.steps.last.isSummary && lastNonSummaryStep) {
            lastNonSummaryStep.content.tallContent = true;
            lastNonSummaryStep.finalStep = true;
            this.steps.last.removeFromDom();
        } else if (lastNonSummaryStep) {
            if (lastNonSummaryStep.content) {
                lastNonSummaryStep.content.tallContent = true;
            }
            lastNonSummaryStep.finalStep = true;
        }
    }

    /** @hidden */
    private _showSummary(): void {
        const summary = this.steps.find((step) => step.isSummary);
        summary.content.tallContent = true;
        this.contentTemplates = [summary.content.contentTemplate];
    }

    /** @hidden */
    private _isCurrentStepSummary(): boolean {
        return this.steps.some((step) => step.status === CURRENT_STEP_STATUS && step.isSummary);
    }

    /** @hidden */
    private _shrinkWhileAnyStepIsTooNarrow(): void {
        this._resetStepClasses();
        this.stackedStepsLeft = [];
        this.stackedStepsRight = [];
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
        if (!clickedStep) {
            clickedStep = this.steps.first;
        }
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
        setTimeout(() => {
            (document.activeElement as HTMLElement).blur(); // this function can focus step indicators undesirably
        });
    }

    /** @hidden */
    private _getLastNonSummaryStep(): WizardStepComponent {
        if (this.steps.last.isSummary) {
            return this.steps.toArray()[this.steps.length - 2];
        }
        return this.steps.last;
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
