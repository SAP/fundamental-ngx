import { Component } from '@angular/core';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { ContentDensityUserComponent } from '../content-density-user/content-density-user.component';
import { RestrictedDensityUserComponent } from '../content-density-user/restricted-density-user.component';

@Component({
    selector: 'fd-directive-usage-example',
    templateUrl: './directive-usage-example.component.html',
    imports: [ContentDensityUserComponent, ContentDensityDirective, RestrictedDensityUserComponent]
})
export class DirectiveUsageExampleComponent {}
