import { Component } from '@angular/core';

import { CheckBox } from '@fundamental-ngx/ui5-webcomponents/check-box';

import { Label } from '@fundamental-ngx/ui5-webcomponents/label';

@Component({
    selector: 'ui5-states-checkbox-sample',
    standalone: true,
    imports: [CheckBox, Label],
    templateUrl: './states.html',
    styles: [
        `
            .states-examples {
                display: flex;
                gap: 2rem;
                align-items: flex-start;
                padding: 2rem;
                flex-wrap: wrap;
            }

            .state-group {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                padding: 1rem;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                min-width: 200px;
            }

            .checkbox-item {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
        `
    ]
})
export class StatesCheckBoxSample {}
