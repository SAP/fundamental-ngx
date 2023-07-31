import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';

@Component({
    selector: 'fd-popover-mobile-example',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './popover-mobile-example.component.html'
})
export class PopoverMobileExampleComponent {
    private _cdr = inject(ChangeDetectorRef);
    clickCount = 0;

    addClick(): void {
        this.clickCount++;
        this._cdr.detectChanges();
    }

    reset(): void {
        this.clickCount = 0;
        this._cdr.detectChanges();
    }

    accept(): void {
        alert('Accept button clicked..');
    }

    decline(): void {
        alert('Decline button clicked..');
    }
}
