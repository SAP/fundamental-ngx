import { Component, signal } from '@angular/core';

import { BusyIndicator } from '@fundamental-ngx/ui5-webcomponents/busy-indicator';

import { Button } from '@fundamental-ngx/ui5-webcomponents/button';

import { Label } from '@fundamental-ngx/ui5-webcomponents/label';

@Component({
    selector: 'ui5-basic-busy-indicator-sample',
    standalone: true,
    imports: [BusyIndicator, Button, Label],
    templateUrl: './basic-sample.html',
    styles: [
        `
            .busy-indicator-examples {
                display: flex;
                gap: 1rem;
                align-items: center;
                padding: 2rem;
                flex-direction: column;
            }

            .example-content {
                width: 300px;
                height: 200px;
                border: 1px solid #ccc;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
            }
        `
    ]
})
export class BasicBusyIndicatorSample {
    isActive = signal(false);

    toggleBusyIndicator(): void {
        this.isActive.update((value) => !value);
    }
}
