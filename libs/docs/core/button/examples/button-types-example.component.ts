import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fd-button-types-example',
    templateUrl: './button-types-example.component.html',
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
export class ButtonTypesExampleComponent {}
