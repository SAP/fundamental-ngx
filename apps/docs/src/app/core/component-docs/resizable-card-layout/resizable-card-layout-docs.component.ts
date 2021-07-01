import { Component } from '@angular/core';

import * as defaultResizeCardHtml from '!raw-loader!./examples/resizable-card-layout-example.component.html';
import * as defaultResizeCardTs from '!raw-loader!./examples/resizable-card-layout-example.component.ts';
import * as defaultResizeCardScss from '!raw-loader!./examples/resizable-card-layout-example.component.scss';
import * as defaultResizeCardLayoutHtml from '!raw-loader!./examples/resizable-card-layout-example-layoutconfig.component.html';
import * as defaultResizeCardLayoutTs from '!raw-loader!./examples/resizable-card-layout-example-layoutconfig.component.ts';
import * as defaultResizeCardItemHtml from '!raw-loader!./examples/resizable-card-layout-example-itemconfig.component.html';
import * as defaultResizeCardItemTs from '!raw-loader!./examples/resizable-card-layout-example-itemconfig.component.ts';

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
