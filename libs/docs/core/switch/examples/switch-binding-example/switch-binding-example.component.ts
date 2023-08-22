import { Component } from '@angular/core';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { FormsModule } from '@angular/forms';
import { SwitchModule } from '@fundamental-ngx/core/switch';
import { FormLabelModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-switch-binding-example',
    templateUrl: './switch-binding-example.component.html',
    styleUrls: ['./switch-binding-example.component.scss'],
    standalone: true,
    imports: [FormLabelModule, SwitchModule, FormsModule, ButtonModule]
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
