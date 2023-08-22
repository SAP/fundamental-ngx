import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { ResizableCardLayoutExampleItemConfigComponent } from './examples/resizable-card-layout-example-itemconfig.component';
import { ResizableCardLayoutExampleLayoutConfigComponent } from './examples/resizable-card-layout-example-layoutconfig.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import { ResizableCardLayoutExampleComponent } from './examples/resizable-card-layout-example.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const defaultResizeCardScss = 'resizable-card-layout-example.component.scss';

const defaultResizeCardHtml = 'resizable-card-layout-example.component.html';
const defaultResizeCardTs = 'resizable-card-layout-example.component.ts';
const defaultResizeCardLayoutHtml = 'resizable-card-layout-example-layoutconfig.component.html';
const defaultResizeCardLayoutTs = 'resizable-card-layout-example-layoutconfig.component.ts';
const defaultResizeCardItemHtml = 'resizable-card-layout-example-itemconfig.component.html';
const defaultResizeCardItemTs = 'resizable-card-layout-example-itemconfig.component.ts';

@Component({
    selector: 'app-resizable-card-layout',
    templateUrl: './resizable-card-layout-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        ResizableCardLayoutExampleComponent,
        CodeExampleComponent,
        ResizableCardLayoutExampleLayoutConfigComponent,
        ResizableCardLayoutExampleItemConfigComponent
    ]
})
export class ResizableCardLayoutDocsComponent {
    resizableCardLayoutDefault: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(defaultResizeCardHtml),
            fileName: 'resizable-card-layout-example',
            component: 'ResizableCardLayoutExampleComponent'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(defaultResizeCardTs),
            fileName: 'resizable-card-layout-example',
            component: 'ResizableCardLayoutExampleComponent'
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(defaultResizeCardScss),
            fileName: 'resizable-card-layout-example',
            component: 'ResizableCardLayoutExampleComponent'
        }
    ];

    resizableCardLayoutLayoutConfig: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(defaultResizeCardLayoutHtml),
            fileName: 'resizable-card-layout-example-layoutconfig',
            component: 'ResizableCardLayoutExampleLayoutConfigComponent'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(defaultResizeCardLayoutTs),
            fileName: 'resizable-card-layout-example-layoutconfig',
            component: 'ResizableCardLayoutExampleLayoutConfigComponent'
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(defaultResizeCardScss),
            fileName: 'resizable-card-layout-example',
            component: 'ResizableCardLayoutExampleComponent'
        }
    ];

    resizableCardLayoutItemConfig: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(defaultResizeCardItemHtml),
            fileName: 'resizable-card-layout-example-itemconfig',
            component: 'ResizableCardLayoutExampleItemConfigComponent'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(defaultResizeCardItemTs),
            fileName: 'resizable-card-layout-example-itemconfig',
            component: 'ResizableCardLayoutExampleItemConfigComponent'
        },
        {
            language: 'scss',
            code: getAssetFromModuleAssets(defaultResizeCardScss),
            fileName: 'resizable-card-layout-example',
            component: 'ResizableCardLayoutExampleComponent'
        }
    ];
}
