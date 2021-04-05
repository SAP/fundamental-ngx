import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

@Component({
    selector: 'fd-fixed-card-layout-examples',
    templateUrl: './fixed-card-layout-examples.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FixedCardLayoutExampleComponent {
    cardsHidden = [];

    constructor(private _changeDetectorRef: ChangeDetectorRef) {}

    isHidden(card: string): boolean {
        return this.cardsHidden.some(_card => _card === card);
    }

    update(): void {
        this._changeDetectorRef.detectChanges();
    }

    cardDraggedDropped(dropEvent: any): void {
        console.log('Items after drag abd drop: ', dropEvent.items);
    }
}
