import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Size } from '@fundamental-ngx/cdk/utils';
import { AvatarColor } from '@fundamental-ngx/fn/avatar';

@Component({
    selector: 'fn-avatar-default-example',
    templateUrl: './avatar-default-example.component.html',
    styleUrls: ['./avatar-example-styles.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class AvatarDefaultExampleComponent {
    sizes: Size[] = ['xl', 'l', 'm', 's', 'xs'];
    colors: AvatarColor[] = ['indigo', 'crimson', 'cyan', 'lime', 'pink', 'yellow', 'teal'];

    getLabel(size: Size): string {
        return size.split('').join(' ').toLocaleUpperCase();
    }
}
