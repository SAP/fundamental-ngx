import { Component } from '@angular/core';
import { TokenComponent } from '@fundamental-ngx/core/token';

@Component({
    selector: 'fd-token-display-example',
    templateUrl: './token-display-example.component.html',
    styles: [
        `
            fd-token {
                padding-right: 4px;
            }
        `
    ],
    imports: [TokenComponent]
})
export class TokenDisplayExampleComponent {}
