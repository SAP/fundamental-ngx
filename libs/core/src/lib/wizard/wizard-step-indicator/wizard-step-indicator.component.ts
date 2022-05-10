import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    ViewChild
} from '@angular/core';
import { WizardStepComponent } from '../wizard-step/wizard-step.component';
import { ActionSheetComponent } from '@fundamental-ngx/core/action-sheet';
import { Subscription } from 'rxjs';
import { ContentDensityService } from '@fundamental-ngx/core/utils';
import { Nullable } from '@fundamental-ngx/core/shared';

@Component({
    selector: 'fd-wizard-step-indicator',
    templateUrl: './wizard-step-indicator.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WizardStepIndicatorComponent implements OnInit, OnDestroy {
    /**
     * The icon to use for this step.
     */
    @Input()
    glyph: Nullable<string>;

    /**
     * Whether or not the step indicator (specifically, the action sheet) is compact.
     */
    @Input()
    compact?: boolean;

    /**
     * Event emitted when this step indicator is clicked.
     */
    @Output()
    stepIndicatorItemClicked = new EventEmitter<WizardStepComponent>();

    @ViewChild(ActionSheetComponent)
    actionSheet: ActionSheetComponent;

    /** @hidden */
    stackedItems: WizardStepComponent[];

    /** @hidden */
    private _subscriptions = new Subscription();

    constructor(private _cdRef: ChangeDetectorRef, @Optional() private _contentDensityService: ContentDensityService) {}

    /** @hidden */
    ngOnInit(): void {
        if (this.compact === undefined && this._contentDensityService) {
            this._subscriptions.add(
                this._contentDensityService._isCompactDensity.subscribe((isCompact) => {
                    this.compact = isCompact;
                    this._cdRef.markForCheck();
                })
            );
        }
    }

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
        this.stackedItems = items;
        this._cdRef.detectChanges();
    }
}
