import { Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { IconModule } from '@fundamental-ngx/core/icon';
import { ListModule } from '@fundamental-ngx/core/list';

@Component({
    selector: 'fd-list-byline-standard-example',
    templateUrl: './list-byline-standard-example.component.html',
    standalone: true,
    imports: [ListModule, IconModule, ContentDensityDirective]
})
export class ListBylineStandardExampleComponent {}
