import { NgTemplateOutlet } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    ViewChild,
    signal
} from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import {
    ActionSheetBodyComponent,
    ActionSheetComponent,
    ActionSheetControlComponent,
    ActionSheetItemComponent
} from '@fundamental-ngx/core/action-sheet';
import { FD_DEFAULT_ICON_FONT_FAMILY, IconComponent, IconFont } from '@fundamental-ngx/core/icon';
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

    /** Glyph font family */
    @Input()
    glyphFont: IconFont = FD_DEFAULT_ICON_FONT_FAMILY;

    /**
     * Event emitted when this step indicator is clicked.
     */
    @Output()
    stepIndicatorItemClicked = new EventEmitter<WizardStepComponent>();

    /** @hidden */
    @ViewChild(ActionSheetComponent)
    actionSheet: ActionSheetComponent;

    /** @hidden */
    stackedItems$ = signal<WizardStepComponent[]>([]);

    /** @hidden */
    private _subscriptions = new Subscription();

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
        this.stackedItems$.set(items || []);
    }
}
