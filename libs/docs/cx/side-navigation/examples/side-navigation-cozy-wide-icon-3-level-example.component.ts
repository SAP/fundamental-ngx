import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CxNestedListModule } from '@fundamental-ngx/cx/nested-list';
import { CxSideNavigationModule } from '@fundamental-ngx/cx/side-navigation';

@Component({
    selector: 'fdx-side-navigation-cozy-wide-icon-3-level-example',
    templateUrl: './side-navigation-cozy-wide-icon-3-level-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CxSideNavigationModule, CxNestedListModule]
})
export class SideNavigationCozyWideIcon3LevelExampleComponent {}
