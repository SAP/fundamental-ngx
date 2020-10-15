import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { WizardStepComponent } from '../wizard-step/wizard-step.component';

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

    /** @hidden */
    stackedItems: WizardStepComponent[];

    /**
     * Event emitted when this step indicator is clicked.
     */
    @Output()
    stepIndicatorItemClicked = new EventEmitter<WizardStepComponent>();

    constructor(private _cdRef: ChangeDetectorRef) {}

    /** @hidden */
    popoverStepIndicatorClicked(event: MouseEvent): void {
        if (this.stackedItems && this.stackedItems.length) {
            event.preventDefault();
        }
    }

    /** @hidden */
    stepItemClicked(step?: WizardStepComponent, event?: MouseEvent): void {
        event.preventDefault();
        this.stepIndicatorItemClicked.emit(step);
    }

    /** @hidden */
    setStackedItems(items: WizardStepComponent[]): void {
        this.stackedItems = items;
        this._cdRef.detectChanges();
    }
}
