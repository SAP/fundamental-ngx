import { Component } from '@angular/core';

import defaultResizeCardHtml from '!./examples/resizable-card-layout-example.component.html?raw';
import defaultResizeCardTs from '!./examples/resizable-card-layout-example.component.ts?raw';
import defaultResizeCardScss from '!./examples/resizable-card-layout-example.component.scss?raw';
import defaultResizeCardLayoutHtml from '!./examples/resizable-card-layout-example-layoutconfig.component.html?raw';
import defaultResizeCardLayoutTs from '!./examples/resizable-card-layout-example-layoutconfig.component.ts?raw';
import defaultResizeCardItemHtml from '!./examples/resizable-card-layout-example-itemconfig.component.html?raw';
import defaultResizeCardItemTs from '!./examples/resizable-card-layout-example-itemconfig.component.ts?raw';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'app-resizable-card-layout',
    templateUrl: './resizable-card-layout-docs.component.html'
})
export class ResizableCardLayoutDocsComponent {
    resizableCardLayoutDefault: ExampleFile[] = [
        {
            language: 'html',
            code: defaultResizeCardHtml,
            fileName: 'resizable-card-layout-example',
            component: 'ResizableCardLayoutExampleComponent'
        },
        {
            language: 'typescript',
            code: defaultResizeCardTs,
            fileName: 'resizable-card-layout-example',
            component: 'ResizableCardLayoutExampleComponent'
        },
        {
            language: 'scss',
            code: defaultResizeCardScss,
            fileName: 'resizable-card-layout-example',
            component: 'ResizableCardLayoutExampleComponent'
        }
    ];

    resizableCardLayoutLayoutConfig: ExampleFile[] = [
        {
            language: 'html',
            code: defaultResizeCardLayoutHtml,
            fileName: 'resizable-card-layout-example-layoutconfig',
            component: 'ResizableCardLayoutExampleLayoutConfigComponent'
        },
        {
            language: 'typescript',
            code: defaultResizeCardLayoutTs,
            fileName: 'resizable-card-layout-example-layoutconfig',
            component: 'ResizableCardLayoutExampleLayoutConfigComponent'
        },
        {
            language: 'scss',
            code: defaultResizeCardScss,
            fileName: 'resizable-card-layout-example',
            component: 'ResizableCardLayoutExampleComponent'
        }
    ];

    resizableCardLayoutItemConfig: ExampleFile[] = [
        {
            language: 'html',
            code: defaultResizeCardItemHtml,
            fileName: 'resizable-card-layout-example-itemconfig',
            component: 'ResizableCardLayoutExampleItemConfigComponent'
        },
        {
            language: 'typescript',
            code: defaultResizeCardItemTs,
            fileName: 'resizable-card-layout-example-itemconfig',
            component: 'ResizableCardLayoutExampleItemConfigComponent'
        },
        {
            language: 'scss',
            code: defaultResizeCardScss,
            fileName: 'resizable-card-layout-example',
            component: 'ResizableCardLayoutExampleComponent'
        }
    ];
}
