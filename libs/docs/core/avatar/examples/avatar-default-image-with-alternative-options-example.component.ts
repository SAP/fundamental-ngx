import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'fd-avatar-default-image-with-alternative-options-example',
    templateUrl: './avatar-default-image-with-alternative-options-example.component.html',
    styles: [
        `
            fd-avatar {
                margin: 1rem;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarDefaultImageWithAlternativeOptionsExampleComponent {}
