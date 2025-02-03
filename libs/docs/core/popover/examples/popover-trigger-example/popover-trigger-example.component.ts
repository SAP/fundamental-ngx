import { Component } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { PopoverComponent, PopoverTriggerDirective } from '@fundamental-ngx/core/popover';

@Component({
    selector: 'fd-popover-trigger-example',
    templateUrl: './popover-trigger-example.component.html',
    imports: [ButtonComponent, PopoverTriggerDirective, PopoverComponent]
})
export class PopoverTriggerExampleComponent {}
