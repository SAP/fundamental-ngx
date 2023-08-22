import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AvatarModule } from '@fundamental-ngx/core/avatar';

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
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [AvatarModule]
})
export class AvatarAccentColorsExampleComponent {}
