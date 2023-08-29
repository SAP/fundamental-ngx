import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';
import { FormGeneratorService } from '@fundamental-ngx/platform/form';

import { WizardGeneratorService } from '../../wizard-generator.service';
import { BaseWizardGenerator } from '../../base-wizard-generator';
import { WizardGeneratorFinishButtonDirective } from '../../directives/wizard-generator-finish-button.directive';
import { WizardGeneratorGoNextButtonDirective } from '../../directives/wizard-generator-go-next-button.directive';
import { WizardGeneratorSummaryStepDirective } from '../../directives/wizard-generator-summary-step.directive';
import { WizardGeneratorReviewButtonDirective } from '../../directives/wizard-generator-review-button.directive';
import { WizardBodyComponent } from '../wizard-body/wizard-body.component';
import { NgIf } from '@angular/common';
import { WizardModule } from '@fundamental-ngx/core/wizard';
import { RepeatDirective } from '@fundamental-ngx/cdk/utils';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';

@Component({
    selector: 'fdp-wizard-generator',
    templateUrl: './wizard-generator.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [WizardGeneratorService, FormGeneratorService],
    standalone: true,
    imports: [NgIf, WizardBodyComponent, WizardModule, RepeatDirective, SkeletonModule]
})
export class WizardGeneratorComponent extends BaseWizardGenerator {
    /**
     * User-defined template for "Finish" button.
     */
    @ContentChild(WizardGeneratorFinishButtonDirective, { read: TemplateRef })
    finishButtonTemplate: TemplateRef<HTMLElement>;

    /**
     * User-defined template for "Go Next" button.
     */
    @ContentChild(WizardGeneratorGoNextButtonDirective, { read: TemplateRef })
    goNextButtonTemplate: TemplateRef<HTMLElement>;

    /**
     * User-defined template for Summary step.
     */
    @ContentChild(WizardGeneratorSummaryStepDirective, { read: TemplateRef })
    customSummaryStepTemplate: TemplateRef<HTMLElement>;

    /**
     * User-defined template for "Review" button
     */
    @ContentChild(WizardGeneratorReviewButtonDirective, { read: TemplateRef })
    reviewButtonTemplate: TemplateRef<HTMLElement>;

    /** @hidden */
    constructor(_wizardGeneratorService: WizardGeneratorService, _cd: ChangeDetectorRef) {
        super(_wizardGeneratorService, _cd);
    }
}
