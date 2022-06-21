import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';

import skeletonDirectiveHtml from '!./examples/directive/skeleton-template-directive-example.component.html?raw';
import skeletonDirectiveTs from '!./examples/directive/skeleton-template-directive-example.component.ts?raw';
import skeletonComponentHtml from '!./examples/component/skeleton-component-example.component.html?raw';

@Component({
    selector: 'app-skeleton',
    templateUrl: './skeleton-docs.component.html'
})
export class SkeletonDocsComponent {
    directive: ExampleFile[] = [
        {
            language: 'html',
            code: skeletonDirectiveHtml,
            fileName: 'skeleton-template-directive-example'
        },
        {
            language: 'typescript',
            code: skeletonDirectiveTs,
            fileName: 'skeleton-template-directive-example'
        }
    ];

    component: ExampleFile[] = [
        {
            language: 'html',
            code: skeletonComponentHtml,
            fileName: 'skeleton-component-example'
        }
    ];
}
