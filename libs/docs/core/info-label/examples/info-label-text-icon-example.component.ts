import { Component } from '@angular/core';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { FundamentalNgxPlatformModule } from '@fundamental-ngx/platform';

@Component({
    selector: 'fd-info-label-text-icon-example',
    templateUrl: './info-label-text-icon-example.component.html',
    styleUrls: ['./info-label-text-icon-example.component.scss'],
    standalone: true,
    imports: [FundamentalNgxCoreModule, FundamentalNgxPlatformModule]
})
export class InfoLabelTextIconExample {}
