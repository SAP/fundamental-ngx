import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExampleChildService, ExampleFile, getAssetFromModuleAssets } from '@fundamental-ngx/docs/shared';
import { CodeExampleComponent } from '../../../../shared/src/lib/core-helpers/code-example/code-example.component';
import { AdvancedScrollingExampleComponent } from '../../examples/advanced-scrolling/advanced-scrolling-example.component';
import { ComponentExampleComponent } from '../../../../shared/src/lib/core-helpers/component-example/component-example.component';
import { DescriptionComponent } from '../../../../shared/src/lib/core-helpers/description/description';
import { DocsSectionTitleComponent } from '../../../../shared/src/lib/core-helpers/docs-section-title/docs-section-title.component';
const platformTablePageScrollingSrc = 'advanced-scrolling/advanced-scrolling-example.component.html';
const platformTablePageScrollingTsSrc = 'advanced-scrolling/advanced-scrolling-example.component.ts';

@Component({
    selector: 'fdp-doc-advanced-examples-docs',
    templateUrl: './advanced-examples-docs.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        DocsSectionTitleComponent,
        DescriptionComponent,
        ComponentExampleComponent,
        AdvancedScrollingExampleComponent,
        CodeExampleComponent
    ]
})
export class AdvancedExamplesDocsComponent {
    childService = inject(ExampleChildService);
    route = inject(ActivatedRoute);
    pageScrollingTableFiles: ExampleFile[] = [
        {
            language: 'html',
            code: getAssetFromModuleAssets(platformTablePageScrollingSrc),
            fileName: 'advanced-scrolling-example',
            name: 'advanced-scrolling-example.component.html'
        },
        {
            language: 'typescript',
            code: getAssetFromModuleAssets(platformTablePageScrollingTsSrc),
            fileName: 'advanced-scrolling-example',
            component: 'AdvancedScrollingExampleComponent',
            name: 'advanced-scrolling-example.component.ts'
        }
    ];
    constructor() {
        this.childService.setLink(this.route.snapshot.routeConfig?.path);
    }
}
