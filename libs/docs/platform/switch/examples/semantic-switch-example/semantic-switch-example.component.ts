import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { FdpFormGroupModule, PlatformSwitchModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-semantic-switch-example',
    templateUrl: 'semantic-switch-example.component.html',
    imports: [FdpFormGroupModule, PlatformSwitchModule, ContentDensityDirective, FormsModule]
})
export class SemanticSwitchExampleComponent {
    switched = true;

    onSwitchChange(): void {}
}
