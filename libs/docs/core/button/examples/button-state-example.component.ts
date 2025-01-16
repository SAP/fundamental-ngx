import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fd-button-state-example',
    templateUrl: './button-state-example.component.html',
    styles: [
        `
            .fd-button {
                margin-right: 12px;
                margin-bottom: 10px;
            }
        `
    ],
    imports: [ButtonComponent]
})
export class ButtonStateExampleComponent {}
