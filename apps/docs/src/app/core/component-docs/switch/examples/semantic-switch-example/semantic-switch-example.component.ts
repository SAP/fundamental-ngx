import { Component } from '@angular/core';

@Component({
    selector: 'semantic-switch-example',
    templateUrl: 'semantic-switch-example.component.html',
    styles: [
        `
            :host {
                display: block;
            }

            fd-switch {
                margin-bottom: 20px;
            }
        `
    ]
})
export class SemanticSwitchExampleComponent {

    checked: boolean = false;
}
