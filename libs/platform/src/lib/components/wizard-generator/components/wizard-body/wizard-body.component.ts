import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { WizardStepStatus } from '@fundamental-ngx/core/wizard';
import { debounceTime, takeWhile } from 'rxjs/operators';
import { WizardGeneratorItem } from '../../interfaces/wizard-generator-item.interface';
import { WizardNavigationButtons } from '../../interfaces/wizard-navigation-buttons.interface';
import { WizardGeneratorService } from '../../wizard-generator.service';

export interface WizardStepChange {
    id: string;
    status: WizardStepStatus;
}

@Component({
    selector: 'fdp-wizard-body',
    templateUrl: './wizard-body.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WizardBodyComponent implements OnInit, OnDestroy {

    /**
     * @description Whether or not apply responsive paddings styling.
     */
    @Input()
    responsivePaddings = false;

    /**
     * @description Button labels to be used in Wizard navigation
     */
    @Input()
    navigationButtonLabels: WizardNavigationButtons;

    /**
     * @description Whether or not to append the step to the wizard. If false, each step will be displayed on a different page.
     * Default is true.
     */
    @Input() appendToWizard = true;

    /**
     * @description Custom height to use for the wizard's content pane. By default, this value is calc(100vh - 144px), where 144px
     * is the combined height of the shellbar, wizard header and wizard footer.
     */
    @Input()
    contentHeight: string;

    /**
     * @description Whether or not Wizard is currently on the first step
     */
    @Input() isFirstStep = false;

    /**
     * @description Whether or not Wizard is currently on the last step
     */
    @Input() isLastStep = false;

    /**
     * @description Boolean flag indicating whether or not to append Summary page as the last step.
     */
    @Input() addSummary = false;

    /**
     * @description Is current step is summary step.
     */
    @Input() isSummaryStep = false;

    /**
     * @description Array of visible Wizard Steps.
     */
    get visibleItems(): WizardGeneratorItem[] {
        return this._visibleItems || this._wizardGeneratorService.items;
    }

    set visibleItems(items: WizardGeneratorItem[]) {
        this._visibleItems = items;
    }

    /**
     * @description Emits when some step status has been changed.
     */
    @Output() statusChange = new EventEmitter<WizardStepChange>();

    /**
     * @description Emits when "Go next" button has been clicked
     */
    @Output() goNext = new EventEmitter<void>();

    /**
     * @description Emits when "Finish" button has been clicked
     */
    @Output() finish = new EventEmitter<void>();

    /**
     * @hidden
     */
    private _allowSubscribe = true;

    /**
     * @hidden
     */
    private _visibleItems: WizardGeneratorItem[];

    /** @hidden */
    constructor(
        private _wizardGeneratorService: WizardGeneratorService,
        private _cd: ChangeDetectorRef
    ) {
    }

    /**
     * @hidden
     */
    ngOnInit(): void {
        this._wizardGeneratorService.getVisibleSteps()
        .pipe(takeWhile(() => this._allowSubscribe), debounceTime(50))
        .subscribe((visibleSteps) => {
            this._visibleItems = visibleSteps;
            this._cd.detectChanges();
        });
    }

    /**
     * @hidden
     */
    ngOnDestroy(): void {
        this._allowSubscribe = false;
    }

    /**
     * @description Callback function for status change.
     * @param id step ID.
     * @param status new step status.
     */
    stepStatusChanged(id: string, status: WizardStepStatus): void {
        this.statusChange.emit({
            id: id,
            status: status
        });
    }

    /**
     * @description Custom step status change validator function.
     * @param index Current step index.
     * @returns {Promise<boolean>} If this step status can be changed.
     */
    stepClickValidatorFn(index: number): () => Promise<boolean> {
        return async () => {

            if (index === this._wizardGeneratorService.getCurrentStepIndex()) {
                return true;
            }

            return await this._wizardGeneratorService.validateStepForms(true).toPromise();
        }
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
