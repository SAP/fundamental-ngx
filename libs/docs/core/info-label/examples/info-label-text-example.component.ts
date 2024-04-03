import { Component } from '@angular/core';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { FundamentalNgxPlatformModule } from '@fundamental-ngx/platform';

@Component({
    selector: 'fd-info-label-text-example',
    templateUrl: './info-label-text-example.component.html',
    styleUrls: ['./info-label-text-example.component.scss'],
    standalone: true,
    imports: [FundamentalNgxCoreModule, FundamentalNgxPlatformModule]
})
export class InfoLabelTextExample {
    infoLabelColors: string[] = ['primary', 'accent', 'secondary', 'success', 'neutral', 'information'];
}
