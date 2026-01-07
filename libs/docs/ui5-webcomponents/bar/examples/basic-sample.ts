import { Component } from '@angular/core';

import { Bar } from '@fundamental-ngx/ui5-webcomponents/bar';
import { Button } from '@fundamental-ngx/ui5-webcomponents/button';
import { Label } from '@fundamental-ngx/ui5-webcomponents/label';

@Component({
    selector: 'ui5-basic-bar-sample',
    standalone: true,
    imports: [Bar, Button, Label],
    templateUrl: './basic-sample.html',
    styles: [
        `
            .bar-examples {
                display: flex;
                gap: 1rem;
                align-items: center;
                padding: 1rem;
            }
        `
    ]
})
export class BasicBarSample {}
