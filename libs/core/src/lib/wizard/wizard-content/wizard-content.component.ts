import { Component, Input, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';

export type WizardContentBackground = 'solid' | 'list' | 'transparent';

@Component({
    selector: 'fd-wizard-content',
    templateUrl: './wizard-content.component.html',
    styleUrls: ['./wizard-content.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class WizardContentComponent {
    /**
     * The type of wizard background ('solid', 'list', or 'transparent').
     */
    @Input()
    background: WizardContentBackground;

    /** @hidden */
    @ViewChild('contentTemplate')
    contentTemplate: TemplateRef<any>;
}
