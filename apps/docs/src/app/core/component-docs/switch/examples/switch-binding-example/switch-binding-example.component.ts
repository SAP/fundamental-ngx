import { Component } from '@angular/core';

@Component({
    selector: 'fd-switch-binding-example',
    templateUrl: './switch-binding-example.component.html',
    styleUrls: ['./switch-binding-example.component.scss']
})
export class SwitchBindingExampleComponent {
    firstSwitch = false;
    secondSwitch = false;

    switchBoth(): void {
        this.firstSwitch = !this.firstSwitch;
        this.secondSwitch = !this.secondSwitch;
    }

    switchOne(): void {
        this.firstSwitch = !this.firstSwitch;
    }

    switchTwo(): void {
        this.secondSwitch = !this.secondSwitch;
    }
}
