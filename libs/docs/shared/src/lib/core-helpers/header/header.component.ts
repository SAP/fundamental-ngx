import { Component } from '@angular/core';

@Component({
    selector: 'header',
    template: `
        <h1 class="header">
            <ng-content></ng-content>
        </h1>
    `,
    styles: [
        `
            .header {
                color: var(--sapPageHeader_TextColor);
                margin-top: 2rem;
                font-size: 2.2rem;
            }
        `
    ]
})
export class HeaderComponent {}
