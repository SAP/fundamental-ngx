import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'fd-ui5-popover-header',
    templateUrl: './popover-header.html',
    standalone: true,
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopoverHeaderDocs {
    componentName = 'Popover';
    packageName = '@ui5/webcomponents';
}
