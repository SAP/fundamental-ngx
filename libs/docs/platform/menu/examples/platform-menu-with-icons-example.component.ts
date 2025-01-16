import { Component, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';

@Component({
    selector: 'fdp-platform-menu-with-icons-example',
    templateUrl: './platform-menu-with-icons-example.component.html',
    styleUrls: ['./platform-menu-example-styles.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [ButtonComponent, PlatformMenuModule, MenuModule]
})
export class PlatformMenuWithIconsExampleComponent {
    item = '';

    onItemSelect(item: string): void {
        this.item = item;
    }
}
