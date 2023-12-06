import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CxNestedListModule } from '@fundamental-ngx/cx/nested-list';
import { CxSideNavigationModule } from '@fundamental-ngx/cx/side-navigation';

@Component({
    selector: 'fundamental-ngx-side-navigation-cozy-wide-text-only-3-level-example',
    templateUrl: './side-navigation-cozy-wide-text-only-3-level-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CxSideNavigationModule, CxNestedListModule]
})
export class SideNavigationCozyWideTextOnly3LevelExampleComponent {}
