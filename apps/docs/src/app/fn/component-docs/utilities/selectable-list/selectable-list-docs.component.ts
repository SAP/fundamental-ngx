import { Component, ViewEncapsulation } from '@angular/core';
import { ExampleFile } from '../../../../documentation/core-helpers/code-example/example-file';
import defaultExampleHtml from '!./examples/default-example/default-example.component.html?raw';
import defaultExampleTs from '!./examples/default-example/default-example.component.ts?raw';

import advancedExampleHtml from '!./examples/advanced-usage/advanced-usage.component.html?raw';
import advancedExampleTs from '!./examples/advanced-usage/advanced-usage.component.ts?raw';
import advancedExampleCustomDirTs from '!./examples/advanced-usage/custom-selectable-item.directive.ts?raw';

@Component({
    selector: 'app-tabs',
    templateUrl: './selectable-list-docs.component.html',
    encapsulation: ViewEncapsulation.None
})
export class SelectableListDocsComponent {
    defaultExample: ExampleFile[] = [
        {
            code: defaultExampleHtml,
            language: 'html',
            fileName: 'selectable-list-default-example',
            component: 'SelectableListDefaultExample'
        },
        {
            code: defaultExampleTs,
            language: 'ts',
            fileName: 'selectable-list-default-example',
            component: 'SelectableListDefaultExample'
        }
    ];

    advancedExample: ExampleFile[] = [
        {
            code: advancedExampleHtml,
            language: 'html',
            fileName: 'selectable-list-advanced-example',
            component: 'SelectableListAdvancedExample'
        },
        {
            code: advancedExampleTs,
            language: 'ts',
            fileName: 'selectable-list-advanced-example',
            component: 'SelectableListAdvancedExample'
        },
        {
            code: advancedExampleCustomDirTs,
            language: 'ts',
            fileName: 'selectable-list-advanced-example-custom-item',
            component: 'SelectableListAdvancedExampleCustomItem'
        }
    ];

    constructor() {}
}
