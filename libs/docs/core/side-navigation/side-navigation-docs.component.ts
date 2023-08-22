import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { SideNavigationCondensedObjectExampleComponent } from './examples/side-navigation-condensed-object-example/side-navigation-condensed-object-example.component';
import { SideNavigationObjectExampleComponent } from './examples/side-navigation-object-example/side-navigation-object-example.component';
import { SideNavigationCondensedExampleComponent } from './examples/side-navigation-condensed-example/side-navigation-condensed-example.component';
import { SideNavigationProgrammaticallyExampleComponent } from './examples/side-navigation-programmatically-example/side-navigation-programmatically-example.component';
import { SideNavigationMultipleSelectedExampleComponent } from './examples/side-navigation-multiple-selected-example/side-navigation-multiple-selected-example.component';
import { SideNavigationThreeLevelsExampleComponent } from './examples/side-navigation-three-levels-example/side-navigation-three-levels-example.component';
import { SideNavigationNonSelectableExampleComponent } from './examples/side-navigation-non-selectable-example/side-navigation-non-selectable-example.component';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import {
    SideNavigationExampleComponent,
    SideNavigationTitlesExampleComponent,
    SideNavigationCompactExampleComponent,
    SideNavigationIconsExampleComponent
} from './examples/side-navigation-examples.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const sideNavigationScssCode = 'side-navigation-examples.component.scss';

const sideNavigationSrc = 'side-navigation-example.component.html';
const sideNavigationIconsSrc = 'side-navigation-icons-example.component.html';
const sideNavigationTitlesSrc = 'side-navigation-titles-example.component.html';
const sideNavigationCompactSrc = 'side-navigation-compact-example.component.html';
const sideNavigationMultiLevelSrc =
    'side-navigation-three-levels-example/side-navigation-three-levels-example.component.html';

const sideNavigationNonSelectSrc =
    'side-navigation-non-selectable-example/side-navigation-non-selectable-example.component.html';

const sideNavigationMultiLevelSrcTs =
    'side-navigation-three-levels-example/side-navigation-three-levels-example.component.ts';

const programmaticallySideNavigationSrc =
    'side-navigation-programmatically-example/side-navigation-programmatically-example.component.html';

const programmaticallySideNavigationSrcTs =
    'side-navigation-programmatically-example/side-navigation-programmatically-example.component.ts';

const sideNavigationMultiSelectedSrc =
    'side-navigation-multiple-selected-example/side-navigation-multiple-selected-example.component.html';

const sideNavigationMultiSelectedSrcTs =
    'side-navigation-multiple-selected-example/side-navigation-multiple-selected-example.component.ts';

const sideNavigationCondensedSrc = 'side-navigation-condensed-example/side-navigation-condensed-example.component.html';

const sideNavigationCondensedSrcTs = 'side-navigation-condensed-example/side-navigation-condensed-example.component.ts';

const sideNavigationObjectSrc = 'side-navigation-object-example/side-navigation-object-example.component.html';

const sideNavigationObjectSrcTs = 'side-navigation-object-example/side-navigation-object-example.component.ts';

const sideNavigationCondensedObjectSrc =
    'side-navigation-condensed-object-example/side-navigation-condensed-object-example.component.html';

const sideNavigationCondensedObjectSrcTs =
    'side-navigation-condensed-object-example/side-navigation-condensed-object-example.component.ts';

@Component({
    selector: 'app-side-navigation',
    templateUrl: './side-navigation-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        SideNavigationExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        SideNavigationTitlesExampleComponent,
        SideNavigationCompactExampleComponent,
        SideNavigationNonSelectableExampleComponent,
        SideNavigationThreeLevelsExampleComponent,
        SideNavigationMultipleSelectedExampleComponent,
        SideNavigationProgrammaticallyExampleComponent,
        SideNavigationIconsExampleComponent,
        SideNavigationCondensedExampleComponent,
        SideNavigationObjectExampleComponent,
        SideNavigationCondensedObjectExampleComponent
    ]
})
export class SideNavigationDocsComponent {
    oneLevelSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(sideNavigationSrc),
            fileName: 'side-navigation-example',
            scssFileCode: getAssetFromModuleAssets(sideNavigationScssCode)
        }
    ];

    titlesSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(sideNavigationTitlesSrc),
            fileName: 'side-navigation-titles-example',
            scssFileCode: getAssetFromModuleAssets(sideNavigationScssCode)
        }
    ];

    compactSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(sideNavigationCompactSrc),
            fileName: 'side-navigation-compact-example',
            scssFileCode: getAssetFromModuleAssets(sideNavigationScssCode)
        }
    ];

    multiLevelsSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(sideNavigationMultiLevelSrc),
            fileName: 'side-navigation-three-levels-example',
            typescriptFileCode: sideNavigationMultiLevelSrcTs,
            component: 'SideNavigationThreeLevelsExampleComponent'
        }
    ];

    multiLevelsSelectedSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(sideNavigationMultiSelectedSrc),
            fileName: 'side-navigation-multiple-selected-example',
            typescriptFileCode: getAssetFromModuleAssets(sideNavigationMultiSelectedSrcTs),
            component: 'SideNavigationMultipleSelectedExampleComponent'
        }
    ];

    programmaticallySideNavigation: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(programmaticallySideNavigationSrc),
            fileName: 'side-navigation-programmatically-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(programmaticallySideNavigationSrcTs),
            fileName: 'side-navigation-programmatically-example',
            typescriptFileCode: getAssetFromModuleAssets(programmaticallySideNavigationSrcTs),
            component: 'SideNavigationProgrammaticallyExampleComponent'
        }
    ];

    iconsSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(sideNavigationIconsSrc),
            fileName: 'side-navigation-icons-example'
        }
    ];

    nonSelectableSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(sideNavigationNonSelectSrc),
            fileName: 'side-navigation-non-selectable-example'
        }
    ];

    condensedSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(sideNavigationCondensedSrc),
            fileName: 'side-navigation-condensed-example'
        }
    ];

    sideNavConfiguration: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(sideNavigationObjectSrc),
            fileName: 'side-navigation-object-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(sideNavigationObjectSrcTs),
            fileName: 'side-navigation-object-example',
            typescriptFileCode: getAssetFromModuleAssets(sideNavigationCondensedSrcTs),
            component: 'SideNavigationObjectExampleComponent'
        }
    ];

    sideNavCondensedConfiguration: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(sideNavigationCondensedObjectSrc),
            fileName: 'side-navigation-condensed-object-example'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(sideNavigationCondensedObjectSrcTs),
            fileName: 'side-navigation-condensed-object-example',
            typescriptFileCode: getAssetFromModuleAssets(sideNavigationCondensedObjectSrcTs),
            component: 'SideNavigationCondensedObjectExampleComponent'
        }
    ];
}
