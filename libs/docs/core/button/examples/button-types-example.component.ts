import { Component } from '@angular/core';
import { ButtonModule } from '@fundamental-ngx/core/button';

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
    standalone: true,
    imports: [ButtonModule]
})
export class ButtonTypesExampleComponent {}
