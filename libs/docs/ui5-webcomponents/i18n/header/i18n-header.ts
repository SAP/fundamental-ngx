import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'ui5-i18n-header',
    templateUrl: './i18n-header.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, HeaderTabsComponent]
})
export class I18nHeader {
    componentName = 'i18n';
}
