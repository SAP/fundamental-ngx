import { CdkScrollable } from '@angular/cdk/overlay';
import { Component, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';

@Component({
    selector: 'fdp-platform-menu-scrolling-example',
    templateUrl: './platform-menu-scrolling-example.component.html',
    styleUrls: ['./platform-menu-example-styles.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [CdkScrollable, ScrollbarDirective, ButtonComponent, PlatformMenuModule]
})
export class PlatformMenuScrollingExampleComponent {}
