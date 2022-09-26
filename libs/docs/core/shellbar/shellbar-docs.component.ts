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
const shellbarSelectExampleHTMLSrc = 'shellbar-select-example.component.html';
const shellbarSelectExampleTSSrc = 'shellbar-select-example.component.ts';
const shellbarResponsiveExampleHTMLSrc = 'shellbar-responsive-example.component.html';
const shellbarResponsiveExampleTSSrc = 'shellbar-responsive-example.component.ts';

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

    shellbarWithSelect: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(shellbarSelectExampleHTMLSrc),
            fileName: 'shellbar-select-example'
        },
        {
            language: 'typescript',
            component: 'ShellbarSelectExampleComponent',
            code: getAssetFromModuleAssets(shellbarSelectExampleTSSrc),
            fileName: 'shellbar-select-example'
        }
    ];

    shellbarResponsiveExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(shellbarResponsiveExampleHTMLSrc),
            fileName: 'shellbar-responsive-example'
        },
        {
            language: 'typescript',
            component: 'ShellbarResponsiveExampleComponent',
            code: getAssetFromModuleAssets(shellbarResponsiveExampleTSSrc),
            fileName: 'shellbar-responsive-example'
        }
    ];
}
