import { Component } from '@angular/core';

import { ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { SeparatorComponent } from '../../shared/src/lib/core-helpers/seperator/seperator.component';
import { CodeExampleComponent } from '../../shared/src/lib/core-helpers/code-example/code-example.component';
import {
    BreadcrumbRouterLinkExampleComponent,
    BreadcrumbHrefExampleComponent
} from './examples/breadcrumb-examples.component';
import { ComponentExampleComponent } from '../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';

const breadcrumbHrefExample = 'breadcrumb-href-example.component.html';
const breadcrumbRouterLinkExample = 'breadcrumb-routerLink-example.component.html';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb-docs.component.html',
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        BreadcrumbRouterLinkExampleComponent,
        CodeExampleComponent,
        SeparatorComponent,
        BreadcrumbHrefExampleComponent
    ]
})
export class BreadcrumbDocsComponent {
    breadcrumbRouterLinkHtml: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(breadcrumbRouterLinkExample),
            fileName: 'breadcrumb-routerLink-example'
        }
    ];

    breadcrumbHrefHtml: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(breadcrumbHrefExample),
            fileName: 'fd-breadcrumb-href-example'
        }
    ];
}
