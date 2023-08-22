import { Component } from '@angular/core';
import { getExampleFile } from '@fundamental-ngx/docs/shared';
import { SideNavigationMobileExampleComponent } from './examples/side-navigation-mobile-example.component';
import { SideNavigationShellbarExampleComponent } from './examples/side-navigation-shellbar-example.component';
import { SideNavigationOverflowExampleComponent } from './examples/side-navigation-overflow-example.component';
import { SideNavigationNarrowExampleComponent } from './examples/side-navigation-narrow-example.component';
import { SideNavigationFilterExampleComponent } from './examples/side-navigation-filter-example.component';
import { SideNavigationDynamicWidthExampleComponent } from './examples/side-navigation-dynamic-width-example.component';
import { SideNavigationCollapseExampleComponent } from './examples/side-navigation-expand-collapse-example.component';
import { SideNavigationCozyWideIcon3LevelExampleComponent } from './examples/side-navigation-cozy-wide-icon-3-level-example.component';
import { SideNavigationCozyWideTextOnly3LevelExampleComponent } from './examples/side-navigation-cozy-wide-text-only-3-level-example.component';
import { SideNavigationCozyWideTextOnly1LevelExampleComponent } from './examples/side-navigation-cozy-wide-text-only-1-level-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { SideNavigationWideIcon1LevelExampleComponent } from './examples/side-navigation-wide-icon-1-level-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

@Component({
    selector: 'app-side-navigation',
    templateUrl: './side-navigation-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        ComponentExampleComponent,
        SideNavigationWideIcon1LevelExampleComponent,
        CodeExampleComponent,
        DescriptionComponent,
        SideNavigationCozyWideTextOnly1LevelExampleComponent,
        SideNavigationCozyWideTextOnly3LevelExampleComponent,
        SideNavigationCozyWideIcon3LevelExampleComponent,
        SideNavigationCollapseExampleComponent,
        SideNavigationDynamicWidthExampleComponent,
        SideNavigationFilterExampleComponent,
        SideNavigationNarrowExampleComponent,
        SideNavigationOverflowExampleComponent,
        SideNavigationShellbarExampleComponent,
        SideNavigationMobileExampleComponent
    ]
})
export class SideNavigationDocsComponent {
    sideNavigationCozyWideTextOnly3LevelExample = [
        getExampleFile('side-navigation-cozy-wide-text-only-3-level-example.component.html'),
        getExampleFile('side-navigation-cozy-wide-text-only-3-level-example.component.ts', {
            component: 'SideNavigationCozyWideTextOnly3LevelExampleComponent'
        })
    ];
    sideNavigationDefaultExample = [
        getExampleFile('side-navigation-cozy-wide-text-only-1-level-example.component.html'),
        getExampleFile('side-navigation-cozy-wide-text-only-1-level-example.component.ts', {
            component: 'SideNavigationDefaultExampleComponent'
        })
    ];
    sideNavigationCozyWideIcon1LevelExample = [
        getExampleFile('side-navigation-wide-icon-1-level-example.component.html'),
        getExampleFile('side-navigation-wide-icon-1-level-example.component.ts', {
            component: 'SideNavigationCozyWideIcon1LevelExampleComponent'
        })
    ];
    sideNavigationCozyWideIcon3LevelExample = [
        getExampleFile('side-navigation-cozy-wide-icon-3-level-example.component.html'),
        getExampleFile('side-navigation-cozy-wide-icon-3-level-example.component.ts', {
            component: 'SideNavigationCozyWideIcon3LevelExampleComponent'
        })
    ];
    sideNavigationDynamicWidthExample = [
        getExampleFile('side-navigation-dynamic-width-example.component.html'),
        getExampleFile('side-navigation-dynamic-width-example.component.ts', {
            component: 'SideNavigationDynamicWidthExampleComponent'
        })
    ];
    sideNavigationExpandCollapseExample = [
        getExampleFile('side-navigation-expand-collapse-example.component.html'),
        getExampleFile('side-navigation-expand-collapse-example.component.ts', {
            component: 'SideNavigationExpandCollapseExampleComponent'
        })
    ];
    sideNavigationNarrowExample = [
        getExampleFile('side-navigation-narrow-example.component.html'),
        getExampleFile('side-navigation-narrow-example.component.ts', {
            component: 'SideNavigationNarrowExampleComponent'
        })
    ];
    sideNavigationFilterExample = [
        getExampleFile('side-navigation-filter-example.component.html'),
        getExampleFile('side-navigation-filter-example.component.ts', {
            component: 'SideNavigationFilterExampleComponent'
        })
    ];
    sideNavigationOverflowExample = [
        getExampleFile('side-navigation-overflow-example.component.html'),
        getExampleFile('side-navigation-overflow-example.component.ts', {
            component: 'SideNavigationOverflowExampleComponent'
        })
    ];
    sideNavigationShellbarExample = [
        getExampleFile('side-navigation-shellbar-example.component.html'),
        getExampleFile('side-navigation-shellbar-example.component.ts', {
            component: 'SideNavigationShellbarExampleComponent'
        })
    ];
    sideNavigationMobileExample = [
        getExampleFile('side-navigation-mobile-example.component.html'),
        getExampleFile('side-navigation-mobile-example.component.ts', {
            component: 'SideNavigationMobileExampleComponent'
        })
    ];
}
