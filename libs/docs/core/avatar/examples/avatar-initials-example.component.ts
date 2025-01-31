import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';

@Component({
    selector: 'fd-avatar-initials-example',
    templateUrl: './avatar-initials-example.component.html',
    styles: [
        `
            fd-avatar {
                margin: 1rem;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AvatarComponent]
})
export class AvatarInitialsExampleComponent {}
