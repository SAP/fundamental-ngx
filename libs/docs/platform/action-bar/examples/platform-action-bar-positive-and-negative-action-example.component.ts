import { Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { PlatformActionBarModule } from '@fundamental-ngx/platform/action-bar';
import { PlatformActionButtonGroupModule } from '@fundamental-ngx/platform/action-button-group';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';

@Component({
    selector: 'fdp-platform-action-bar-positive-and-negative-action-example',
    templateUrl: './platform-action-bar-positive-and-negative-action-example.component.html',
    styleUrls: ['./platform-action-bar-positive-and-negative-action-example.component.scss'],
    standalone: true,
    imports: [PlatformActionBarModule, ContentDensityDirective, PlatformActionButtonGroupModule, PlatformButtonModule]
})
export class PlatformActionBarWithPositiveNegativeActionsExampleComponent {}
