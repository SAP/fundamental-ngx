import { Component, ViewEncapsulation } from '@angular/core';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ScrollbarDirective } from '@fundamental-ngx/core/scrollbar';
import { CdkScrollable } from '@angular/cdk/overlay';

@Component({
    selector: 'fdp-platform-menu-scrolling-example',
    templateUrl: './platform-menu-scrolling-example.component.html',
    styleUrls: ['./platform-menu-example-styles.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [CdkScrollable, ScrollbarDirective, ButtonModule, PlatformMenuModule]
})
export class PlatformMenuScrollingExampleComponent {}
