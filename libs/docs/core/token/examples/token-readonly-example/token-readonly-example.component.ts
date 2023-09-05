import { Component } from '@angular/core';
import { TokenModule } from '@fundamental-ngx/core/token';

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
    standalone: true,
    imports: [TokenModule]
})
export class TokenReadOnlyExampleComponent {}
