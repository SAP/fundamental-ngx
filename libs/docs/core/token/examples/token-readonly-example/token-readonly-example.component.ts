import { Component } from '@angular/core';
import { TokenComponent } from '@fundamental-ngx/core/token';

@Component({
    selector: 'fd-token-readonly-example',
    templateUrl: './token-readonly-example.component.html',
    styles: [
        `
            fd-token {
                padding-right: 4px;
            }
        `
    ],
    imports: [TokenComponent]
})
export class TokenReadOnlyExampleComponent {}
