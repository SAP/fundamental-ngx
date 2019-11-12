import { Component } from '@angular/core';

@Component({
    selector: 'fd-split-button-template-example',
    templateUrl: './split-button-template-example.component.html',
    styleUrls: ['./split-button-examples.component.scss']
})
export class ButtonSplitTemplateExampleComponent {
    itemClicked() {
        alert('Item Clicked!');
    }

    primaryButtonClicked() {
        alert('Primary Button Clicked!');
    }

}
