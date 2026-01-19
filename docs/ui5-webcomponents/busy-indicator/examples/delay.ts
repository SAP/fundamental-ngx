import { Component, signal } from '@angular/core';

import { BusyIndicator } from '@fundamental-ngx/ui5-webcomponents/busy-indicator';

import { Button } from '@fundamental-ngx/ui5-webcomponents/button';

import { Label } from '@fundamental-ngx/ui5-webcomponents/label';

@Component({
    selector: 'ui5-delay-busy-indicator-sample',
    standalone: true,
    imports: [BusyIndicator, Button, Label],
    templateUrl: './delay.html',
    styles: [
        `
            .delay-examples {
                display: flex;
                gap: 2rem;
                align-items: flex-start;
                padding: 2rem;
                flex-wrap: wrap;
            }

            .delay-example {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                min-width: 200px;
            }

            .example-content {
                width: 180px;
                height: 120px;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }

            .controls {
                display: flex;
                gap: 0.5rem;
                flex-direction: column;
                align-items: center;
                margin-bottom: 1rem;
            }
        `
    ]
})
export class DelayBusyIndicatorSample {
    isActive = signal(false);

    delays = [
        { value: 0, label: 'No Delay (0ms)' },
        { value: 1000, label: 'Default (1000ms)' },
        { value: 3000, label: 'Long Delay (3000ms)' }
    ] as const;

    showBusyIndicator(): void {
        this.isActive.set(true);
        // Auto hide after 5 seconds for demo purposes
        setTimeout(() => {
            this.isActive.set(false);
        }, 5000);
    }

    hideBusyIndicator(): void {
        this.isActive.set(false);
    }
}
