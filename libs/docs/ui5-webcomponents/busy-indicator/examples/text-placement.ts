import { Component, signal } from '@angular/core';
import { BusyIndicator } from '@fundamental-ngx/ui5-webcomponents/busy-indicator';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';

@Component({
    selector: 'ui5-text-placement-busy-indicator-sample',
    standalone: true,
    imports: [BusyIndicator, Button, Label],
    templateUrl: './text-placement.html',
    styles: [
        `
            .text-placement-examples {
                display: flex;
                gap: 2rem;
                align-items: center;
                padding: 2rem;
                flex-wrap: wrap;
            }

            .placement-example {
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
        `
    ]
})
export class TextPlacementBusyIndicatorSample {
    isActive = signal(true);

    placements = [
        { value: 'Top', label: 'Top' },
        { value: 'Bottom', label: 'Bottom' }
    ] as const;

    toggleBusyIndicator(): void {
        this.isActive.update((value) => !value);
    }
}
