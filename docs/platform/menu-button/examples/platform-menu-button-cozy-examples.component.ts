import { Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';
import { PlatformMenuButtonModule } from '@fundamental-ngx/platform/menu-button';

@Component({
    selector: 'fdp-platform-menu-button-cozy-example',
    templateUrl: './platform-menu-button-cozy-example.component.html',
    standalone: true,
    imports: [PlatformMenuButtonModule, ContentDensityDirective, PlatformMenuModule]
})
export class PlatformMenuButtonCozyExampleComponent {
    basicMenuData: any[];
    item: string;

    onItemSelect(item: string): void {
        this.item = item;
    }
}
