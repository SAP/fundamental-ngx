import { Component } from '@angular/core';

@Component({
    selector: 'fd-token-example',
    templateUrl: './token-example.component.html',
    styles: [
        `
            fd-token {
                padding-right: 4px;
            }
        `
    ]
})
export class TokenExampleComponent {
    isOpen = true;
}
