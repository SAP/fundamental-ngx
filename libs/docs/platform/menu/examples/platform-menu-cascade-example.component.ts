import { Component, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';

@Component({
    selector: 'fdp-platform-menu-cascade-example',
    templateUrl: './platform-menu-cascade-example.component.html',
    styleUrls: ['./platform-menu-example-styles.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [ButtonComponent, PlatformMenuModule]
})
export class PlatformMenuCascadeExampleComponent {
    item = '';

    onItemSelect(item: string): void {
        this.item = item;
    }
}
