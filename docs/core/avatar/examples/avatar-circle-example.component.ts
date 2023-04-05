import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-avatar-circle-example',
    templateUrl: './avatar-circle-example.component.html',
    styles: [
        `
            fd-avatar {
                margin: 1rem;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarCircleExampleComponent {}
