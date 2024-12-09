import { Component } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';

@Component({
    selector: 'fd-popover-dropdown-example',
    templateUrl: './popover-dropdown.component.html',
    styleUrls: ['./popover-dropdown.component.scss'],
    imports: [PopoverComponent, PopoverControlComponent, ButtonComponent, PopoverBodyComponent, AvatarComponent]
})
export class PopoverDropdownExampleComponent {}
