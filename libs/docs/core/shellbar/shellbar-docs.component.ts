import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { ShellbarGrowingGroupExampleComponent } from './examples/shellbar-growing-group-example/shellbar-growing-group-example.component';
import { ShellbarSideNavResponsiveExampleComponent } from './examples/shellbar-side-nav-responsive/shellbar-side-nav-responsive-example.component';
import { ShellbarSideNavExampleComponent } from './examples/shellbar-side-nav/shellbar-side-nav-example.component';
import { ShellbarResponsiveExampleComponent } from './examples/shellbar-responsive-example/shellbar-responsive-example.component';
import { ShellbarCollapsibleExampleComponent } from './examples/shellbar-collapsible-example.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { ShellbarBasicExampleComponent } from './examples/shellbar-basic-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const sideNavShellbarScss = 'shellbar-side-nav/shellbar-side-nav-example.component.scss';
const sideNavResponsiveShellbarScss =
    'shellbar-side-nav-responsive/shellbar-side-nav-responsive-example.component.scss';

const shellbarBasicHTMLSrc = 'shellbar-basic-example.component.html';
const shellbarBasicTSSrc = 'shellbar-basic-example.component.ts';
const shellbarCollapsibleHTMLSrc = 'shellbar-collapsible-example.component.html';
const shellbarCollapsibleTSSrc = 'shellbar-collapsible-example.component.ts';
const sideNavShellbarHtml = 'shellbar-side-nav/shellbar-side-nav-example.component.html';
const sideNavShellbarTs = 'shellbar-side-nav/shellbar-side-nav-example.component.ts';
const sideNavResponsiveShellbarTs = 'shellbar-side-nav-responsive/shellbar-side-nav-responsive-example.component.ts';
const sideNavResponsiveShellbarHtml =
    'shellbar-side-nav-responsive/shellbar-side-nav-responsive-example.component.html';

@Component({
    selector: 'app-shellbar',
    templateUrl: './shellbar-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        SeparatorComponent,
        ComponentExampleComponent,
        ShellbarBasicExampleComponent,
        CodeExampleComponent,
        ShellbarCollapsibleExampleComponent,
        ShellbarResponsiveExampleComponent,
        ShellbarSideNavExampleComponent,
        ShellbarSideNavResponsiveExampleComponent,
        ShellbarGrowingGroupExampleComponent
    ]
})
export class ShellbarDocsComponent {
    shellbarBasicExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(shellbarBasicHTMLSrc),
            fileName: 'shellbar-basic-example'
        },
        {
            language: 'typescript',
            component: 'ShellbarBasicExampleComponent',
            code: getAssetFromModuleAssets(shellbarBasicTSSrc),
            fileName: 'shellbar-basic-example'
        }
    ];

    shellbarCollapsible: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(shellbarCollapsibleHTMLSrc),
            fileName: 'shellbar-collapsible-example'
        },
        {
            language: 'typescript',
            component: 'ShellbarCollapsibleExampleComponent',
            code: getAssetFromModuleAssets(shellbarCollapsibleTSSrc),
            fileName: 'shellbar-collapsible-example'
        }
    ];

    shellbarSideNav: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(sideNavShellbarHtml),
            fileName: 'shellbar-side-nav-example'
        },
        {
            language: 'typescript',
            component: 'ShellbarSideNavExampleComponent',
            code: getAssetFromModuleAssets(sideNavShellbarTs),
            fileName: 'shellbar-side-nav-example',
            scssFileCode: getAssetFromModuleAssets(sideNavShellbarScss)
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(sideNavShellbarScss),
            fileName: 'shellbar-side-nav-example',
            component: 'ShellbarSideNavExampleComponent',
            scssFileCode: getAssetFromModuleAssets(sideNavShellbarScss)
        }
    ];

    shellbarSideNavResponsive: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(sideNavResponsiveShellbarHtml),
            fileName: 'shellbar-side-nav-responsive-example'
        },
        {
            language: 'typescript',
            component: 'ShellbarSideNavResponsiveExampleComponent',
            code: getAssetFromModuleAssets(sideNavResponsiveShellbarTs),
            fileName: 'shellbar-side-nav-responsive-example',
            scssFileCode: getAssetFromModuleAssets(sideNavResponsiveShellbarScss)
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(sideNavResponsiveShellbarScss),
            fileName: 'shellbar-side-nav-responsive-example',
            component: 'ShellbarSideNavResponsiveExampleComponent',
            scssFileCode: getAssetFromModuleAssets(sideNavResponsiveShellbarScss)
        }
    ];
}
