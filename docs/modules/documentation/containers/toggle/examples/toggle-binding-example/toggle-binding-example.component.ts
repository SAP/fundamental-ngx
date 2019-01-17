import { Component } from '@angular/core';

@Component({
    selector: 'fd-toggle-binding-example',
    templateUrl: './toggle-binding-example.component.html',
    styleUrls: ['./toggle-binding-example.component.scss']
})
export class ToggleBindingExampleComponent {

    firstToggle = false;
    secondToggle = false;

    toggleBoth() {
        this.firstToggle = !this.firstToggle;
        this.secondToggle = !this.secondToggle;
    }

    toggleOne() {
        this.firstToggle = !this.firstToggle;
    }

    toggleTwo() {
        this.secondToggle = !this.secondToggle;
    }
}
