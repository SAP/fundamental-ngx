import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'fd-ui5-ai-button-header1',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './button-header.html',
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class ButtonHeader {
    componentName = 'Button';
    packageName = '@ui5/webcomponents-ai';
}
