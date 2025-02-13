import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewEncapsulation,
    inject
} from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Nullable } from '@fundamental-ngx/cdk/utils';
import { WizardModule, WizardStepStatus } from '@fundamental-ngx/core/wizard';

import { NgTemplateOutlet } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { PreparedWizardGeneratorItem, WizardGeneratorItem } from '../../interfaces/wizard-generator-item.interface';
import { WizardNavigationButtons } from '../../interfaces/wizard-navigation-buttons.interface';
import { WizardGeneratorService } from '../../wizard-generator.service';
import { WizardGeneratorStepComponent } from '../wizard-generator-step/wizard-generator-step.component';
import { WizardSummaryStepComponent } from '../wizard-summary-step/wizard-summary-step.component';

export interface WizardStepChange {
    id: string;
    status: WizardStepStatus;
}

@Component({
    selector: 'fdp-wizard-body',
    templateUrl: './wizard-body.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        WizardModule,
        WizardGeneratorStepComponent,
        WizardSummaryStepComponent,
        ButtonComponent,
        ContentDensityDirective,
        NgTemplateOutlet
    ]
})
export class WizardBodyComponent implements OnInit {
    /**
     * @description Whether or not apply responsive paddings styling.
     */
    @Input()
    responsivePaddings = true;

    /**
     * @description Button labels to be used in Wizard navigation
     */
    @Input()
    navigationButtonLabels: Required<WizardNavigationButtons>;

    /**
     * @description Whether or not to append the step to the wizard. If false, each step will be displayed on a different page.
     * Default is true.
     */
    @Input()
    appendToWizard = true;

    /**
     * @description Custom height to use for the wizard's content pane. By default, this value is calc(100vh - 144px), where 144px
     * is the combined height of the Shellbar, wizard header and wizard footer.
     */
    @Input()
    contentHeight: Nullable<string>;

    /**
     * @description Whether or not Wizard is currently on the first step
     */
    @Input()
    isFirstStep = false;

    /**
     * @description Whether Wizard is currently on the last step.
     */
    @Input()
    isLastStep = false;

    /**
     * Whether next step is a Summary step.
     */
    @Input()
    isNextStepSummary = false;

    /**
     * @description Boolean flag indicating whether to display Summary step in Wizard progress bar.
     */
    @Input()
    displaySummaryStep = false;

    /**
     * User-defined template for "Go Next" button.
     */
    @Input()
    goNextButtonTemplate: TemplateRef<any>;

    /**
     * User-defined template for "Finish" button.
     */
    @Input()
    finishButtonTemplate: TemplateRef<any>;

    /**
     * User-defined template for summary step.
     */
    @Input()
    customSummaryStepTemplate?: TemplateRef<HTMLElement>;

    /** User-defined template for "Review" button */
    @Input()
    reviewButtonTemplate?: TemplateRef<HTMLElement>;

    /**
     * @description Is current step is summary step.
     */
    @Input()
    isSummaryStep = false;

    /** If navigation buttons should be visible. */
    @Input()
    navigationButtons = true;

    /** Whether or not all form items should have identical layout provided for form group. */
    @Input()
    unifiedLayout = true;

    /** Whether current step is a branching step. */
    @Input()
    isBranchingStep = false;

    /** Whether current step is completed */
    @Input()
    isCurrentStepCompleted = false;

    /** Whether order of steps was changed  */
    @Input()
    stepsOrderChanged = false;

    /**
     * @description Emits when some step status has been changed.
     */
    @Output()
    statusChange = new EventEmitter<WizardStepChange>();

    /**
     * @description Emits when "Go next" button has been clicked
     */
    @Output()
    goNext = new EventEmitter<void>();

    /**
     * @description Emits when "Finish" button has been clicked
     */
    @Output()
    finish = new EventEmitter<void>();

    /**
     * @hidden
     * An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)
     */
    private readonly _destroyRef = inject(DestroyRef);

    /**
     * @hidden
     */
    private _visibleItems: PreparedWizardGeneratorItem[];

    /**
     * @description Array of visible Wizard Steps.
     */

    set visibleItems(items: PreparedWizardGeneratorItem[]) {
        this._visibleItems = items;
    }

    get visibleItems(): PreparedWizardGeneratorItem[] {
        return this._visibleItems || this._wizardGeneratorService.items;
    }

    /** @hidden */

    constructor(
        private _wizardGeneratorService: WizardGeneratorService,
        private _cd: ChangeDetectorRef
    ) {}

    /**
     * @hidden
     */
    _goNextFn: () => void = () => this.goNext.emit();

    /**
     * @hidden
     */
    _finishFn: () => void = () => this.finish.emit();

    /**
     * @description Custom step status change validator function.
     * @param index Current step index.
     * @returns {Promise<boolean>} If this step status can be changed.
     */
    stepClickValidatorFn(index: number): () => Promise<boolean> {
        return async () => {
            const currentStepIndex = this._wizardGeneratorService.getCurrentStepIndex();
            const isSummaryStep = this._visibleItems[currentStepIndex]?.summary === true;

            if (index === currentStepIndex || isSummaryStep) {
                return true;
            }

            if (this._visibleItems.slice(0, index).find((i) => !i.completed && !i.summary)) {
                return false;
            }

            return await firstValueFrom(this._wizardGeneratorService.validateStepForms(true));
        };
    }

    /**
     * @hidden
     */
    ngOnInit(): void {
        this._wizardGeneratorService
            .getVisibleSteps()
            .pipe(debounceTime(50), takeUntilDestroyed(this._destroyRef))
            .subscribe((visibleSteps) => {
                this._visibleItems = visibleSteps;
                this._cd.detectChanges();
            });
    }

    /**
     * @description Callback function for status change.
     * @param id step ID.
     * @param status new step status.
     */
    stepStatusChanged(id: string, status: WizardStepStatus): void {
        this.statusChange.emit({
            id,
            status
        });
    }

    /** @hidden */
    stepClicked(stepId: string): void {
        const stepIndex = this._wizardGeneratorService.getStepIndex(stepId);
        this._wizardGeneratorService.setNextStepIndex(stepIndex + 1);
    }

    /**
     * @hidden
     * @param _index
     * @param item
     * @returns
     */
    _trackFn(_index: number, item: WizardGeneratorItem): string {
        return item.id;
    }
}
