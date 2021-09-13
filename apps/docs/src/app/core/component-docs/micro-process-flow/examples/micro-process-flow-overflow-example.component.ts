import { ChangeDetectionStrategy, Component } from '@angular/core';

interface ExampleItem {
    state: string;
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
