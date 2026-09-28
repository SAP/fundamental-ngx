import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Avatar } from '@fundamental-ngx/ui5-webcomponents/avatar';
import '@ui5/webcomponents-icons/dist/AllIcons.js';

@Component({
    selector: 'ui5-avatar-types-sample',
    templateUrl: './avatar-types.html',
    imports: [Avatar],
    changeDetection: ChangeDetectionStrategy.OnPush,
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
export class AvatarTypesSample {}
