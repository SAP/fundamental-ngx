import { Component } from '@angular/core';
import * as fixedCardLayoutH from '!raw-loader!./examples/default/fixed-card-layout-examples.component.html';
import * as disabledDragFixedCardLayoutH from '!raw-loader!./examples/disabled-drag-drop/fixed-card-layout-disabled-drag.component.html';
import * as disabledDragFixedCardLayoutTs from '!raw-loader!./examples/disabled-drag-drop/fixed-card-layout-disabled-drag.component.ts';
import * as mobileFixedCardlayoutH from '!raw-loader!./examples/mobile/fixed-card-layout-mobile-examples.component.html';
import * as mobileFixedCardlayoutTs from '!raw-loader!./examples/mobile/fixed-card-layout-mobile-examples.component.ts';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

@Component({
    selector: 'fd-fixed-card-layout-docs',
    templateUrl: './fixed-card-layout-docs.component.html'
})
export class FixedCardLayoutDocsComponent {
    defaultFixedCardLayout: ExampleFile[] = [
        {
            language: 'html',
            code: fixedCardLayoutH,
            fileName: 'fixed-card-layout-examples'
        }
    ];

    dragDisabledFixedCardLayout: ExampleFile[] = [
        {
            language: 'html',
            code: disabledDragFixedCardLayoutH,
            fileName: 'fixed-card-layout-disabled-drag'
        },
        {
            language: 'typescript',
            component: 'FixedCardLayoutDisabledDragExampleComponent',
            code: disabledDragFixedCardLayoutTs,
            fileName: 'fixed-card-layout-disabled-drag'
        }
    ];

    mobileFixedCardLayout: ExampleFile[] = [
        {
            language: 'html',
            code: mobileFixedCardlayoutH,
            fileName: 'fixed-card-layout-mobile-examples'
        },
        {
            language: 'typescript',
            component: 'FixedCardLayoutMobileExampleComponent',
            code: mobileFixedCardlayoutTs,
            fileName: 'fixed-card-layout-mobile-examples'
        }
    ];
}
