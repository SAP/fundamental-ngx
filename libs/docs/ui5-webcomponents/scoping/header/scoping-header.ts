import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'ui5-scoping-header',
    templateUrl: './scoping-header.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, HeaderTabsComponent]
})
export class ScopingHeader {
    componentName = 'Scoping';
}
