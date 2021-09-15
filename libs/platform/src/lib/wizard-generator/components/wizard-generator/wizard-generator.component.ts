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
import { FdpWizardGeneratorFinishButtonDirective } from '../../directives/fdp-wizard-generator-finish-button.directive';
import { FdpWizardGeneratorGoNextButtonDirective } from '../../directives/fdp-wizard-generator-go-next-button.directive';

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
    @ContentChild(FdpWizardGeneratorFinishButtonDirective, {read: TemplateRef})
    finishButtonTemplate: TemplateRef<any>;

    /**
     * User-defined template for "Go Next" button.
     */
    @ContentChild(FdpWizardGeneratorGoNextButtonDirective, {read: TemplateRef})
    goNextButtonTemplate: TemplateRef<any>;

    /** @hidden */
    constructor(
        _wizardGeneratorService: WizardGeneratorService,
        _cd: ChangeDetectorRef
    ) {
        super(_wizardGeneratorService, _cd);
    }
}
