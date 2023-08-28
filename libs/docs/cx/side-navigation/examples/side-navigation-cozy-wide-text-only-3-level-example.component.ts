import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CxNestedListModule } from '../../../../cx/src/lib/nested-list/nested-list.module';
import { CxSideNavigationModule } from '../../../../cx/src/lib/side-navigation/side-navigation.module';

@Component({
    selector: 'fundamental-ngx-side-navigation-cozy-wide-text-only-3-level-example',
    templateUrl: './side-navigation-cozy-wide-text-only-3-level-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CxSideNavigationModule, CxNestedListModule]
})
export class SideNavigationCozyWideTextOnly3LevelExampleComponent {}
