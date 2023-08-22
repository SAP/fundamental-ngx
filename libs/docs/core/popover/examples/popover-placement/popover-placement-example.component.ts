import { Component } from '@angular/core';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { PopoverBodyComponent } from '@fundamental-ngx/core/popover';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { PopoverComponent } from '@fundamental-ngx/core/popover';

@Component({
    selector: 'fd-popover-placement-example',
    templateUrl: './popover-placement-example.component.html',
    styleUrls: ['popover-placement-example.component.scss'],
    standalone: true,
    imports: [PopoverComponent, PopoverControlComponent, ButtonModule, PopoverBodyComponent, AvatarModule]
})
export class PopoverPlacementExampleComponent {}
