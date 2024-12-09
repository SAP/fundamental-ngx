import { Component } from '@angular/core';
import { InfoLabelColor } from '@fundamental-ngx/core/info-label';
import { PlatformInfoLabelModule } from '@fundamental-ngx/platform/info-label';

const infoLabelColors: InfoLabelColor[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

@Component({
    selector: 'fdp-platform-info-label-example',
    templateUrl: './platform-info-label-example.component.html',
    styleUrls: ['./platform-info-label-example.component.scss'],
    imports: [PlatformInfoLabelModule]
})
export class PlatformInfoLabelExampleComponent {
    protected readonly infoLabelColors = infoLabelColors;
}
