import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';

@Component({
    selector: 'fd-avatar-icon-example',
    templateUrl: './avatar-icon-example.component.html',
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
export class AvatarIconExampleComponent {
    onAvatarClicked(num: number): void {
        alert('avatar ' + num + ' clicked!');
    }
}
