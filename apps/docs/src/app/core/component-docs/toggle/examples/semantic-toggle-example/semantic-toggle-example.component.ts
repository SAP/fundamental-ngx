import { Component } from '@angular/core';

@Component({
    selector: 'semantic-toggle-example',
    templateUrl: 'semantic-toggle-example.component.html',
    styles: [
        `
            :host {
                display: block;
            }

            fd-toggle {
                margin-bottom: 20px;
            }
        `
    ]
})
export class SemanticToggleExampleComponent {

    checked: boolean = false;
}
