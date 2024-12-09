import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CxNestedListModule } from '@fundamental-ngx/cx/nested-list';
import { CxSideNavigationModule } from '@fundamental-ngx/cx/side-navigation';

@Component({
    selector: 'fdx-side-navigation-wide-icon-1-level-example',
    templateUrl: './side-navigation-wide-icon-1-level-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CxSideNavigationModule, CxNestedListModule]
})
export class SideNavigationWideIcon1LevelExampleComponent {}
