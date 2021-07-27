import { Component } from '@angular/core';

import { ExampleFile } from '../../../documentation/core-helpers/code-example/example-file';
import * as iconTabBarTextTypeHtml from '!raw-loader!./examples/icon-tab-bar-text-type-example/icon-tab-bar-text-type-example.component';
import * as iconTabBarIconOnlyTypeHtml from '!raw-loader!./examples/icon-tab-bar-icon-only-type-example/icon-tab-bar-icon-only-type-example.component';
import * as iconTabBarIconTypeHtml from '!raw-loader!./examples/icon-tab-bar-icon-type-example/icon-tab-bar-icon-type-example.component';
import * as iconTabBarFilterTypeHtml from '!raw-loader!./examples/icon-tab-bar-filter-type-example/icon-tab-bar-filter-type-example.component';
import * as iconTabBarProcessTypeHtml from '!raw-loader!./examples/icon-tab-bar-process-type-example/icon-tab-bar-process-type-example.component';

@Component({
    selector: 'fd-icon-tab-bar-docs',
    templateUrl: './icon-tab-bar-docs.component.html',
})
export class IconTabBarDocsComponent {

    iconTabBarTextTypeHtml: ExampleFile[] = [
        {
            language: 'html',
            code: iconTabBarTextTypeHtml,
            fileName: 'icon-tab-bar-icon-type-example'
        }
    ];

    iconTabBarIconOnlyTypeHtml: ExampleFile[] = [
        {
            language: 'html',
            code: iconTabBarIconOnlyTypeHtml,
            fileName: 'icon-tab-bar-icon-type-example'
        }
    ];

    iconTabBarIconTypeHtml: ExampleFile[] = [
        {
            language: 'html',
            code: iconTabBarIconTypeHtml,
            fileName: 'icon-tab-bar-icon-type-example'
        }
    ];

    iconTabBarFilterTypeHtml: ExampleFile[] = [
        {
            language: 'html',
            code: iconTabBarFilterTypeHtml,
            fileName: 'icon-tab-bar-filter-type-example'
        }
    ];

    iconTabBarProcessTypeHtml: ExampleFile[] = [
        {
            language: 'html',
            code: iconTabBarProcessTypeHtml,
            fileName: 'icon-tab-bar-process-type-example'
        }
    ];
}
