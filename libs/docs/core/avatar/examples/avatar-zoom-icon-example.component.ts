import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';

@Component({
    selector: 'fd-avatar-zoom-icon-example',
    templateUrl: './avatar-zoom-icon-example.component.html',
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
export class AvatarZoomIconExampleComponent {
    onZoomGlyphClick(num: number): void {
        alert('avatar ' + num + ' clicked!');
    }
}
