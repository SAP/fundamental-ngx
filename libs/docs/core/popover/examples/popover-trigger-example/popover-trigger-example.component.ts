import { Component } from '@angular/core';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { PopoverComponent, PopoverTriggerDirective } from '@fundamental-ngx/core/popover';

@Component({
    selector: 'fd-popover-trigger-example',
    templateUrl: './popover-trigger-example.component.html',
    standalone: true,
    imports: [ButtonModule, PopoverTriggerDirective, PopoverComponent]
})
export class PopoverTriggerExampleComponent {}
