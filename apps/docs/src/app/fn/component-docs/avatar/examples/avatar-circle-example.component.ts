import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Size } from '@fundamental-ngx/core/utils';
import { AvatarColor } from '@fundamental-ngx/fn/avatar';

@Component({
    selector: 'fn-avatar-circle-example',
    templateUrl: './avatar-circle-example.component.html',
    styleUrls: ['./avatar-example-styles.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class AvatarCircleExampleComponent {
    sizes: Size[] = ['xl', 'l', 'm', 's', 'xs'];
    colors: AvatarColor[] = ['indigo', 'crimson', 'cyan', 'lime', 'pink', 'yellow', 'teal'];

    getLabel(size: Size): string {
        return size.split('').join(' ').toLocaleUpperCase();
    }
}
