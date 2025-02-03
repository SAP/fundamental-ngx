import { Component } from '@angular/core';
import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    getExampleFile
} from '@fundamental-ngx/docs/shared';
import { SideNavigationCozyWideIcon3LevelExampleComponent } from './examples/side-navigation-cozy-wide-icon-3-level-example.component';
import { SideNavigationCozyWideTextOnly1LevelExampleComponent } from './examples/side-navigation-cozy-wide-text-only-1-level-example.component';
import { SideNavigationCozyWideTextOnly3LevelExampleComponent } from './examples/side-navigation-cozy-wide-text-only-3-level-example.component';
import { SideNavigationDynamicWidthExampleComponent } from './examples/side-navigation-dynamic-width-example.component';
import { SideNavigationCollapseExampleComponent } from './examples/side-navigation-expand-collapse-example.component';
import { SideNavigationFilterExampleComponent } from './examples/side-navigation-filter-example.component';
import { SideNavigationMobileExampleComponent } from './examples/side-navigation-mobile-example.component';
import { SideNavigationNarrowExampleComponent } from './examples/side-navigation-narrow-example.component';
import { SideNavigationOverflowExampleComponent } from './examples/side-navigation-overflow-example.component';
import { SideNavigationShellbarExampleComponent } from './examples/side-navigation-shellbar-example.component';
import { SideNavigationWideIcon1LevelExampleComponent } from './examples/side-navigation-wide-icon-1-level-example.component';

@Component({
    selector: 'app-side-navigation',
    templateUrl: './side-navigation-docs.component.html',
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
            selector: 'side-navigation-default-example',
            component: 'SideNavigationCozyWideTextOnly1LevelExampleComponent'
        })
    ];
    sideNavigationCozyWideIcon1LevelExample = [
        getExampleFile('side-navigation-wide-icon-1-level-example.component.html'),
        getExampleFile('side-navigation-wide-icon-1-level-example.component.ts', {
            component: 'SideNavigationWideIcon1LevelExampleComponent'
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
            selector: 'side-navigation-collapse-example',
            component: 'SideNavigationCollapseExampleComponent'
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
