import { Component } from '@angular/core';
import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import contentDensitySrc from '!./examples/content-density-example.component.ts?raw';
import contentDensityHTMLSrc from '!./examples/content-density-example.component.html?raw';

import contentDensityUserComponentSrc from '!./content-density-user/content-density-user.component.ts?raw';
import contentDensityUserComponentScssSrc from '!./content-density-user/content-density-user.component.scss?raw';

import directiveUsageExampleComponentSrc from '!./examples/directive-usage/directive-usage-example.component.ts?raw';
import directiveUsageExampleComponentSrcHTMLSrc from '!./examples/directive-usage/directive-usage-example.component.html?raw';

@Component({
    selector: 'app-content-density-docs',
    templateUrl: 'content-density-docs.component.html'
})
export class ContentDensityDocsComponent {
    contentDensityExample: ExampleFile[] = [
        {
            language: 'typescript',
            code: contentDensitySrc,
            fileName: 'content-density-example',
            component: 'ContentDensityExampleComponent'
        },
        {
            language: 'html',
            code: contentDensityHTMLSrc,
            fileName: 'content-density-example',
            component: 'ContentDensityExampleComponent'
        },
        {
            language: 'typescript',
            code: contentDensityUserComponentSrc,
            fileName: 'content-density-user',
            component: 'ContentDensityUserComponent'
        },
        {
            language: 'scss',
            code: contentDensityUserComponentScssSrc,
            fileName: 'content-density-user',
            component: 'ContentDensityUserComponent'
        }
    ];

    directiveUsageExample: ExampleFile[] = [
        {
            language: 'typescript',
            code: directiveUsageExampleComponentSrc,
            fileName: 'directive-usage',
            component: 'DirectiveUsageExampleComponent'
        },
        {
            language: 'html',
            code: directiveUsageExampleComponentSrcHTMLSrc,
            fileName: 'directive-usage',
            component: 'DirectiveUsageExampleComponent'
        },
        {
            language: 'typescript',
            code: contentDensityUserComponentSrc,
            fileName: 'content-density-user',
            component: 'ContentDensityUserComponent'
        },
        {
            language: 'scss',
            code: contentDensityUserComponentScssSrc,
            fileName: 'content-density-user',
            component: 'ContentDensityUserComponent'
        }
    ];
}
