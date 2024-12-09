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
import {
    PopoverBodyComponent,
    PopoverBodyDirective,
    PopoverBodyHeaderDirective,
    PopoverComponent,
    PopoverControlComponent
} from '@fundamental-ngx/core/popover';

@Component({
    selector: 'fd-popover-closing-example',
    templateUrl: './popover-closing-example.component.html',
    styleUrls: ['./popover-closing-example.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [
        PopoverComponent,
        PopoverControlComponent,
        PopoverBodyComponent,
        ButtonComponent,
        PopoverBodyHeaderDirective,
        PopoverBodyDirective,
        AvatarComponent,
        BarComponent,
        ButtonBarComponent,
        BarElementDirective,
        BarLeftDirective,
        BarMiddleDirective,
        BarRightDirective
    ]
})
export class PopoverClosingExampleComponent {}
