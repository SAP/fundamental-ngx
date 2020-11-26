import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild
} from '@angular/core';
import { WizardStepComponent } from '../wizard-step/wizard-step.component';
import { ActionSheetComponent } from '../../action-sheet/action-sheet.component';

@Component({
    selector: 'fd-wizard-step-indicator',
    templateUrl: './wizard-step-indicator.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WizardStepIndicatorComponent {
    /**
     * The icon to use for this step.
     */
    @Input()
    glyph: string;

    /**
     * Whether or not the step indicator (specifically, the action sheet) is compact.
     */
    @Input()
    compact = false;

    /**
     * Event emitted when this step indicator is clicked.
     */
    @Output()
    stepIndicatorItemClicked = new EventEmitter<WizardStepComponent>();

    @ViewChild(ActionSheetComponent)
    actionSheet: ActionSheetComponent;

    /** @hidden */
    stackedItems: WizardStepComponent[];

    constructor(private _cdRef: ChangeDetectorRef) {}

    /** @hidden */
    stepItemClicked(step?: WizardStepComponent, event?: MouseEvent): void {
        if (this.actionSheet) {
            this.actionSheet.close();
        }
        event.preventDefault();
        this.stepIndicatorItemClicked.emit(step);
    }

    /** @hidden */
    setStackedItems(items: WizardStepComponent[]): void {
        this.stackedItems = items;
        this._cdRef.detectChanges();
    }
}
