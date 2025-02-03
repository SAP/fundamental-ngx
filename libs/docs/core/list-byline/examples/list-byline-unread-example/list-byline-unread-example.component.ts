import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { ListModule } from '@fundamental-ngx/core/list';

@Component({
    selector: 'fd-list-byline-unread-example',
    templateUrl: './list-byline-unread-example.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ListModule, IconComponent, ContentDensityDirective]
})
export class ListBylineUnreadExampleComponent {}
