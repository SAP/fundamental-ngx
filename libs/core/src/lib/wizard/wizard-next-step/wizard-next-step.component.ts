import { ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';

@Component({
    selector: 'fd-wizard-next-step',
    templateUrl: './wizard-next-step.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WizardNextStepComponent {
    /**
     * Whether or not the next step button should float directly above the footer.
     */
    @Input()
    floating = false;

    constructor(private _elRef: ElementRef) {}

    /** @hidden */
    _getElRef(): ElementRef {
        return this._elRef;
    }
}
