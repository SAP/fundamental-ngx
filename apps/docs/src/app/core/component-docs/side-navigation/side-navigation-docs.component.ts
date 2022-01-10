import { Component } from '@angular/core';

import sideNavigationSrc from '!./examples/side-navigation-example.component.html?raw';
import sideNavigationScsscode from '!./examples/side-navigation-examples.component.scss?raw';
import sideNavigationIconsSrc from '!./examples/side-navigation-icons-example.component.html?raw';
import sideNavigationTitlesSrc from '!./examples/side-navigation-titles-example.component.html?raw';
import sideNavigationCompactSrc from '!./examples/side-navigation-compact-example.component.html?raw';
import sideNavigationMultiLevelSrc from '!./examples/side-navigation-three-levels-example/side-navigation-three-levels-example.component.html?raw';
import sideNavigationNonSelectSrc from '!./examples/side-navigation-non-selectable-example/side-navigation-non-selectable-example.component.html?raw';
import sideNavigationMultiLevelSrcTs from '!./examples/side-navigation-three-levels-example/side-navigation-three-levels-example.component.ts?raw';
import programmaticallySideNavigationSrc from '!./examples/side-navigation-programmatically-example/side-navigation-programmatically-example.component.html?raw';
import programmaticallySideNavigationSrcTs from '!./examples/side-navigation-programmatically-example/side-navigation-programmatically-example.component.ts?raw';
import sideNavigationMultiSelectedSrc from '!./examples/side-navigation-multiple-selected-example/side-navigation-multiple-selected-example.component.html?raw';
import sideNavigationMultiSelectedSrcTs from '!./examples/side-navigation-multiple-selected-example/side-navigation-multiple-selected-example.component.ts?raw';
import sideNavigationCondensedSrc from '!./examples/side-navigation-condensed-example/side-navigation-condensed-example.component.html?raw';
import sideNavigationCondensedSrcTs from '!./examples/side-navigation-condensed-example/side-navigation-condensed-example.component.ts?raw';
import sideNavigationObjectSrc from '!./examples/side-navigation-object-example/side-navigation-object-example.component.html?raw';
import sideNavigationObjectSrcTs from '!./examples/side-navigation-object-example/side-navigation-object-example.component.ts?raw';
import sideNavigationCondensedObjectSrc from '!./examples/side-navigation-condensed-object-example/side-navigation-condensed-object-example.component.html?raw';
import sideNavigationCondensedObjectSrcTs from '!./examples/side-navigation-condensed-object-example/side-navigation-condensed-object-example.component.ts?raw';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-side-navigation',
    templateUrl: './side-navigation-docs.component.html'
})
export class SideNavigationDocsComponent {
    oneLevelSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: sideNavigationSrc,
            fileName: 'side-navigation-example',
            scssFileCode: sideNavigationScsscode
        }
    ];

    titlesSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: sideNavigationTitlesSrc,
            fileName: 'side-navigation-titles-example',
            scssFileCode: sideNavigationScsscode
        }
    ];

    compactSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: sideNavigationCompactSrc,
            fileName: 'side-navigation-compact-example',
            scssFileCode: sideNavigationScsscode
        }
    ];

    multiLevelsSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: sideNavigationMultiLevelSrc,
            fileName: 'side-navigation-three-levels-example',
            typescriptFileCode: sideNavigationMultiLevelSrcTs,
            component: 'SideNavigationThreeLevelsExampleComponent'
        }
    ];

    multiLevelsSelectedSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: sideNavigationMultiSelectedSrc,
            fileName: 'side-navigation-multiple-selected-example',
            typescriptFileCode: sideNavigationMultiSelectedSrcTs,
            component: 'SideNavigationMultipleSelectedExampleComponent'
        }
    ];

    programmaticallySideNavigation: ExampleFile[] = [
        {
            language: 'html',
            code: programmaticallySideNavigationSrc,
            fileName: 'side-navigation-programmatically-example'
        },
        {
            language: 'typescript',
            code: programmaticallySideNavigationSrcTs,
            fileName: 'side-navigation-programmatically-example',
            typescriptFileCode: programmaticallySideNavigationSrcTs,
            component: 'SideNavigationProgrammaticallyExampleComponent'
        }
    ];

    iconsSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: sideNavigationIconsSrc,
            fileName: 'side-navigation-icons-example'
        }
    ];

    nonSelectableSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: sideNavigationNonSelectSrc,
            fileName: 'side-navigation-non-selectable-example'
        }
    ];

    condensedSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: sideNavigationCondensedSrc,
            fileName: 'side-navigation-condensed-example'
        }
    ];

    sideNavConfiguration: ExampleFile[] = [
        {
            language: 'html',
            code: sideNavigationObjectSrc,
            fileName: 'side-navigation-object-example'
        },
        {
            language: 'typescript',
            code: sideNavigationObjectSrcTs,
            fileName: 'side-navigation-object-example',
            typescriptFileCode: sideNavigationCondensedSrcTs,
            component: 'SideNavigationObjectExampleComponent'
        }
    ];

    sideNavCondensedConfiguration: ExampleFile[] = [
        {
            language: 'html',
            code: sideNavigationCondensedObjectSrc,
            fileName: 'side-navigation-condensed-object-example'
        },
        {
            language: 'typescript',
            code: sideNavigationCondensedObjectSrcTs,
            fileName: 'side-navigation-condensed-object-example',
            typescriptFileCode: sideNavigationCondensedObjectSrcTs,
            component: 'SideNavigationCondensedObjectExampleComponent'
        }
    ];
}
