import { Component } from '@angular/core';
import { PopoverBodyComponent } from '@fundamental-ngx/core/popover';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { PopoverComponent } from '@fundamental-ngx/core/popover';

@Component({
    selector: 'fd-popover-container-example',
    templateUrl: './popover-container-example.component.html',
    standalone: true,
    imports: [PopoverComponent, PopoverControlComponent, ButtonModule, PopoverBodyComponent]
})
export class PopoverContainerExampleComponent {}
