import { Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { ListModule } from '@fundamental-ngx/core/list';

@Component({
    selector: 'fd-list-byline-standard-example',
    templateUrl: './list-byline-standard-example.component.html',
    imports: [ListModule, IconComponent, ContentDensityDirective]
})
export class ListBylineStandardExampleComponent {}
