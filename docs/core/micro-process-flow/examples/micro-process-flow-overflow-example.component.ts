import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MicroProcessFlowItemType } from '@fundamental-ngx/core/micro-process-flow';

interface ExampleItem {
    state: MicroProcessFlowItemType;
    icon: string;
}

@Component({
    selector: 'fd-micro-process-flow-overflow-example',
    templateUrl: './micro-process-flow-overflow-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MicroProcessFlowOverflowExampleComponent {
    items: ExampleItem[] = [];

    constructor() {
        const states: MicroProcessFlowItemType[] = ['positive', 'information', 'negative', 'critical'];

        const icons = ['product', 'phone', 'map', 'log'];

        for (let i = 0; i < 100; i++) {
            this.items.push({
                state: states[Math.floor(Math.random() * states.length)],
                icon: icons[Math.floor(Math.random() * icons.length)]
            });
        }
    }
}
