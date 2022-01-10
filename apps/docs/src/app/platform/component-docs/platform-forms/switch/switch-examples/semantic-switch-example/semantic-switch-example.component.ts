import { Component } from '@angular/core';

@Component({
    selector: 'fdp-semantic-switch-example',
    templateUrl: 'semantic-switch-example.component.html'
})
export class SemanticSwitchExampleComponent {
    switched = true;

    onSwitchChange(): void {}
}
