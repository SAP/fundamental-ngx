import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListModule } from '@fundamental-ngx/core/list';
import { MicroProcessFlowModule } from '@fundamental-ngx/core/micro-process-flow';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';

@Component({
    selector: 'fd-micro-process-flow-popover-example',
    templateUrl: './micro-process-flow-popover-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MicroProcessFlowModule, PopoverComponent, PopoverControlComponent, PopoverBodyComponent, ListModule]
})
export class MicroProcessFlowPopoverExampleComponent {
    list1 = [
        { text: 'Option 1', url: '#' },
        { text: 'Option 2', url: '#' },
        { text: 'Option 3', url: '#' }
    ];
}
