import { Component } from '@angular/core';

import {
    CodeExampleComponent,
    ComponentExampleComponent,
    DescriptionComponent,
    DocsSectionTitleComponent,
    ExampleFile,
    SeparatorComponent,
    getAssetFromModuleAssets,
    getExampleFile
} from '@fundamental-ngx/docs/shared';
import { CustomUserMenuExampleComponent } from './examples/custom-user-menu-example.component';
import { ShellbarBasicExampleComponent } from './examples/shellbar-basic-example.component';
import { ShellbarBrandingContextAreaExampleComponent } from './examples/shellbar-branding-context-area-example/shellbar-branding-context-area-example.component';
import { ShellbarCollapsibleExampleComponent } from './examples/shellbar-collapsible-example.component';
import { ShellbarResponsiveExampleComponent } from './examples/shellbar-responsive-example/shellbar-responsive-example.component';

const shellbarBasicHTMLSrc = 'shellbar-basic-example.component.html';
const shellbarBasicTSSrc = 'shellbar-basic-example.component.ts';
const shellbarCollapsibleHTMLSrc = 'shellbar-collapsible-example.component.html';
const shellbarCollapsibleTSSrc = 'shellbar-collapsible-example.component.ts';
const shellbarBrandingContextAreaHTMLSrc =
    'shellbar-branding-context-area-example/shellbar-branding-context-area-example.component.html';
const shellbarBrandingContextAreaTSSrc =
    'shellbar-branding-context-area-example/shellbar-branding-context-area-example.component.ts';

@Component({
    selector: 'app-shellbar',
    templateUrl: './shellbar-docs.component.html',
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        SeparatorComponent,
        ComponentExampleComponent,
        ShellbarBasicExampleComponent,
        CodeExampleComponent,
        ShellbarCollapsibleExampleComponent,
        ShellbarResponsiveExampleComponent,
        CustomUserMenuExampleComponent,
        ShellbarBrandingContextAreaExampleComponent
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

    shellbarResponsive: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets('shellbar-responsive-example/shellbar-responsive-example.component.html'),
            fileName: 'shellbar-responsive-example'
        },
        {
            language: 'typescript',
            component: 'ShellbarResponsiveExampleComponent',
            code: getAssetFromModuleAssets('shellbar-responsive-example/shellbar-responsive-example.component.ts'),
            fileName: 'shellbar-responsive-example'
        }
    ];

    shellbarCustomUserMenuExample: ExampleFile[] = [
        getExampleFile('custom-user-menu-example.component.ts', {
            selector: 'shellbar-custom-user-menu-example',
            component: 'CustomUserMenuExampleComponent'
        })
    ];

    shellbarBrandingContextAreaExample: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(shellbarBrandingContextAreaHTMLSrc),
            fileName: 'shellbar-branding-context-area-example'
        },
        {
            language: 'typescript',
            component: 'ShellbarBrandingContextAreaExampleComponent',
            code: getAssetFromModuleAssets(shellbarBrandingContextAreaTSSrc),
            fileName: 'shellbar-branding-context-area-example'
        }
    ];
}
