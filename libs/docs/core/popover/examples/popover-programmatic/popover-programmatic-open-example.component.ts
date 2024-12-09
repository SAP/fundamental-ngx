import { Component } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';

@Component({
    selector: 'fd-popover-programmatic-open-example',
    templateUrl: './popover-programmatic-open-example.component.html',
    styleUrls: ['popover-programmatic-open-example.component.scss'],
    imports: [PopoverComponent, PopoverControlComponent, AvatarComponent, PopoverBodyComponent, ButtonComponent]
})
export class PopoverProgrammaticOpenExampleComponent {
    isOpen = false;
}
