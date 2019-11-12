import { Component } from '@angular/core';

@Component({
    selector: 'fd-split-button-programmatical-example',
    templateUrl: './split-button-programmatical-example.component.html',
    styleUrls: ['./split-button-examples.component.scss']
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