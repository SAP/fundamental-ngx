import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListModule } from '@fundamental-ngx/core/list';
import { PopoverBodyComponent } from '@fundamental-ngx/core/popover';
import { NgIf, NgFor } from '@angular/common';
import { PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { PopoverComponent } from '@fundamental-ngx/core/popover';
import { MicroProcessFlowModule } from '@fundamental-ngx/core/micro-process-flow';

@Component({
    selector: 'fd-micro-process-flow-popover-example',
    templateUrl: './micro-process-flow-popover-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MicroProcessFlowModule,
        PopoverComponent,
        PopoverControlComponent,
        NgIf,
        PopoverBodyComponent,
        ListModule,
        NgFor
    ]
})
export class MicroProcessFlowPopoverExampleComponent {
    list1 = [
        { text: 'Option 1', url: '#' },
        { text: 'Option 2', url: '#' },
        { text: 'Option 3', url: '#' }
    ];
}
