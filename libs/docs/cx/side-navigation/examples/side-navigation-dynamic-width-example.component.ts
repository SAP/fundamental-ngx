import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CxNestedListModule } from '@fundamental-ngx/cx/nested-list';
import { CxSideNavigationModule } from '@fundamental-ngx/cx/side-navigation';

@Component({
    selector: 'fdx-side-navigation-dynamic-width-example',
    templateUrl: './side-navigation-dynamic-width-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CxSideNavigationModule, CxNestedListModule]
})
export class SideNavigationDynamicWidthExampleComponent {}
