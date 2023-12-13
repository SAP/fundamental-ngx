import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef, ViewChild } from '@angular/core';
import { WizardNextStepComponent } from '../wizard-next-step/wizard-next-step.component';
import { WizardSize } from '../wizard-progress-bar/wizard-progress-bar.directive';

export type WizardContentBackground = 'solid' | 'list' | 'transparent';

@Component({
    selector: 'fd-wizard-content',
    templateUrl: './wizard-content.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './wizard-content.component.scss',
    standalone: true
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

    /** @ignore */
    @ViewChild('contentTemplate')
    contentTemplate: TemplateRef<any>;

    /** @ignore */
    @ContentChild(WizardNextStepComponent)
    nextStep: WizardNextStepComponent;

    /** @ignore */
    wizardContentId: string;

    /** @ignore */
    tallContent = false;
}
