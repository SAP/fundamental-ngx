import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

@Component({
    selector: 'fd-fixed-card-layout-examples',
    templateUrl: './fixed-card-layout-examples.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixedCardLayoutExampleComponent {
    card1Visibility = true;
    card2Visibility = true;
    card3Visibility = true;

    constructor(private _changeDetectorRef: ChangeDetectorRef) {}

    public showHideCard(card: string): void {
        if (card === 'card1') {
            this.card1Visibility = !this.card1Visibility;
        } else if (card === 'card2') {
            this.card2Visibility = !this.card2Visibility;
        } else if (card === 'card3') {
            this.card3Visibility = !this.card3Visibility;
        }
    }

    public onResized(): void {
        this._changeDetectorRef.markForCheck();
    }
}
