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

    /**
     * Whether or not element can be hidden when step status is completed.
     */
    @Input()
    set canHide(value: boolean) {
        this._canHide = value;

        if (!value) {
            this._showElement();
        }
    }

    get canHide(): boolean {
        return this._canHide;
    }

    /** @hidden */
    private _canHide = true;

    /** @hidden */
    constructor(private _elRef: ElementRef) {}

    /** @hidden */
    _getElRef(): ElementRef {
        return this._elRef;
    }

    /** @hidden */
    _showElement(): void {
        this._elRef.nativeElement.style.removeProperty('display');
    }

    /** @hidden */
    _hideElement(): void {
        this._elRef.nativeElement.style.display = 'none';
    }
}
