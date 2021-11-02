import { Component } from '@angular/core';

@Component({
    selector: 'fd-popover-mobile-example',
    templateUrl: './popover-mobile-example.component.html'
})
export class PopoverMobileExampleComponent {
    clickCount = 0;

    addClick(): void {
        this.clickCount++;
    }

    reset(): void {
        this.clickCount = 0;
    }

    accept(): void {
        alert('Accept button clicked..');
    }

    decline(): void {
        alert('Decline button clicked..');
    }
}
