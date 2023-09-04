import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AvatarModule } from '@fundamental-ngx/core/avatar';

@Component({
    selector: 'fd-avatar-borders-example',
    templateUrl: './avatar-borders-example.component.html',
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
export class AvatarBordersExampleComponent {}
