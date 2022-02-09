import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Size } from '@fundamental-ngx/core/utils';

@Component({
    selector: 'fn-avatar-image-example',
    templateUrl: './avatar-image-example.component.html',
    styleUrls: ['./avatar-example-styles.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class AvatarImageExampleComponent {
    sizes: Size[] = ['xl', 'l', 'm', 's', 'xs'];
}
