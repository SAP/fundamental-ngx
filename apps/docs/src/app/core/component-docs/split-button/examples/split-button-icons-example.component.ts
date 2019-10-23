import { Component } from '@angular/core';

@Component({
    selector: 'fd-split-button-icons-example',
    templateUrl: './split-button-icons-example.component.html',
    styleUrls: ['./split-button-examples.component.scss']
})
export class ButtonSplitTypesIconsComponent {
    itemClicked() {
        alert('Item Clicked!');
    }

    primaryButtonClicked() {
        alert('Primary Button Clicked!');
    }

}