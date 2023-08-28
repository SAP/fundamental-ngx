import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CxNestedListModule } from '../../../../cx/src/lib/nested-list/nested-list.module';
import { CxSideNavigationModule } from '../../../../cx/src/lib/side-navigation/side-navigation.module';

@Component({
    selector: 'fundamental-ngx-side-navigation-wide-icon-1-level-example',
    templateUrl: './side-navigation-wide-icon-1-level-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CxSideNavigationModule, CxNestedListModule]
})
export class SideNavigationWideIcon1LevelExampleComponent {}
