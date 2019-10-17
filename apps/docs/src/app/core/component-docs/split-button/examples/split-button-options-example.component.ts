import { Component } from '@angular/core';

@Component({
    selector: 'fd-split-button-options-example',
    templateUrl: './split-button-options-example.component.html',
    styleUrls: ['./split-button-examples.component.scss']
})
export class ButtonSplitOptionsExampleComponent {
    itemClicked() {
        alert('Item Clicked!');
    }

    primaryButtonClicked() {
        alert('Primary Button Clicked!');
    }

}