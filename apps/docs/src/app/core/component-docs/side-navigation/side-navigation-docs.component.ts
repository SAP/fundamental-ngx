import { Component, OnInit } from '@angular/core';

import * as sideNavigationSrc from '!raw-loader!./examples/side-navigation-example.component.html';
import * as sideNavigationTscode from '!raw-loader!./examples/side-navigation-examples.component.ts';
import * as sideNavigationScsscode from '!raw-loader!./examples/side-navigation-examples.component.scss';
import * as sideNavigationLevelsSrc from '!raw-loader!./examples/side-navigation-levels-example.component.html';
import * as sideNavigationIconsSrc from '!raw-loader!./examples/side-navigation-icons-example.component.html';
import * as sideNavigationTitlesSrc from '!raw-loader!./examples/side-navigation-titles-example.component.html';
import * as sideNavigationCompactSrc from '!raw-loader!./examples/side-navigation-compact-example.component.html';
import * as sideNavigationMultiLevelSrc from '!raw-loader!./examples/side-navigation-three-levels-example/side-navigation-three-levels-example.component.html';
import * as sideNavigationMultiLevelSrcTs from '!raw-loader!./examples/side-navigation-three-levels-example/side-navigation-three-levels-example.component.ts';
import * as programmaticallySideNavigationSrc from '!raw-loader!./examples/side-navigation-programmatically-example/side-navigation-programmatically-example.component.html';
import * as programmaticallySideNavigationSrcTs from '!raw-loader!./examples/side-navigation-programmatically-example/side-navigation-programmatically-example.component.ts';
import * as sideNavigationMultiSelectedSrc from '!raw-loader!./examples/side-navigation-multiple-selected-example/side-navigation-multiple-selected-example.component.html';
import * as sideNavigationMultiSelectedSrcTs from '!raw-loader!./examples/side-navigation-multiple-selected-example/side-navigation-multiple-selected-example.component.ts';
import * as sideNavigationCondensedSrc from '!raw-loader!./examples/side-navigation-condensed-example/side-navigation-condensed-example.component.html';
import * as sideNavigationCondensedSrcTs from '!raw-loader!./examples/side-navigation-condensed-example/side-navigation-condensed-example.component.ts';
import * as sideNavigationObjectSrc from '!raw-loader!./examples/side-navigation-object-example/side-navigation-object-example.component.html';
import * as sideNavigationObjectSrcTs from '!raw-loader!./examples/side-navigation-object-example/side-navigation-object-example.component.ts';
import * as sideNavigationCondensedObjectSrc from '!raw-loader!./examples/side-navigation-condensed-object-example/side-navigation-condensed-object-example.component.html';
import * as sideNavigationCondensedObjectSrcTs from '!raw-loader!./examples/side-navigation-condensed-object-example/side-navigation-condensed-object-example.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-side-navigation',
    templateUrl: './side-navigation-docs.component.html'
})
export class SideNavigationDocsComponent implements OnInit {
    oneLevelSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: sideNavigationSrc,
            fileName: 'side-navigation-example',
            secondFile: 'side-navigation-examples',
            typescriptFileCode: sideNavigationTscode,
            component: 'SideNavigationExampleComponent',
            scssFileCode: sideNavigationScsscode
        }
    ];

    titlesSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: sideNavigationTitlesSrc,
            fileName: 'side-navigation-titles-example',
            secondFile: 'side-navigation-examples',
            typescriptFileCode: sideNavigationTscode,
            component: 'SideNavigationTitlesExampleComponent',
            scssFileCode: sideNavigationScsscode
        }
    ];

    compactSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: sideNavigationCompactSrc,
            fileName: 'side-navigation-compact-example',
            secondFile: 'side-navigation-examples',
            typescriptFileCode: sideNavigationTscode,
            component: 'SideNavigationCompactExampleComponent',
            scssFileCode: sideNavigationScsscode
        }
    ];

    multiLevelsSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: sideNavigationMultiLevelSrc,
            fileName: 'fd-side-navigation-three-levels-example',
            secondFile: 'fd-side-navigation-three-levels-example',
            typescriptFileCode: sideNavigationMultiLevelSrcTs,
            component: 'SideNavigationThreeLevelsExampleComponent'
        }
    ];

    multiLevelsSelectedSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: sideNavigationMultiSelectedSrc,
            fileName: 'side-navigation-multiple-selected-example',
            secondFile: 'side-navigation-multiple-selected-example',
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
            fileName: 'side-navigation-icons-example',
            secondFile: 'side-navigation-examples',
            typescriptFileCode: sideNavigationTscode,
            component: 'SideNavigationIconsExampleComponent'
        }
    ];

    condensedSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: sideNavigationCondensedSrc,
            fileName: 'side-navigation-condensed-example',
            secondFile: 'side-navigation-condensed-example',
            typescriptFileCode: sideNavigationCondensedSrcTs,
            component: 'SideNavigationCondensedExampleComponent'
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

    ngOnInit() {}
}
