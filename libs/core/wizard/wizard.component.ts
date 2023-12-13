import { CdkScrollable } from '@angular/cdk/scrolling';
import { NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    HostBinding,
    HostListener,
    Inject,
    Input,
    OnDestroy,
    Optional,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
    inject
} from '@angular/core';
import { Nullable, TabbableElementService, scrollTop } from '@fundamental-ngx/cdk/utils';
import { DialogBodyComponent, FD_DIALOG_BODY_COMPONENT } from '@fundamental-ngx/core/dialog';
import { ScrollSpyDirective } from '@fundamental-ngx/core/scroll-spy';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { resolveTranslationSignal } from '@fundamental-ngx/i18n';
import { Subscription } from 'rxjs';
import { ACTIVE_STEP_STATUS, COMPLETED_STEP_STATUS, CURRENT_STEP_STATUS, UPCOMING_STEP_STATUS } from './constants';
import { WizardContentComponent } from './wizard-content/wizard-content.component';
import { WIZARD } from './wizard-injection-token';
import { WizardProgressBarDirective } from './wizard-progress-bar/wizard-progress-bar.directive';
import { WizardStepComponent } from './wizard-step/wizard-step.component';
import { WizardService } from './wizard.service';

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
export let timer: any = null;
export const handleTimeoutReference = (): void => {
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
    styleUrl: './wizard.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        WizardService,
        {
            provide: WIZARD,
            useExisting: WizardComponent
        }
    ],
    host: {
        role: 'region',
        '[attr.aria-label]': 'ariaLabel || _defaultAriaLabel()'
    },
    standalone: true,
    imports: [ScrollSpyDirective, CdkScrollable, ScrollbarDirective, NgTemplateOutlet]
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
    contentHeight: Nullable<string | null>;

    /**
     * Whether or not apply responsive paddings styling.
     */
    @Input()
    @HostBinding('class.fd-wizard--responsive-paddings')
    responsivePaddings = false;

    /** Whether to display a summary step.  */
    @Input()
    displaySummaryStep = false;

    /**
     * adding aria label to the component
     * If not provided, is being translated by i18n package
     */
    @Input()
    ariaLabel: string;

    /** @ignore */
    @ContentChildren(WizardStepComponent, { descendants: true })
    steps: QueryList<WizardStepComponent>;

    /** @ignore */
    @ContentChild(WizardProgressBarDirective)
    progressBar: WizardProgressBarDirective;

    /** @ignore */
    @ContentChildren(WizardContentComponent)
    wizardContent: WizardContentComponent;

    /** @ignore */
    @ViewChild('wrapperContainer')
    wrapperContainer: ElementRef<HTMLElement>;

    /** @ignore */
    @ViewChild(ScrollbarDirective)
    scrollbar: ScrollbarDirective;

    /** @ignore */
    contentTemplates: TemplateRef<any>[] = [];

    /** @ignore */
    stackedStepsLeft: WizardStepComponent[] = [];

    /** @ignore */
    stackedStepsRight: WizardStepComponent[] = [];

    /** @ignore */
    protected _defaultAriaLabel = resolveTranslationSignal('coreWizard.ariaLabel');

    /** @ignore */
    private _stepEventSubscriptions: Subscription = new Subscription();

    /** @ignore */
    private _subscriptions: Subscription = new Subscription();

    /** @ignore */
    private _previousWidth: number;

    /** @ignore */
    private readonly _tabbableService = inject(TabbableElementService);

    /** @ignore */
    constructor(
        private _elRef: ElementRef,
        private readonly _cdRef: ChangeDetectorRef,
        @Optional() @Inject(FD_DIALOG_BODY_COMPONENT) private _dialogBodyComponent: DialogBodyComponent
    ) {}

    /** @ignore */
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
            this._elRef.nativeElement.querySelector('.' + WIZARD_CONTAINER_WRAPPER_CLASS).style.height =
                this.contentHeight;
        } else {
            this._setContainerAndTallContentHeight();
        }
    }

    /** @ignore */
    ngAfterViewInit(): void {
        setTimeout(() => {
            if (this._subscriptions.closed) {
                return;
            }

            // fixes ExpressionChangedAfterItHasBeenCheckedError
            this._setContentTemplates();
            this._subscriptions.add(
                this.steps.changes.subscribe(() => {
                    this._handleStepOrStatusChanges();
                    this._setupStepEvents();
                })
            );
            this._setupStepEvents();
            this._cdRef.detectChanges();
            this._handleStepOrStatusChanges();
            this.resizeHandler();
        });
    }

    /** @ignore */
    ngOnDestroy(): void {
        this._stepEventSubscriptions.unsubscribe();
        this._subscriptions.unsubscribe();
        this.wrapperContainer?.nativeElement.removeEventListener('scroll', handleTimeoutReference);
    }

    /** @ignore */
    scrollSpyChange($event: HTMLElement): void {
        if (!_fromScrollToCurrentStep) {
            this.steps.forEach((step) => {
                if (step._stepId.toString() === $event.children[0].children[0].id) {
                    step.status = CURRENT_STEP_STATUS;
                } else if (step._stepId < parseInt($event.children[0].children[0].id, 10)) {
                    step.status = COMPLETED_STEP_STATUS;
                } else {
                    step.status = UPCOMING_STEP_STATUS;
                }
            });
        }
        this._shrinkWhileAnyStepIsTooNarrow();
    }

    /**
     * @ignore
     * @private
     * This function determines the height of the wizard content by looking for the document's shellbar, the wizard
     * navigation and the wizard footer, and calculating the height based on their presence.
     */
    private _calculateContentHeight(): number {
        let wizardNavHeight = 0;
        const shellbarHeight = this._getShellbarHeight();
        if (!this._isCurrentStepSummary() || this.displaySummaryStep) {
            wizardNavHeight = this._getWizardNavHeight();
        }
        const wizardFooterHeight = this._getWizardFooterHeight();
        const dialogOffset = this._getDialogOffset();

        return shellbarHeight + wizardNavHeight + wizardFooterHeight + dialogOffset;
    }

    /** @ignore */
    private _getShellbarHeight(): number {
        return document.querySelector<HTMLElement>('.' + SHELLBAR_CLASS)?.clientHeight ?? 0;
    }

    /** @ignore */
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

    /** @ignore */
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

    /** @ignore */
    private _getDialogOffset(): number {
        let retVal = 0;
        if (this._dialogBodyComponent) {
            const dialogBody = this._dialogBodyComponent.elementRef.nativeElement;
            if (dialogBody.tagName.toLowerCase() === 'fd-dialog-body') {
                this._dialogBodyComponent.dialogConfig.verticalPadding = false;
                const dialogBodyTitle = dialogBody.querySelector('.fd-title--h2');
                if (dialogBodyTitle) {
                    retVal = dialogBodyTitle.offsetHeight;
                }
                retVal = retVal + window.innerHeight - dialogBody.offsetHeight;
            }
        }

        return retVal;
    }

    /** @ignore */
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

    /** @ignore */
    private _setupStepEvents(): void {
        this._stepEventSubscriptions.unsubscribe();
        this._stepEventSubscriptions = new Subscription();
        this.steps.forEach((step) => {
            this._stepEventSubscriptions.add(
                step.stepClicked.subscribe((event) => {
                    this._stepClicked(event);
                })
            );
            this._stepEventSubscriptions.add(
                step.statusChange.subscribe(() => {
                    this._handleStepOrStatusChanges();
                })
            );
            this._stepEventSubscriptions.add(
                step.stepIndicatorItemClicked.subscribe((event) => {
                    this._stepClicked(event);
                })
            );
            // need to call wizardShrinking for each step < 168px on first load
            if (step.wizardLabel && step.getStepClientWidth() < STEP_MIN_WIDTH) {
                this._wizardShrinking();
            }
        });
    }

    /** @ignore */
    private _wizardShrinking(): void {
        const currentStep = this._getCurrentStep();
        if (
            currentStep &&
            (!currentStep.isSummary || this.displaySummaryStep) &&
            currentStep.wizardLabel &&
            currentStep.getStepClientWidth() < STEP_MIN_WIDTH
        ) {
            this._hideSomeStep(currentStep);
            this._setStackedTop();
        }
    }

    /** @ignore */
    private _setContentTemplates(): void {
        const templatesLength = this.contentTemplates.length;
        this.contentTemplates = [];
        let _stepId = 0;
        const steps = this.steps.toArray();
        for (const step of steps) {
            if (step.content) {
                if (!step.isSummary || this.displaySummaryStep) {
                    step.content.tallContent = false;
                }
                step.content.wizardContentId = _stepId.toString();
            }
            step._stepId = _stepId;
            _stepId++;
            step.setFinalStep(false);
            /*
             If the step is completed and appendToWizard is true, hide the nextStep button, unless it's the last step,
             or if there's a summary and it is the second to last step
             */
            if (
                step.completed &&
                this.appendToWizard &&
                step.content?.nextStep?.canHide &&
                step !== this._getLastNonSummaryStep()
            ) {
                step.content.nextStep._hideElement();
            } else if (
                step.content?.nextStep &&
                ((step.completed && this.appendToWizard) ||
                    (step.visited && step.branching && step.status === CURRENT_STEP_STATUS))
            ) {
                step.content.nextStep._showElement();
            }
            if (
                step.visited ||
                ((step.status === CURRENT_STEP_STATUS || step.status === COMPLETED_STEP_STATUS) && step.content)
            ) {
                step.visited = true;
                if (step.status === CURRENT_STEP_STATUS && (!step.completed || !this.appendToWizard)) {
                    step.content.tallContent = true;
                }

                const isCurrentStep = !this.appendToWizard && step.status === CURRENT_STEP_STATUS;

                if (!templatesLength || isCurrentStep) {
                    this.contentTemplates = [step.content.contentTemplate];

                    // If we found needed step, break the cycle, since it might set wrong step later.
                    if (isCurrentStep) {
                        break;
                    }
                } else if (this.appendToWizard && (!step.isSummary || this.displaySummaryStep)) {
                    this.contentTemplates.push(step.content.contentTemplate);
                }
            }
        }

        const lastVisibleTemplate = steps[this.contentTemplates.length - 1];
        if (lastVisibleTemplate && lastVisibleTemplate.content) {
            lastVisibleTemplate.content.tallContent = true;
        }
        this._setFinalStep();
    }

    /** @ignore */
    private _scrollToCurrentStep(): void {
        if (this.appendToWizard) {
            _fromScrollToCurrentStep = true;
            this.steps.forEach((step, index) => {
                if (step.status === CURRENT_STEP_STATUS && (!step.isSummary || this.displaySummaryStep)) {
                    const child = this.wrapperContainer.nativeElement.children[0].children[index] as HTMLElement;
                    const wizardNavigationHeight = this._elRef.nativeElement.querySelector(
                        '.' + WIZARD_NAVIGATION_CLASS
                    ).clientHeight;

                    scrollTop(this.wrapperContainer.nativeElement, child.offsetTop - wizardNavigationHeight);

                    if (index === 0) {
                        this._focusFirstTabbableElement(index);
                    } else {
                        // setTimeout needed to allow for smooth scroll animation
                        setTimeout(() => {
                            this._focusFirstTabbableElement(index);
                        }, 500);
                    }
                }
            });
            this._setUpScrollListener();
        }
    }

    /** @ignore */
    private _focusFirstTabbableElement(index = 0): void {
        const contentContainer = this._elRef.nativeElement.querySelectorAll('.fd-wizard__content')[index];
        this._tabbableService.getTabbableElement(contentContainer)?.focus();
    }

    /** @ignore */
    private _setUpScrollListener(): void {
        this.wrapperContainer?.nativeElement.addEventListener('scroll', handleTimeoutReference, false);
    }

    /** @ignore */
    private _hideSomeStep(currentStep: WizardStepComponent): void {
        // If a small step was found, get the step with a visible label furthest away from the current step and hide the label
        let stepsArray = this.steps.toArray();
        stepsArray = stepsArray.filter((step) => !step.hasLabel(STEP_NO_LABEL_CLASS));
        if (this.steps.last.isSummary && !this.displaySummaryStep) {
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
            if (stepsArray.indexOf(stepToHide) < currentStepIndex && !this.stackedStepsLeft.includes(stepToHide)) {
                this.stackedStepsLeft.splice(this.steps.toArray().indexOf(stepToHide), 0, stepToHide);
            } else if (
                stepsArray.indexOf(stepToHide) > currentStepIndex &&
                !this.stackedStepsRight.includes(stepToHide)
            ) {
                this.stackedStepsRight.unshift(stepToHide);
            }
            this._cdRef.detectChanges();
        }
    }

    /** @ignore */
    private _setStackedTop(): void {
        const currentStep = this._getCurrentStep();
        this.steps.forEach((step, index) => {
            if (step.stepIndicator) {
                step.getClassList().remove(STEP_STACKED_TOP_CLASS);
                if (this.steps.toArray()[index + 1] === currentStep) {
                    if (this.steps.length > 1) {
                        step.getClassList().add(STEP_STACKED_TOP_CLASS);
                        if (!this.stackedStepsLeft.includes(step) && this.stackedStepsLeft.length >= 1) {
                            this.stackedStepsLeft.splice(index, 0, step);
                        }
                    }
                    step.stepIndicator.setStackedItems(this.stackedStepsLeft);
                } else {
                    step.stepIndicator.stackedItems = [];
                }
            }
        });
        this._getLastNonSummaryStep().stepIndicator?.setStackedItems(this.stackedStepsRight);
    }

    /** @ignore */
    private _resetStepClasses(): void {
        this.steps.forEach((step) => {
            step.getClassList().remove(STEP_STACKED_TOP_CLASS);
            step.getClassList().remove(STEP_STACKED_CLASS);
            step.getClassList().remove(STEP_NO_LABEL_CLASS);
        });
    }

    /** @ignore */
    private _handleStepOrStatusChanges(): void {
        if (this._isCurrentStepSummary() && !this.displaySummaryStep) {
            setTimeout(() => {
                this.progressBar.visible = false;
            });
            this._showSummary();
        } else {
            this.progressBar.visible = true;
            this._setContentTemplates();
            this._shrinkWhileAnyStepIsTooNarrow();
        }
        if (!this.appendToWizard) {
            this._focusFirstTabbableElement();
        }
        setTimeout(() => {
            this._cdRef.detectChanges();
            this.resizeHandler();
            if (!this._isCurrentStepSummary() || this.displaySummaryStep) {
                this._scrollToCurrentStep();
            }
        });
        this._setFinalStep();
    }

    /** @ignore */
    private _setFinalStep(): void {
        const lastNonSummaryStep = this._getLastNonSummaryStep();
        if (lastNonSummaryStep) {
            if (this.steps.last.isSummary && !this.displaySummaryStep) {
                this.steps.last.removeFromDom();
            }
            if (lastNonSummaryStep.content) {
                lastNonSummaryStep.content.tallContent = true;
            }
            lastNonSummaryStep.setFinalStep(true);
        }
    }

    /** @ignore */
    private _showSummary(): void {
        this.steps.forEach((step) => {
            if (!step.isSummary) {
                step.completed = true;
            }
        });
        const summary = this.steps.find((step) => step.isSummary);
        if (summary) {
            summary.content.tallContent = true;
            this.contentTemplates = [summary.content.contentTemplate];
        }
    }

    /** @ignore */
    private _isCurrentStepSummary(): boolean {
        return this.steps.some((step) => step.status === CURRENT_STEP_STATUS && step.isSummary);
    }

    /** @ignore */
    private _getCurrentStep(): WizardStepComponent {
        return this.steps.filter(
            (step) => step.status === CURRENT_STEP_STATUS || step.status === ACTIVE_STEP_STATUS
        )[0];
    }

    /** @ignore */
    private _shrinkWhileAnyStepIsTooNarrow(): void {
        // Add small delay for elements to render appropriately.
        setTimeout(() => {
            this.stackedStepsLeft = [];
            this.stackedStepsRight = [];
            this.steps.first.stepIndicator?.setStackedItems(this.stackedStepsLeft);
            this._getLastNonSummaryStep().stepIndicator?.setStackedItems(this.stackedStepsRight);
            this._resetStepClasses();
            let i = 0;
            while (this._anyStepIsTooNarrow() && i < this.steps.length - 1) {
                i++;
                this._wizardShrinking();
            }
        }, 10);
    }

    /** @ignore */
    private _anyStepIsTooNarrow(): boolean {
        return this.steps.some((step) => step.getStepClientWidth() < STEP_MIN_WIDTH);
    }

    /** @ignore */
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

    /** @ignore */
    private _getLastNonSummaryStep(): WizardStepComponent {
        if (this.steps.last.isSummary && !this.displaySummaryStep) {
            return this.steps.toArray()[this.steps.length - 2];
        }

        return this.steps.last;
    }
}
