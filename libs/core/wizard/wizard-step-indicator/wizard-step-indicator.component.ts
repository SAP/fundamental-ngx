import { NgTemplateOutlet } from '@angular/common';
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
import { Nullable } from '@fundamental-ngx/cdk/utils';
import {
    ActionSheetBodyComponent,
    ActionSheetComponent,
    ActionSheetControlComponent,
    ActionSheetItemComponent
} from '@fundamental-ngx/core/action-sheet';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { Subscription } from 'rxjs';
import { FD_WIZARD_STEP_INDICATOR } from '../constants';
import { WizardStepIndicator } from '../models/wizard-step';
import { WizardStepComponent } from '../wizard-step/wizard-step.component';

@Component({
    selector: 'fd-wizard-step-indicator',
    templateUrl: './wizard-step-indicator.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: FD_WIZARD_STEP_INDICATOR,
            useExisting: WizardStepIndicatorComponent
        }
    ],
    standalone: true,
    imports: [
        ActionSheetComponent,
        ActionSheetControlComponent,
        NgTemplateOutlet,
        ActionSheetBodyComponent,
        ActionSheetItemComponent,
        IconComponent
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

    /** @ignore */
    @ViewChild(ActionSheetComponent)
    actionSheet: ActionSheetComponent;

    /** @ignore */
    stackedItems: WizardStepComponent[] = [];

    /** @ignore */
    private _subscriptions = new Subscription();

    /** @ignore */
    constructor(private _cdRef: ChangeDetectorRef) {}

    /** @ignore */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @ignore */
    stepItemClicked(step?: WizardStepComponent, event?: MouseEvent): void {
        if (step && step.visited) {
            if (this.actionSheet) {
                this.actionSheet.close();
            }
            event?.preventDefault();
            this.stepIndicatorItemClicked.emit(step);
        }
    }

    /** @ignore */
    setStackedItems(items: WizardStepComponent[]): void {
        this.stackedItems = items || [];
        this._cdRef.detectChanges();
    }
}
