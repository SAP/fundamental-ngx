
import { Component } from '@angular/core';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';
import { FundamentalNgxPlatformModule } from '@fundamental-ngx/platform';

@Component({
    selector: 'fd-vertical-navigation-condensed-example',
    templateUrl: './vertical-navigation-condensed-example.component.html',
    styleUrls: ['./vertical-navigation-condensed-example.component.scss'],
    standalone: true,
    imports: [FundamentalNgxCoreModule, FundamentalNgxPlatformModule]
})
export class VerticalNavigationCondensedExample {
    condensed: boolean = false;

    toggleCondensed(): void {
        this.condensed = !this.condensed;
    }
}
