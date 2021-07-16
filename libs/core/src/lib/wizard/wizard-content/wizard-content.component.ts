import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef, ViewChild } from '@angular/core';
import { WizardSize } from '../wizard-progress-bar/wizard-progress-bar.directive';
import { WizardNextStepComponent } from '../wizard-next-step/wizard-next-step.component';

export type WizardContentBackground = 'solid' | 'list' | 'transparent';

@Component({
    selector: 'fd-wizard-content',
    templateUrl: './wizard-content.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./wizard-content.component.scss']
})
export class WizardContentComponent {
    /**
     * The type of wizard background ('solid', 'list', or 'transparent').
     */
    @Input()
    contentBackground: WizardContentBackground;

    /**
     * Size (horizontal paddings) of the wizard content.
     */
    @Input()
    size: WizardSize;

    /** @hidden */
    @ViewChild('contentTemplate')
    contentTemplate: TemplateRef<any>;

    /** @hidden */
    @ContentChild(WizardNextStepComponent)
    nextStep: WizardNextStepComponent;

    /** @hidden */
    wizardContentId: string;

    /** @hidden */
    tallContent = false;
}
