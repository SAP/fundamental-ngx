import { Component } from '@angular/core';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';

@Component({
    selector: 'fd-popover-c-fill',
    templateUrl: './popover-c-fill.component.html',
    imports: [PopoverComponent, PopoverControlComponent, PopoverBodyComponent]
})
export class PopoverCFillComponent {}
