import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-avatar-placeholder-example',
    templateUrl: './avatar-placeholder-example.component.html',
    styles: [
        `
            fd-avatar {
                margin: 1rem;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarPlaceholderExampleComponent {}
