import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-micro-process-flow-popover-example',
    templateUrl: './micro-process-flow-popover-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MicroProcessFlowPopoverExampleComponent {
    list1 = [
        { text: 'Option 1', url: '#' },
        { text: 'Option 2', url: '#' },
        { text: 'Option 3', url: '#' }
    ];
}
