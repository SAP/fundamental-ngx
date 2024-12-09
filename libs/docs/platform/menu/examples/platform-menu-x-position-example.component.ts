import { Component, ViewEncapsulation } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';

@Component({
    selector: 'fdp-platform-menu-x-position-example',
    templateUrl: './platform-menu-x-position-example.component.html',
    styleUrls: ['./platform-menu-example-styles.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [ButtonComponent, PlatformMenuModule, AvatarComponent]
})
export class PlatformMenuXPositionExampleComponent {
    item = '';

    onItemSelect(item: string): void {
        this.item = item;
    }
}
