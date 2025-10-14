import { Component } from '@angular/core';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';

@Component({
    selector: 'ui5-basic-avatar-sample',
    standalone: true,
    imports: [Avatar],
    templateUrl: './basic-sample.html',
    styles: [
        `
            .avatar-examples {
                display: flex;
                gap: 1rem;
                align-items: center;
                padding: 1rem;
            }
        `
    ]
})
export class BasicAvatarSample {}
