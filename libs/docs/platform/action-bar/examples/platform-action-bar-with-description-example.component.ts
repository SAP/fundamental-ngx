import { Component } from '@angular/core';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformActionButtonGroupModule } from '@fundamental-ngx/platform/action-button-group';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { PlatformActionBarModule } from '@fundamental-ngx/platform/action-bar';
@Component({
    selector: 'fdp-platform-action-bar-with-description-example',
    templateUrl: './platform-action-bar-with-description-example.component.html',
    styleUrls: ['./platform-action-bar-with-description-example.component.scss'],
    standalone: true,
    imports: [PlatformActionBarModule, ContentDensityDirective, PlatformActionButtonGroupModule, PlatformButtonModule]
})
export class PlatformActionBarWithDescriptionExampleComponent {}
