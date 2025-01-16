import { Component, ViewEncapsulation } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import {
    BarComponent,
    BarElementDirective,
    BarLeftDirective,
    BarMiddleDirective,
    BarRightDirective,
    ButtonBarComponent
} from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { IconComponent } from '@fundamental-ngx/core/icon';
import {
    PopoverBodyComponent,
    PopoverBodyFooterDirective,
    PopoverBodyHeaderDirective,
    PopoverComponent,
    PopoverControlComponent
} from '@fundamental-ngx/core/popover';
import { TitleComponent } from '@fundamental-ngx/core/title';

@Component({
    selector: 'fd-popover-example',
    templateUrl: './popover-example.component.html',
    styleUrls: ['popover-example.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [
        PopoverComponent,
        PopoverControlComponent,
        AvatarComponent,
        PopoverBodyComponent,
        IconComponent,
        PopoverBodyHeaderDirective,
        BarComponent,
        ButtonBarComponent,
        BarElementDirective,
        BarLeftDirective,
        BarMiddleDirective,
        BarRightDirective,
        ButtonComponent,
        TitleComponent,
        ContentDensityDirective,
        PopoverBodyFooterDirective,
        IconComponent
    ]
})
export class PopoverExampleComponent {}
