import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CxNestedListModule } from '@fundamental-ngx/cx/nested-list';
import { CxSideNavigationModule } from '@fundamental-ngx/cx/side-navigation';

@Component({
    selector: 'fundamental-ngx-side-navigation-dynamic-width-example',
    templateUrl: './side-navigation-dynamic-width-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CxSideNavigationModule, CxNestedListModule]
})
export class SideNavigationDynamicWidthExampleComponent {}
