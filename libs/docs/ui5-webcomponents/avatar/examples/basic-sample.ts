import { Component } from '@angular/core';
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';

@Component({
    selector: 'ui5-basic-avatar-sample',
    standalone: true,
    imports: [Avatar],
    templateUrl: './basic-sample.html',
    styles: [
        `
            section {
                display: flex;
                gap: 1rem;
                align-items: center;
                padding: 1rem;
                flex-wrap: wrap;
            }
        `
    ]
})
export class BasicAvatarSample {}
