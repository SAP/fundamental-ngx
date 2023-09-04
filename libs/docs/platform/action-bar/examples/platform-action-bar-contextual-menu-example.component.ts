import { Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { PlatformActionBarModule } from '@fundamental-ngx/platform/action-bar';
import { PlatformActionButtonGroupModule } from '@fundamental-ngx/platform/action-button-group';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';

@Component({
    selector: 'fdp-platform-action-bar-contextual-menu-example',
    templateUrl: './platform-action-bar-contextual-menu-example.component.html',
    styleUrls: ['./platform-action-bar-contextual-menu-example.component.scss'],
    standalone: true,
    imports: [
        PlatformActionBarModule,
        ContentDensityDirective,
        PlatformActionButtonGroupModule,
        PlatformButtonModule,
        PlatformMenuModule
    ]
})
export class PlatformActionBarWithContextualMenuExampleComponent {
    onBackButtonClick(): void {
        alert('Back button clicked');
    }
}
