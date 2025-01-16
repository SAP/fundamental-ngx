import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import { SwitchComponent } from '@fundamental-ngx/core/switch';

@Component({
    selector: 'fd-switch-binding-example',
    templateUrl: './switch-binding-example.component.html',
    styleUrls: ['./switch-binding-example.component.scss'],
    imports: [FormLabelComponent, SwitchComponent, FormsModule, ButtonComponent]
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
