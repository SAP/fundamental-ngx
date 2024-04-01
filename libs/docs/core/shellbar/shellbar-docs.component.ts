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
import { ShellbarCollapsibleExampleComponent } from './examples/shellbar-collapsible-example.component';
import { ShellbarGrowingGroupExampleComponent } from './examples/shellbar-growing-group-example/shellbar-growing-group-example.component';
import { ShellbarResponsiveExampleComponent } from './examples/shellbar-responsive-example/shellbar-responsive-example.component';

const shellbarBasicHTMLSrc = 'shellbar-basic-example.component.html';
const shellbarBasicTSSrc = 'shellbar-basic-example.component.ts';
const shellbarCollapsibleHTMLSrc = 'shellbar-collapsible-example.component.html';
const shellbarCollapsibleTSSrc = 'shellbar-collapsible-example.component.ts';

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
        ShellbarGrowingGroupExampleComponent,
        CustomUserMenuExampleComponent
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
            fileName: 'shellbar-responsive-example.component'
        },
        {
            language: 'typescript',
            component: 'ShellbarResponsiveExampleComponent',
            code: getAssetFromModuleAssets('shellbar-responsive-example/shellbar-responsive-example.component.ts'),
            fileName: 'shellbar-responsive-example.component'
        }
    ];

    shellbarGrowingGroupExampleFiles: ExampleFile[] = [
        getExampleFile('shellbar-growing-group-example/shellbar-growing-group-example.component.ts', {
            selector: 'fd-shellbar-growing-group-example',
            component: 'ShellbarGrowingGroupExampleComponent',
            name: 'shellbar-growing-group-example.ts'
        }),
        getExampleFile('shellbar-growing-group-example/shellbar-growing-group-example.component.html', {
            name: 'shellbar-growing-group-example.html'
        })
    ];

    shellbarCustomUserMenuExample: ExampleFile[] = [
        getExampleFile('custom-user-menu-example.component.ts', {
            selector: 'fd-shellbar-custom-user-menu-example',
            component: 'CustomUserMenuExampleComponent'
        })
    ];
}
