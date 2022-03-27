import { Component } from '@angular/core';
import fixedCardLayoutH from '!./examples/default/fixed-card-layout-examples.component.html?raw';
import disabledDragFixedCardLayoutH from '!./examples/disabled-drag-drop/fixed-card-layout-disabled-drag.component.html?raw';
import disabledDragFixedCardLayoutTs from '!./examples/disabled-drag-drop/fixed-card-layout-disabled-drag.component.ts?raw';
import mobileFixedCardlayoutH from '!./examples/mobile/fixed-card-layout-mobile-examples.component.html?raw';
import mobileFixedCardlayoutTs from '!./examples/mobile/fixed-card-layout-mobile-examples.component.ts?raw';
import customColumnWidthHtml from '!./examples/custom-column-width/fixed-card-layout-custom-column-width-example.component.html?raw';
import customColumnWidthTs from '!./examples/custom-column-width/fixed-card-layout-custom-column-width-example.component.ts?raw';
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

    customColumnWidth: ExampleFile[] = [
        {
            language: 'html',
            code: customColumnWidthHtml,
            fileName: 'fixed-card-layout-custom-column-width-example'
        },
        {
            language: 'typescript',
            component: 'FixedCardLayoutCustomColumnWidthExampleComponent',
            code: customColumnWidthTs,
            fileName: 'fixed-card-layout-custom-column-width-example'
        }
    ];
}
