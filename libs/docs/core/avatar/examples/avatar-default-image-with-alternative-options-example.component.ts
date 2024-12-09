import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';

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
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AvatarComponent]
})
export class AvatarDefaultImageWithAlternativeOptionsExampleComponent {}
