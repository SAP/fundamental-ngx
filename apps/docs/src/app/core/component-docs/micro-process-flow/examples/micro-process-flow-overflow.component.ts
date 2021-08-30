import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-micro-process-flow-overflow',
    templateUrl: './micro-process-flow-overflow.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MicroProcessFlowOverflowComponent {

    items: any[] = [];

    constructor() {
        const states = ['positive', 'information', 'negative', 'critical'];

        const icons = ['product', 'phone', 'map', 'log'];

        for (let i = 0; i < 100; i++) {
            this.items.push({
                state: states[Math.floor(Math.random() * states.length)],
                icon: icons[Math.floor(Math.random() * icons.length)]
            });
        }
    }
}
