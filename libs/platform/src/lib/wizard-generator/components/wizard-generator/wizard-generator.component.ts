import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    TemplateRef,
    ViewEncapsulation
} from '@angular/core';

import { WizardGeneratorService } from '../../wizard-generator.service';
import { BaseWizardGenerator } from '../../base-wizard-generator';
import { WizardGeneratorFinishButtonDirective } from '../../directives/wizard-generator-finish-button.directive';
import { WizardGeneratorGoNextButtonDirective } from '../../directives/wizard-generator-go-next-button.directive';
import { WizardGeneratorSummaryStepDirective } from '../../directives/wizard-generator-summary-step.directive';

@Component({
  selector: 'fdp-wizard-generator',
  templateUrl: './wizard-generator.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WizardGeneratorService]
})
export class WizardGeneratorComponent extends BaseWizardGenerator {
    /**
     * User-defined template for "Finish" button.
     */
    @ContentChild(WizardGeneratorFinishButtonDirective, {read: TemplateRef})
    finishButtonTemplate: TemplateRef<any>;

    /**
     * User-defined template for "Go Next" button.
     */
    @ContentChild(WizardGeneratorGoNextButtonDirective, {read: TemplateRef})
    goNextButtonTemplate: TemplateRef<any>;

    /**
     * User-defined template for Summary step.
     */
    @ContentChild(WizardGeneratorSummaryStepDirective, {read: TemplateRef})
    customsummaryStepTemplate: TemplateRef<any>;

    /** @hidden */
    constructor(
        _wizardGeneratorService: WizardGeneratorService,
        _cd: ChangeDetectorRef
    ) {
        super(_wizardGeneratorService, _cd);
    }
}
