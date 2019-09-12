import { Component } from '@angular/core';

@Component({
    selector: 'separator',
    template: ``,
    styles: [
        `
            :host {
                display: block;
                margin-top: 50px;
                border-bottom: 1px solid #e3e3e3;
            }
        `
    ]
})
export class SeparatorComponent {}
