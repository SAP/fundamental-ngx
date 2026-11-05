import { Component } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    PopoverBodyComponent,
    PopoverBodyFooterDirective,
    PopoverBodyHeaderDirective,
    PopoverComponent,
    PopoverControlComponent
} from '@fundamental-ngx/core/popover';

@Component({
    selector: 'fd-popover-focus-example',
    templateUrl: './popover-focus-example.component.html',
    imports: [
        PopoverComponent,
        PopoverControlComponent,
        ButtonComponent,
        PopoverBodyComponent,
        PopoverBodyHeaderDirective,
        BarModule,
        AvatarComponent,
        PopoverBodyFooterDirective
    ]
})
export class PopoverFocusExampleComponent {}
