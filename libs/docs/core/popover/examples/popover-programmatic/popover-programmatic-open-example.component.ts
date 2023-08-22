import { Component } from '@angular/core';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { PopoverBodyComponent } from '@fundamental-ngx/core/popover';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { PopoverComponent } from '@fundamental-ngx/core/popover';

@Component({
    selector: 'fd-popover-programmatic-open-example',
    templateUrl: './popover-programmatic-open-example.component.html',
    styleUrls: ['popover-programmatic-open-example.component.scss'],
    standalone: true,
    imports: [PopoverComponent, PopoverControlComponent, AvatarModule, PopoverBodyComponent, ButtonModule]
})
export class PopoverProgrammaticOpenExampleComponent {
    isOpen = false;
}
