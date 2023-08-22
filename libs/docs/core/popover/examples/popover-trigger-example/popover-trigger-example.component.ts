import { Component } from '@angular/core';
import { PopoverComponent } from '@fundamental-ngx/core/popover';
import { PopoverTriggerDirective } from '@fundamental-ngx/core/popover';
import { ButtonModule } from '@fundamental-ngx/core/button';

@Component({
    selector: 'fd-popover-trigger-example',
    templateUrl: './popover-trigger-example.component.html',
    standalone: true,
    imports: [ButtonModule, PopoverTriggerDirective, PopoverComponent]
})
export class PopoverTriggerExampleComponent {}
