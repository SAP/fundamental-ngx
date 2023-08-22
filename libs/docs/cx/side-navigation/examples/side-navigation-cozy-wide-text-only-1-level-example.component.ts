import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CxNestedListModule } from '../../../../cx/src/lib/nested-list/nested-list.module';
import { CxSideNavigationModule } from '../../../../cx/src/lib/side-navigation/side-navigation.module';

@Component({
    selector: 'fundamental-ngx-side-navigation-default-example',
    templateUrl: './side-navigation-cozy-wide-text-only-1-level-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CxSideNavigationModule, CxNestedListModule]
})
export class SideNavigationCozyWideTextOnly1LevelExampleComponent {}
