import { Component } from '@angular/core';

import { SwitchChangeEvent } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-semantic-switch-example',
    templateUrl: 'semantic-switch-example.component.html'
})
export class SemanticSwitchExampleComponent {
    switched = true;

    onSwitchChange(value: SwitchChangeEvent): void {}
}
