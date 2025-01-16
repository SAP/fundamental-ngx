import { Component } from '@angular/core';
import { FocusableItemDirective } from '@fundamental-ngx/cdk';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';

@Component({
    selector: 'fd-popover-container-example',
    templateUrl: './popover-container-example.component.html',
    imports: [PopoverComponent, PopoverControlComponent, ButtonComponent, PopoverBodyComponent, FocusableItemDirective]
})
export class PopoverContainerExampleComponent {}
