import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-micro-process-flow-popover',
    templateUrl: './micro-process-flow-popover.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MicroProcessFlowPopoverComponent {

    list1 = [
        { text: 'Option 1', url: '#' },
        { text: 'Option 2', url: '#' },
        { text: 'Option 3', url: '#' }
    ];

    constructor() { }
}
