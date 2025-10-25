import { Component, signal } from '@angular/core';

import { BusyIndicator } from '@fundamental-ngx/ui5-webcomponents/busy-indicator';

import { Button } from '@fundamental-ngx/ui5-webcomponents/button';

import { Label } from '@fundamental-ngx/ui5-webcomponents/label';

@Component({
    selector: 'ui5-sizes-busy-indicator-sample',
    standalone: true,
    imports: [BusyIndicator, Button, Label],
    templateUrl: './sizes.html',
    styles: [
        `
            .sizes-examples {
                display: flex;
                gap: 2rem;
                align-items: center;
                padding: 2rem;
                flex-wrap: wrap;
            }

            .size-example {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                min-width: 150px;
            }

            .example-content {
                width: 120px;
                height: 120px;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }
        `
    ]
})
export class SizesBusyIndicatorSample {
    isActive = signal(true);

    sizes = [
        { value: 'S', label: 'Small' },
        { value: 'M', label: 'Medium' },
        { value: 'L', label: 'Large' }
    ] as const;

    toggleBusyIndicator(): void {
        this.isActive.update((value) => !value);
    }
}
