import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';

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
    templateUrl: './shellbar-docs.component.html'
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
