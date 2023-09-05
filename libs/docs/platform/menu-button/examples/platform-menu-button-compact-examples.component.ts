import { Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';
import { PlatformMenuButtonModule } from '@fundamental-ngx/platform/menu-button';

@Component({
    selector: 'fdp-platform-menu-button-compact-example',
    templateUrl: './platform-menu-button-compact-example.component.html',
    standalone: true,
    imports: [PlatformMenuButtonModule, ContentDensityDirective, PlatformMenuModule]
})
export class PlatformMenuButtonCompactExampleComponent {
    basicMenuData: any[];
    item: string;

    onItemSelect(item: string): void {
        this.item = item;
    }
}
