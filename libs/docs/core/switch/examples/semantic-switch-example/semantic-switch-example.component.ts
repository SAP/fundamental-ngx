import { Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { SwitchModule } from '@fundamental-ngx/core/switch';
import { FormLabelModule } from '@fundamental-ngx/core/form';

@Component({
    selector: 'fd-semantic-switch-example',
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
    ],
    standalone: true,
    imports: [FormLabelModule, SwitchModule, ContentDensityDirective]
})
export class SemanticSwitchExampleComponent {
    checked = false;
}
