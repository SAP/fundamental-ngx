import { Component } from '@angular/core';
import { ButtonModule } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fd-button-menu-example',
    templateUrl: './button-menu-example.component.html',
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
export class ButtonMenuExampleComponent {}
