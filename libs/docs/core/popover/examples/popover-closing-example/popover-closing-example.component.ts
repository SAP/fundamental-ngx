import { Component, ViewEncapsulation } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { BarComponent, BarElementDirective, BarLeftDirective, ButtonBarComponent } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    PopoverBodyComponent,
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
        AvatarComponent,
        BarComponent,
        ButtonBarComponent,
        BarElementDirective,
        BarLeftDirective
    ]
})
export class PopoverClosingExampleComponent {}
