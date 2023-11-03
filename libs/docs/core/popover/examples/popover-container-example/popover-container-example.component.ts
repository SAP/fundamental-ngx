import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';

@Component({
    selector: 'fd-popover-container-example',
    templateUrl: './popover-container-example.component.html',
    standalone: true,
    imports: [PopoverComponent, PopoverControlComponent, ButtonComponent, PopoverBodyComponent]
})
export class PopoverContainerExampleComponent {}
