import { Component } from '@angular/core';

import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets
} from '@fundamental-ngx/docs/shared';
import { SideNavigationCondensedExampleComponent } from './examples/side-navigation-condensed-example/side-navigation-condensed-example.component';
import { SideNavigationCondensedObjectExampleComponent } from './examples/side-navigation-condensed-object-example/side-navigation-condensed-object-example.component';
import {
    SideNavigationExampleComponent,
    SideNavigationIconsExampleComponent
} from './examples/side-navigation-examples.component';
import { SideNavigationMultipleSelectedExampleComponent } from './examples/side-navigation-multiple-selected-example/side-navigation-multiple-selected-example.component';
import { SideNavigationObjectExampleComponent } from './examples/side-navigation-object-example/side-navigation-object-example.component';
import { SideNavigationProgrammaticallyExampleComponent } from './examples/side-navigation-programmatically-example/side-navigation-programmatically-example.component';

const sideNavigationScssCode = 'side-navigation-examples.component.scss';
const sideNavigationSrc = 'side-navigation-example.component.html';
const sideNavigationIconsSrc = 'side-navigation-icons-example.component.html';

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
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        SideNavigationExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
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
