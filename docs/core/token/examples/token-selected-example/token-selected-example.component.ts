import { Component } from '@angular/core';
import { TokenComponent } from '@fundamental-ngx/core/token';

@Component({
    selector: 'fd-token-selected-example',
    templateUrl: './token-selected-example.component.html',
    styles: [
        `
            fd-token {
                padding-right: 4px;
            }
        `
    ],
    standalone: true,
    imports: [TokenComponent]
})
export class TokenSelectedExampleComponent {}
