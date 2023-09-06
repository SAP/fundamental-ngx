import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { NgFor } from '@angular/common';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { LayoutGridModule } from '@fundamental-ngx/core/layout-grid';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { PlatformLinkModule } from '@fundamental-ngx/platform/link';
import {
    FormattedFormStep,
    WizardGeneratorSummaryItem
} from '../../../interfaces/wizard-generator-summary-item.interface';

@Component({
    selector: 'fdp-wizard-summary-section',
    templateUrl: './wizard-summary-section.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [NgFor, TitleComponent, LayoutGridModule, FormLabelComponent, PlatformLinkModule, FdTranslatePipe]
})
export class WizardSummarySectionComponent {
    /**
     * @description Current step for the section.
     */
    @Input()
    step: WizardGeneratorSummaryItem;

    /**
     * Emits when step edit button clicked.
     */
    @Output()
    editStep = new EventEmitter<string>();

    /**
     * @hidden
     * @description Sets current step on wizard.
     * @param event Mouse click event to prevent.
     */
    _editStep(event: MouseEvent | KeyboardEvent | TouchEvent): void {
        event.preventDefault();
        this.editStep.emit(this.step.id);
    }

    /** @hidden */
    _trackFn(_: number, form: FormattedFormStep): string {
        return form.id;
    }
}
