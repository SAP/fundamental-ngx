import { ChangeDetectionStrategy, Component } from '@angular/core';

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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarInitialsExampleComponent {}
