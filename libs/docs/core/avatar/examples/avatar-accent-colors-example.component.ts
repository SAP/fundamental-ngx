import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'fd-avatar-accent-colors-example',
    templateUrl: './avatar-accent-colors-example.component.html',
    styles: [
        `
            fd-avatar {
                margin: 1rem;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarAccentColorsExampleComponent {}
