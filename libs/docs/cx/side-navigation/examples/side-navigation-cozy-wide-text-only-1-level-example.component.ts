import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CxNestedListModule } from '@fundamental-ngx/cx/nested-list';
import { CxSideNavigationModule } from '@fundamental-ngx/cx/side-navigation';

@Component({
    selector: 'fdx-side-navigation-default-example',
    templateUrl: './side-navigation-cozy-wide-text-only-1-level-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CxSideNavigationModule, CxNestedListModule]
})
export class SideNavigationCozyWideTextOnly1LevelExampleComponent {}
