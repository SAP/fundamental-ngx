import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CxNestedListModule } from '@fundamental-ngx/cx/nested-list';
import { CxSideNavigationModule } from '@fundamental-ngx/cx/side-navigation';

@Component({
    selector: 'fundamental-ngx-side-navigation-collapse-example',
    templateUrl: './side-navigation-expand-collapse-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CxSideNavigationModule, CxNestedListModule]
})
export class SideNavigationCollapseExampleComponent {}
