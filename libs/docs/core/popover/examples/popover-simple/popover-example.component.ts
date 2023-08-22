import { Component, ViewEncapsulation } from '@angular/core';
import { PopoverBodyFooterDirective } from '@fundamental-ngx/core/popover';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { BarModule } from '@fundamental-ngx/core/bar';
import { PopoverBodyHeaderDirective } from '@fundamental-ngx/core/popover';
import { IconModule } from '@fundamental-ngx/core/icon';
import { PopoverBodyComponent } from '@fundamental-ngx/core/popover';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { PopoverComponent } from '@fundamental-ngx/core/popover';

@Component({
    selector: 'fd-popover-example',
    templateUrl: './popover-example.component.html',
    styleUrls: ['popover-example.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        PopoverComponent,
        PopoverControlComponent,
        AvatarModule,
        PopoverBodyComponent,
        IconModule,
        PopoverBodyHeaderDirective,
        BarModule,
        ButtonModule,
        ContentDensityDirective,
        PopoverBodyFooterDirective
    ]
})
export class PopoverExampleComponent {}
