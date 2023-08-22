import { Component, ViewEncapsulation } from '@angular/core';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';
import { ButtonModule } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fdp-platform-menu-basic-example',
    templateUrl: './platform-menu-basic-example.component.html',
    styleUrls: ['./platform-menu-example-styles.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [ButtonModule, PlatformMenuModule, AvatarModule]
})
export class PlatformMenuBasicExampleComponent {
    item = '';

    onItemSelect(item: string): void {
        this.item = item;
    }
}
