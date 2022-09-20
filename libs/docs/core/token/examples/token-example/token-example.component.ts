import { Component } from '@angular/core';

@Component({
    selector: 'fd-token-example',
    templateUrl: './token-example.component.html',
    styles: [
        `
            fd-token {
                margin-right: 4px;
            }
        `
    ]
})
export class TokenExampleComponent {
    isOpen = true;
}
