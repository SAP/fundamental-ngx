import { Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';
import { PlatformMenuButtonModule } from '@fundamental-ngx/platform/menu-button';

@Component({
    selector: 'fdp-platform-menu-button-example',
    templateUrl: './platform-menu-button-example.component.html',
    imports: [PlatformMenuButtonModule, PlatformMenuModule, ContentDensityDirective]
})
export class PlatformMenuButtonExampleComponent {
    basicMenuData: any[];
    item: string;

    onItemSelect(item: string): void {
        this.item = item;
    }
}
