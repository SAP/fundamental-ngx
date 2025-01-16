import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ColorAccent } from '@fundamental-ngx/cdk';
import { AvatarComponent, IndicationColor } from '@fundamental-ngx/core/avatar';

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
    imports: [AvatarComponent]
})
export class AvatarAccentColorsExampleComponent {
    colorAccents: ColorAccent[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    colorIndications: IndicationColor[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
}
