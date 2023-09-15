import { Component, ViewEncapsulation } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { IconModule } from '@fundamental-ngx/core/icon';
import {
    PopoverBodyComponent,
    PopoverBodyFooterDirective,
    PopoverBodyHeaderDirective,
    PopoverComponent,
    PopoverControlComponent
} from '@fundamental-ngx/core/popover';

@Component({
    selector: 'fd-popover-example',
    templateUrl: './popover-example.component.html',
    styleUrls: ['popover-example.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        PopoverComponent,
        PopoverControlComponent,
        AvatarComponent,
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
