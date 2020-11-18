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

    /** @hidden */
    displayed = true;

    constructor(private _elRef: ElementRef) {}

    /** @hidden */
    getElRef(): ElementRef {
        return this._elRef;
    }
}
