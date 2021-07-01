import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ViewEncapsulation
} from '@angular/core';
import { WizardGeneratorService } from '../../wizard-generator.service';
import { BaseWizardGenerator } from '../../base-wizard-generator';

@Component({
  selector: 'fdp-wizard-generator',
  templateUrl: './wizard-generator.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WizardGeneratorService]
})
export class WizardGeneratorComponent extends BaseWizardGenerator {

    /** @hidden */
    constructor(
        _wizardGeneratorService: WizardGeneratorService,
        _cd: ChangeDetectorRef
    ) {
        super(_wizardGeneratorService, _cd);
    }

}
