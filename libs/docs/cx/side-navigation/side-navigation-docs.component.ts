import { Component } from '@angular/core';
import { getExampleFile } from '@fundamental-ngx/docs/shared';

@Component({
    selector: 'app-side-navigation',
    templateUrl: './side-navigation-docs.component.html'
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
}
