import { Component } from '@angular/core';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';
import { PlatformMenuButtonModule } from '@fundamental-ngx/platform/menu-button';

@Component({
    selector: 'fdp-platform-menu-button-state-example',
    templateUrl: './platform-menu-button-state-example.component.html',
    imports: [PlatformMenuButtonModule, PlatformMenuModule]
})
export class PlatformMenuButtonStateExampleComponent {
    basicMenuData: any[];
    item: string;

    onItemSelect(item: string): void {
        this.item = item;
    }
}
