import { Component } from '@angular/core';

@Component({
    selector: 'fd-split-button-options-example',
    templateUrl: './split-button-options-example.component.html',
    styles: [
        `
            fd-split-button {
                margin-right: 12px;
            }
        `
    ]
})
export class ButtonSplitOptionsExampleComponent {
    itemClicked(): void {
        alert('Item Clicked!');
    }

    primaryButtonClicked(): void {
        alert('Primary Button Clicked!');
    }
}
