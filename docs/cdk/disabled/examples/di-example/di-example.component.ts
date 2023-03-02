import { Component } from '@angular/core';

@Component({
    selector: 'fundamental-ngx-cdk-disabled-di-example',
    templateUrl: './di-example.component.html',
    styles: [
        `
            .disabled-list-example.is-disabled,
            .disabled-list-example .is-disabled {
                opacity: 0.5;
            }
        `
    ]
})
export class DiExampleComponent {
    rootElementDisabled = false;
    firstElementDisabled = false;

    constructor() {}
}
