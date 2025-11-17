import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    DescriptionComponent,
    DocPageComponent,
    HeaderComponent,
    HeaderTabsComponent,
    ImportComponent
} from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'fd-ui5-avatar-header',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './avatar-header.html',
    imports: [DocPageComponent, HeaderComponent, DescriptionComponent, ImportComponent, HeaderTabsComponent]
})
export class AvatarHeader {
    componentName = 'Avatar';
    packageName = '@ui5/webcomponents';
}
