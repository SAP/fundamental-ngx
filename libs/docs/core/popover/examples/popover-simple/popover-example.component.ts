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
import { IconModule } from '@fundamental-ngx/core/icon';
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
    standalone: true,
    imports: [
        PopoverComponent,
        PopoverControlComponent,
        AvatarComponent,
        PopoverBodyComponent,
        IconModule,
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
        PopoverBodyFooterDirective
    ]
})
export class PopoverExampleComponent {}
