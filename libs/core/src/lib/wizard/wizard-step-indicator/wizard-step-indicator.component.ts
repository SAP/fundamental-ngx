import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    ViewChild
} from '@angular/core';
import { WizardStepComponent } from '../wizard-step/wizard-step.component';
import { ActionSheetComponent } from '@fundamental-ngx/core/action-sheet';
import { Subscription } from 'rxjs';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FD_WIZARD_STEP_INDICATOR } from '../constants';
import { WizardStepIndicator } from '../models/wizard-step';

@Component({
    selector: 'fd-wizard-step-indicator',
    templateUrl: './wizard-step-indicator.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: FD_WIZARD_STEP_INDICATOR,
            useExisting: WizardStepIndicatorComponent
        }
    ]
})
export class WizardStepIndicatorComponent implements WizardStepIndicator, OnDestroy {
    /**
     * The icon to use for this step.
     */
    @Input()
    glyph: Nullable<string>;

    /**
     * Event emitted when this step indicator is clicked.
     */
    @Output()
    stepIndicatorItemClicked = new EventEmitter<WizardStepComponent>();

    /** @hidden */
    @ViewChild(ActionSheetComponent)
    actionSheet: ActionSheetComponent;

    /** @hidden */
    stackedItems: WizardStepComponent[] = [];

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    constructor(private _cdRef: ChangeDetectorRef) {}

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    stepItemClicked(step?: WizardStepComponent, event?: MouseEvent): void {
        if (step && step.visited) {
            if (this.actionSheet) {
                this.actionSheet.close();
            }
            event?.preventDefault();
            this.stepIndicatorItemClicked.emit(step);
        }
    }

    /** @hidden */
    setStackedItems(items: WizardStepComponent[]): void {
        this.stackedItems = items || [];
        this._cdRef.detectChanges();
    }
}
