import { Component } from '@angular/core';
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
import {
    PopoverBodyComponent,
    PopoverBodyFooterDirective,
    PopoverBodyHeaderDirective,
    PopoverComponent,
    PopoverControlComponent
} from '@fundamental-ngx/core/popover';
import { TitleComponent } from '@fundamental-ngx/core/title';

@Component({
    selector: 'fd-popover-complex-example',
    templateUrl: './popover-complex-example.component.html',
    styleUrls: ['./popover-complex-example.component.scss'],
    imports: [
        PopoverComponent,
        PopoverControlComponent,
        BarComponent,
        ButtonBarComponent,
        BarElementDirective,
        BarLeftDirective,
        BarMiddleDirective,
        BarRightDirective,
        ButtonComponent,
        PopoverBodyComponent,
        TitleComponent,
        AvatarComponent,
        PopoverBodyHeaderDirective,
        ContentDensityDirective,
        PopoverBodyFooterDirective
    ]
})
export class PopoverComplexExampleComponent {}
