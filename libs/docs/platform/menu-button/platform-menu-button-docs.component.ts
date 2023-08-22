import { Component } from '@angular/core';
const menuButtonSrc = 'platform-menu-button-example.component.html';
const cozyMenuButtonSrc = 'platform-menu-button-cozy-example.component.html';
const compactMenuButtonSrc = 'platform-menu-button-compact-example.component.html';
import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { PlatformMenuButtonExampleComponent } from './examples/platform-menu-button-examples.component';
import { PlatformMenuButtonCompactExampleComponent } from './examples/platform-menu-button-compact-examples.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { PlatformMenuButtonCozyExampleComponent } from './examples/platform-menu-button-cozy-examples.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

@Component({
    selector: 'app-link',
    templateUrl: './platform-menu-button-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        PlatformMenuButtonCozyExampleComponent,
        CodeExampleComponent,
        PlatformMenuButtonCompactExampleComponent,
        PlatformMenuButtonExampleComponent
    ]
})
export class PlatformMenuButtonDocsComponent {
    cozyMenuButton: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(cozyMenuButtonSrc),
            fileName: 'platform-menu-button-cozy-example'
        }
    ];

    compactMenuButton: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(compactMenuButtonSrc),
            fileName: 'platform-menu-button-compact-example'
        }
    ];

    menuButton: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(menuButtonSrc),
            fileName: 'platform-menu-button-example'
        }
    ];
}
