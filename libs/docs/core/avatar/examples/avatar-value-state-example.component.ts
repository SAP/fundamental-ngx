import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';

@Component({
    selector: 'fd-avatar-value-state-example',
    imports: [AvatarComponent],
    styles: [
        `
            fd-avatar {
                margin: 1rem;
            }
        `
    ],
    templateUrl: './avatar-value-state-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarValueStateExampleComponent {}
