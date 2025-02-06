import { Component } from '@angular/core';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { ListModule } from '@fundamental-ngx/core/list';
import { VerticalNavigationModule } from '@fundamental-ngx/core/vertical-navigation';

@Component({
    selector: 'fd-vertical-navigation-grouping-example',
    templateUrl: './vertical-navigation-grouping-example.component.html',
    imports: [VerticalNavigationModule, ListModule, IconComponent]
})
export class VerticalNavigationGroupingExampleComponent {}
