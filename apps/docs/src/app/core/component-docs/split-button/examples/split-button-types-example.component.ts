import { Component } from '@angular/core';

@Component({
    selector: 'fd-split-button-types-example',
    templateUrl: './split-button-types-example.component.html',
    styleUrls: ['./split-button-examples.component.scss']
})
export class ButtonSplitTypesExampleComponent {
    itemClicked() {
        alert('Item Clicked!');
    }

    primaryButtonClicked() {
        alert('Primary Button Clicked!');
    }

}