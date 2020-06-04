import { Component } from '@angular/core';

@Component({
    selector: 'fd-split-button-programmatical-example',
    templateUrl: './split-button-programmatical-example.component.html',
    styles: [
        `
            fd-split-button {
                margin-right: 12px;
            }
            .docs-button {
                margin-right: 12px;
            }
        `
    ]
})
export class ButtonSplitProgrammaticalExampleComponent {
    isOpen: boolean = false;

    itemClicked() {
        alert('Item Clicked!');
    }

    primaryButtonClicked() {
        alert('Primary Button Clicked!');
    }
}
